"use client";
import ActionLayout from "@/containers/ActionLayout";
import React, { useEffect, useState } from "react";
import "../../styles/mint.css";
import "../../styles/Mint-responsive.css";
import "../../styles/multisender.css";
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
import {
    isCreateTokenStepValid,
    TokenDetail,
    createTokenValidateStep,
    ValidationErrors,
}  from "@/validation/createTokenForm.validation";

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

    const [tokenDetail, setTokenDetail] = useState<TokenDetail>({
        name: "",
        symbol: "",
        supply: 0,
        decimal: 0,
        description: "",
        website: "",
        twitter: "",
        telegram: "",
        mintable: false,
        burnable: false,
    });
    const [errors, setErrors] = useState<ValidationErrors>({});

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (step === 2) {
            const newErrors = createTokenValidateStep(step, tokenDetail);
            setErrors(newErrors);
            if (isCreateTokenStepValid(newErrors)) {
                setStep(step + 1);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setTokenDetail({
            ...tokenDetail,
            [name]: type === "checkbox" ? checked : value,
        });
    };

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
        setRows(newRows);
    };

    const clearAll = () => {
        setRows([{ walletAddress: "", tokenNumber: 0 }]);
    };

    const totalToken = rows?.reduce((total, row) => total + row.tokenNumber, 0);

    const multiTransfer = async () => {
        setLoad(true);
        if (!isConnected) {
            toast.error("Please connect the wallet first!");
        }
        const recipients = rows.map(row => row.walletAddress);
        const amounts = rows.map(row => intToBig(row.tokenNumber, 18));
        if (signer && selectedToken) {
            try {
                const tokenInstance = new ethers.Contract(selectedToken.token, tokenAbi, await signer);
                const _tx = await tokenInstance.approve(networks.Binance.multiSender, intToBig(totalToken, 18))
                await _tx.wait()
                const multiSendInstance = new ethers.Contract(networks.Binance.multiSender, multiSenderAbi, await signer);
                const tx = await multiSendInstance.multisend(selectedToken.token, recipients, amounts);
                const receipt = await tx.wait();
                notify(networks.Binance.url, receipt.transactionHash);
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
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            stroke-width="0"
                                            viewBox="0 0 24 24"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                        </svg>
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
                                                        <svg
                                                            stroke="currentColor"
                                                            fill="currentColor"
                                                            stroke-width="0"
                                                            viewBox="0 0 24 24"
                                                            className="dout-svg"
                                                            height="1.1em"
                                                            width="1.1em"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M12 6a3.939 3.939 0 0 0-3.934 3.934h2C10.066 8.867 10.934 8 12 8s1.934.867 1.934 1.934c0 .598-.481 1.032-1.216 1.626a9.208 9.208 0 0 0-.691.599c-.998.997-1.027 2.056-1.027 2.174V15h2l-.001-.633c.001-.016.033-.386.441-.793.15-.15.339-.3.535-.458.779-.631 1.958-1.584 1.958-3.182A3.937 3.937 0 0 0 12 6zm-1 10h2v2h-2z"></path>
                                                            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                                                        </svg>
                                                    </p>
                                                    <div>
                                                        <span>$0.00</span>
                                                        <p>
                                                            per transaction{" "}
                                                            <svg
                                                                stroke="currentColor"
                                                                fill="currentColor"
                                                                stroke-width="0"
                                                                viewBox="0 0 24 24"
                                                                className="dout-svg"
                                                                height="1em"
                                                                width="1em"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M12 6a3.939 3.939 0 0 0-3.934 3.934h2C10.066 8.867 10.934 8 12 8s1.934.867 1.934 1.934c0 .598-.481 1.032-1.216 1.626a9.208 9.208 0 0 0-.691.599c-.998.997-1.027 2.056-1.027 2.174V15h2l-.001-.633c.001-.016.033-.386.441-.793.15-.15.339-.3.535-.458.779-.631 1.958-1.584 1.958-3.182A3.937 3.937 0 0 0 12 6zm-1 10h2v2h-2z"></path>
                                                                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                                                            </svg>
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
                                                                    <svg
                                                                        stroke="red"
                                                                        fill="red"
                                                                        stroke-width="0"
                                                                        viewBox="0 0 24 24"
                                                                        height="1.7em"
                                                                        width="1.7em"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path d="M15 2H9c-1.103 0-2 .897-2 2v2H3v2h2v12c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V8h2V6h-4V4c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm8 16H7V8h10v12z"></path>
                                                                    </svg>
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
                                                                <svg
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    stroke-width="0"
                                                                    viewBox="0 0 24 24"
                                                                    height="20"
                                                                    width="20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M18.3639 7.75735L16.9497 6.34314L11.2929 12L16.9497 17.6568L18.3639 16.2426L14.1213 12L18.3639 7.75735Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                    <path
                                                                        d="M11.2929 6.34314L12.7071 7.75735L8.46447 12L12.7071 16.2426L11.2929 17.6568L5.63605 12L11.2929 6.34314Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                            <button>
                                                                <svg
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    stroke-width="0"
                                                                    viewBox="0 0 24 24"
                                                                    height="20"
                                                                    width="20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                            <button>
                                                                <svg
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    stroke-width="0"
                                                                    viewBox="0 0 24 24"
                                                                    height="20"
                                                                    width="20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                            <button>
                                                                <svg
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    stroke-width="0"
                                                                    viewBox="0 0 24 24"
                                                                    height="20"
                                                                    width="20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M5.63605 7.75735L7.05026 6.34314L12.7071 12L7.05029 17.6568L5.63608 16.2426L9.87869 12L5.63605 7.75735Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                    <path
                                                                        d="M12.7071 6.34314L11.2929 7.75735L15.5356 12L11.2929 16.2426L12.7072 17.6568L18.364 12L12.7071 6.34314Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
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
                                                            <svg
                                                                stroke="rgb(103, 103, 255)"
                                                                fill="rgb(103, 103, 255)"
                                                                stroke-width="0"
                                                                viewBox="0 0 24 24"
                                                                height="1.1em"
                                                                width="1.1em"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="m12 16 4-5h-3V4h-2v7H8z"></path>
                                                                <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
                                                            </svg>
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
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            stroke-width="0"
                                            viewBox="0 0 24 24"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                        </svg>
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
                                <div className="form-continue-btn" onClick={() => setStep(4)}>
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
