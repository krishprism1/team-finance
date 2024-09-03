"use client";
import ActionLayout from "@/containers/ActionLayout";
import React, { useEffect, useState } from "react";
import "../../styles/mint.css";
import "../../styles/multisender.css";
import "../../styles/Mint-responsive.css";
import "../../styles/MultisenderResponsive.css";
import { useAccount } from "wagmi";
import ConnectWallet from "@/components/common/createform/ConnectWallet";
import SelectNetwork from "@/components/common/createform/SelectNetwork";
import CreateProgress from "@/components/common/createform/CreateProgress";
import useFormStore from "@/store/stepStore";

import { useEthersSigner } from "@/hooks/useEtherSigner";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { networks } from "@/contracts";
import { intToBig } from "@/utils/math.utils";
import { getWalletTransaction } from "@/utils/moralis.utils";
import { tokenAbi } from "@/contracts/abis/token.abi";
import { multiSenderAbi } from "@/contracts/abis/multisender.abi";
import TokenList from "@/components/common/createform/TokenList";
import VIcon from "/public/form/v.svg"
import Trash from "/public/form/trash.svg"
import Que from "/public/form/question.svg"
import First from "/public/form/first.svg"
import Prev from "/public/form/prev.svg"
import Next from "/public/form/next.svg"
import Last from "/public/form/last.svg"
import Download from "/public/form/download.svg"
import axios from "axios";
import { multiSentUrl } from "@/utils/apiUrl.utils";


interface TokenInfo {
    token: string;
    name: string;
    symbol: string;
    balance: number;
}

interface InputRow {
    walletAddress: string;
    tokenNumber: number;
}

interface ErrorState {
    index: number;
    walletAddress: string;
    tokenNumber: string;
    status: boolean;
}

