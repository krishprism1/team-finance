import { VestingFormData, ValidationErrors } from "@/utils/interface.utils";


export const validateVesting = (data: VestingFormData, cliffStatus: Boolean): ValidationErrors => {
    const errors: ValidationErrors = {};
    if (!data.walletAddress) {
        errors.walletAddress = 'Wallet address is required';
    }
    if (!data.walletNickname) {
        errors.walletNickname = 'Wallet nickname is required';
    }
    if (!data.relationship) {
        errors.relationship = 'Relationship is required';
    }
    if (!data.numberOfTokens) {
        errors.numberOfTokens = 'Token is required';
    }
    if (!data.vestingCadence) {
        errors.vestingCadence = 'Vesting Cadence is required';
    }
    if (!data.startDate) {
        errors.startDate = 'Start date is required';
    }
    if (!data.endDate) {
        errors.endDate = 'End date is required';
    }
    if (cliffStatus) {
        if (!data.cliffLength) {
            errors.cliffLength = 'Cliff is required';
        }
        if (!data.releasePercentage) {
            errors.releasePercentage = 'percentage is required';
        }
    }

    return errors;
};