export default function MultiSender() {
    const { step, setStep } = useFormStore();
    const { isConnected, address } = useAccount();
    const [load, setLoad] = useState(false);
    const signer = useEthersSigner();
    const [toggleFirst, setToggleFirst] = useState(false);
    const [toggleSecond, setToggleSecond] = useState(false);
    const [tokenInfo, setTokenInfo] = useState<TokenInfo[]>([]);
    const [selectedToken, setSelectedToken] = useState<TokenInfo>();
    const [rows, setRows] = useState<InputRow[]>([
        { walletAddress: "", tokenNumber: 0 },
    ]);

    const [errors, setErrors] = useState<ErrorState>();

    const handleNext = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const status = isEmptyField()
        if (status) return;
        setStep(4)
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { };

    const notify = (link: string, txhash: string) => {
        let url = `${link}/${txhash}`;
        toast.success(
            <div>
                Transaction completed successfully!
                <a
                    href={url}
                    style={{ color: "blue", textDecoration: "underline" }}
                    target="_blank"
                >
                    View Transaction
                </a>
            </div>
        );
    };

    const toggleRadio = (typeInput: string) => {
        if (typeInput === "first" && !toggleFirst) {
            setToggleFirst(true);
        } else if (typeInput === "second" && !toggleSecond) {
            setToggleSecond(true);
        }
    };

    useEffect(() => {
        if (address) {
            getWalletTransaction(address, "45").then((res) => setTokenInfo(res));
        }
    }, [address, step]);

    const selectToken = async (item: any) => {
        setSelectedToken(item);
    };

    const handleInputChange = (
        index: number,
        field: keyof InputRow,
        value: string | number
    ) => {
        const updatedRows = [...rows];
        updatedRows[index] = {
            ...updatedRows[index],
            [field]: field === "tokenNumber" ? Number(value) : value,
        };
        setRows(updatedRows);
    };

    const incrementRow = (
        e:
            | React.ChangeEvent<HTMLSelectElement>
            | React.MouseEvent<HTMLButtonElement>,
        num?: number
    ) => {
        e.preventDefault();

        let incrementValue = 0;

        if (e.currentTarget instanceof HTMLSelectElement) {
            const selectedValue = e.currentTarget.value;
            incrementValue = parseInt(selectedValue) || 0;
        } else if (
            e.currentTarget instanceof HTMLButtonElement &&
            num !== undefined
        ) {
            incrementValue = num;
        }

        const newRows = [...rows];
        for (let i = 0; i < incrementValue; i++) {
            newRows.push({ walletAddress: "", tokenNumber: 0 });
        }

        //Validate
        const status = isEmptyField()
        if (status) return;
        setRows(newRows);
    };

    const clearAll = () => {
        setRows([{ walletAddress: "", tokenNumber: 0 }]);
    };

    const totalToken = rows?.reduce((total, row) => total + row.tokenNumber, 0);

    const isEmptyField = () => {
        const lastRow = rows[rows.length - 1];
        const lastErrors = { index: rows.length - 1, walletAddress: "", tokenNumber: "", status: false };

        let isValid = true;

        if (lastRow.walletAddress.trim() === "") {
            lastErrors.walletAddress = "Wallet Address cannot be empty.";
            isValid = false;
        }

        if (lastRow.tokenNumber <= 0) {
            lastErrors.tokenNumber = "Token Number must be greater than 0.";
            isValid = false;
        }
        setErrors(lastErrors);
        if (!isValid) {
            setErrors(lastErrors);
            return true;
        }
        return false
    }

    const multiTransfer = async () => {
        setLoad(true);
        if (!isConnected) {
            toast.error("Please connect the wallet first!");
        }
        const recipients = rows.map(row => row.walletAddress);
        const normalAmount = rows.map(row => row.tokenNumber);
        const amounts = rows.map(row => intToBig(row.tokenNumber, 18));
        if (signer && selectedToken) {
            try {
                const tokenInstance = new ethers.Contract(selectedToken.token, tokenAbi, await signer);
                const _tx = await tokenInstance.approve(networks.Binance.multiSender, intToBig(totalToken, 18))
                await _tx.wait()
                const multiSendInstance = new ethers.Contract(networks.Binance.multiSender, multiSenderAbi, await signer);
                const tx = await multiSendInstance.multisend(selectedToken.token, recipients, amounts);
                const receipt = await tx.wait();

                await axios.post(multiSentUrl.send, {
                    wallet: address,
                    chainId: 97,
                    token: selectedToken.token,
                    symbol: selectedToken.symbol,
                    recipients: recipients,
                    amounts: normalAmount,
                    txhash: receipt.hash,
                    totalRecipients: recipients.length,
                    totalAmount: normalAmount.length
                });
                notify(networks.Binance.url, receipt.hash);
                setStep(5);
                setLoad(false);
            } catch (error: any) {
                toast.error(error.reason);
                setLoad(false);
            }
        }
    };

    return (
        <ActionLayout>
            <div className="creat-token-container">
                <CreateProgress title="Multisender" />
                <ConnectWallet />
                <div className="select-blockchain-box">
                    <SelectNetwork />

                    {step < 2 && (
                        <div className="select-blockchain">
                            <div className="select-box1">
                                <div>
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        stroke-width="0"
                                        viewBox="0 0 24 24"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path>
                                    </svg>
                                    <span>Enter token address</span>
                                </div>
                                <svg
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-width="0"
                                    viewBox="0 0 24 24"
                                    className="select-right-arrow"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    )}
                    {step == 2 && (
                        <TokenList
                            selectedToken={selectedToken}
                            tokenInfo={tokenInfo}
                            handleChange={handleChange}
                            selectToken={selectToken}
                            setStep={setStep}
                        />
                    )}
                    {step > 2 && (
                        <div
                            className="token-info-connected-small-box"
                            onClick={() => setStep(2)}
                        >
                            <div>
                                <img
                                    alt="Icon"
                                    loading="lazy"
                                    width="16"
                                    height="16"
                                    decoding="async"
                                    data-nimg="1"
                                    src="https://app.team.finance/_next/static/media/check-circle.e19b6900.svg"
                                />
                                <p>Enter token info</p>
                            </div>
                            <div>
                                <p>TFC</p>
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 24 24"
                                    className="ds-icon"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                                </svg>
                            </div>
                        </div>
                    )}

                    {step < 3 && (
                        <div className="select-blockchain">
                            <div className="select-box1">
                                <div>
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        stroke-width="0"
                                        viewBox="0 0 24 24"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M19 15v-3h-2v3h-3v2h3v3h2v-3h3v-2h-.937zM4 7h11v2H4zm0 4h11v2H4zm0 4h8v2H4z"></path>
                                    </svg>
                                    <span>Add recipient details</span>
                                </div>
                                <svg
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-width="0"
                                    viewBox="0 0 24 24"
                                    className="select-right-arrow"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    )}
                    {step == 3 && (
                        <div className="add-feature-container">
                            <h3>Add recipient details</h3>
                            <p>
                                Enter the wallet addresses and token amounts manually or upload
                                a CSV file.
                            </p>
                            <form>
                                <div className="recipient-box1">
                                    <div
                                        className="rct-box1"
                                        onClick={(e) => toggleRadio("first")}
                                    >
                                        <div>
                                            <label
                                                htmlFor="add-recipients"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <input
                                                    type="radio"
                                                    name="add-file"
                                                    id="add-recipients"
                                                    style={{ marginRight: "8px" }}
                                                />
                                                <p>Add recipients manually</p>
                                            </label>
                                        </div>
                                        <VIcon width="16" height="16" fill="currentColor" />
                                    </div>

                                    {toggleFirst && (
                                        <div className="recipient-box2">
                                            <div className="rct-box2">
                                                <div className="small-rtc-box">
                                                    <p>Token balance</p>
                                                    <span>{selectedToken ? selectedToken.balance + " " + selectedToken.symbol : "0.00 ETH"}</span>
                                                </div>
                                                <div className="small-rtc-box">
                                                    <p>Total amount</p>
                                                    <span>{totalToken}</span>
                                                </div>
                                                <div className="small-rtc-box">
                                                    <p>Total recipients</p>
                                                    <span>{rows?.length}</span>
                                                </div>
                                                <div className="small-rtc-box2">
                                                    <p>
                                                        Service fee{" "}
                                                        <Que width="14" height="14" fill="currentColor" />
                                                    </p>
                                                    <div>
                                                        <span>$0.00</span>
                                                        <p>
                                                            per transaction{" "}
                                                            <Que width="14" height="14" fill="currentColor" />
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="small-rtc-box3">
                                                    <div className="div">
                                                        <p>Wallet address</p>
                                                        <p>Amount of tokens</p>
                                                    </div>
                                                    {rows.map((row, index) => (
                                                        <div className="div2" key={index}>
                                                            <span>{index + 1}.</span>
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Wallet address 1"
                                                                    className="first-input"
                                                                    value={row.walletAddress}
                                                                    onChange={(e) =>
                                                                        handleInputChange(
                                                                            index,
                                                                            "walletAddress",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <input
                                                                    type="number"
                                                                    name="token number"
                                                                    placeholder="0.0"
                                                                    className="second-input"
                                                                    value={row.tokenNumber}
                                                                    onChange={(e) =>
                                                                        handleInputChange(
                                                                            index,
                                                                            "tokenNumber",
                                                                            Number(e.target.value)
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <button>
                                                                    <svg
                                                                        stroke="white"
                                                                        fill="white"
                                                                        stroke-width="0"
                                                                        viewBox="0 0 24 24"
                                                                        height="1.7em"
                                                                        width="1.7em"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path d="M5 21h14a2 2 0 0 0 2-2V8a1 1 0 0 0-.29-.71l-4-4A1 1 0 0 0 16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm10-2H9v-5h6zM13 7h-2V5h2zM5 5h2v4h8V5h.59L19 8.41V19h-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5H5z"></path>
                                                                    </svg>
                                                                </button>
                                                                <button>
                                                                    <Trash width="24" height="24" fill="currentColor" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="small-rtc-box4">
                                                    <div className="div1">
                                                        <div>
                                                            <p>Showing page 1 of 1</p>
                                                            <p>{rows ? rows?.length : "0"} results</p>
                                                        </div>
                                                    </div>
                                                    <div className="div22">
                                                        <div className="div2">
                                                            <p>Show rows</p>
                                                            <select
                                                                id="mySelect"
                                                                onChange={(e) => incrementRow(e)}
                                                            >
                                                                <option value="1">1</option>
                                                                <option value="5">5</option>
                                                                <option value="10">10</option>
                                                            </select>
                                                        </div>
                                                        <div className="div3">
                                                            <button>
                                                                <First width="20" height="20" fill="currentColor" />
                                                            </button>
                                                            <button>
                                                                <Prev width="20" height="20" fill="currentColor" />
                                                            </button>
                                                            <button>
                                                                <Next width="20" height="20" fill="currentColor" />
                                                            </button>
                                                            <button>
                                                                <Last width="20" height="20" fill="currentColor" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="small-rtc-box5">
                                                    <div className="box1">
                                                        <button onClick={(e) => incrementRow(e, 1)}>
                                                            Add another address
                                                        </button>
                                                        <a href="#">
                                                            Download CSV file{" "}
                                                            <Download width="16" height="16" fill="currentColor" />
                                                        </a>
                                                    </div>
                                                    <div className="box2" onClick={clearAll}>
                                                        <p>Clear all</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="recipient-box2">
                                    <div
                                        className="rct-box1"
                                        onClick={(e) => toggleRadio("second")}
                                    >
                                        <div>
                                            <label
                                                htmlFor="upload-csv"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <input
                                                    type="radio"
                                                    name="add-file"
                                                    id="upload-csv"
                                                    style={{ marginRight: "8px" }}
                                                />
                                                <p>Upload CSV file</p>
                                            </label>
                                        </div>
                                        <VIcon width="16" height="16" fill="currentColor" />
                                    </div>

                                    {toggleSecond && (
                                        <div className="upload-cv-box">
                                            <p>
                                                Make sure that your file includes all required fields
                                                before uploading.
                                            </p>
                                            <div className="template-btn">
                                                <button>See template</button>
                                            </div>
                                            <div className="upload-box">
                                                <div className="box1">
                                                    <img
                                                        src="https://app.team.finance/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FuploadFile.a47672a7.png&w=640&q=75"
                                                        alt="l"
                                                    />
                                                </div>
                                                <div className="box1">
                                                    <h4>Drop CSV file here</h4>
                                                    <input type="file" name="file" placeholder="file" />
                                                </div>
                                                <div className="box1"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="form-continue-btn" onClick={(e) => handleNext(e)}>
                                    <button type="submit" className="all-time-use-btn">
                                        Continue
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    {step > 3 && (
                        <div
                            className="add-feature-connected-small-box"
                            onClick={() => setStep(3)}
                        >
                            <div>
                                <img
                                    alt="Icon"
                                    loading="lazy"
                                    width="16"
                                    height="16"
                                    decoding="async"
                                    data-nimg="1"
                                    src="https://app.team.finance/_next/static/media/check-circle.e19b6900.svg"
                                />
                                <p>Add recipient details</p>
                            </div>
                            <div>
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    stroke-width="0"
                                    viewBox="0 0 24 24"
                                    className="ds-icon"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                                </svg>
                            </div>
                        </div>
                    )}

                    {step < 4 && (
                        <div className="select-blockchain">
                            <div className="select-box1">
                                <div>
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        stroke-width="0"
                                        viewBox="0 0 24 24"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"></path>
                                    </svg>
                                    <span>Send token</span>
                                </div>
                                <svg
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-width="0"
                                    viewBox="0 0 24 24"
                                    className="select-right-arrow"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    )}
                    {step == 4 && (
                        <div className="create-contract-container">
                            <h3>Send token</h3>
                            <p>
                                Please give your permissions to use this token. It is a one-time
                                action per sender wallet. If you modify the spend cap in your
                                wallet, reauthorization is required.
                            </p>

                            <div className="token-information-box">
                                <div className="tk-informantion">
                                    <p>Blockchain</p>
                                    <div>
                                        <img
                                            src="https://app.team.finance/icons/wizard/ethereum.svg"
                                            alt="l"
                                        />
                                        <span>Bsc Testnet</span>
                                    </div>
                                </div>
                                <div className="tk-informantion">
                                    <p>Token</p>
                                    <div>
                                        <img
                                            src="https://app.team.finance/tokens/ethereum-token.webp"
                                            alt="l"
                                        />
                                        <span>{selectedToken?.symbol}</span>
                                    </div>
                                </div>
                                <div className="tk-informantion">
                                    <p>Total recipients</p>
                                    <div>
                                        <span>{rows?.length}</span>
                                    </div>
                                </div>
                                <div className="tk-informantion">
                                    <p>Total to send</p>
                                    <div>
                                        <span>
                                            {totalToken} {" "} {selectedToken?.symbol}
                                        </span>
                                    </div>
                                </div>
                                <div className="tk-informantion">
                                    <p>Service fee</p>
                                    <div>
                                        <span>-</span>
                                    </div>
                                </div>
                            </div>
                            <div className="confirm-transtion-btn">
                                <button onClick={() => multiTransfer()}>
                                    {load ? "PROCESSING..." : "Confirm transaction"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ActionLayout>
    );
}
