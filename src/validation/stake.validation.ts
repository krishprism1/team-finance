import { stakeFormInfo, ValidationErrors } from "@/utils/interface.utils";


export const stakeTokenValidateStep = (step: number, data: stakeFormInfo): ValidationErrors => {
    const errors: ValidationErrors = {};
    switch (step) {
        case 3:
            if (!data.rewardToken) {
                errors.rewardToken = 'Reward token is required';
            }
            if (!data.startTime) {
                errors.startTime = 'startTime is required';
            }
            if (!data.endTime) {
                errors.supply = 'Supply is required';
            }
            if (!data.endTime) {
                errors.endTime = 'endTime is required';
            }
            if (!data.totalReward) {
                errors.totalReward = 'Total reward is required';
            }
            break;
        default:
            break;
    }

    return errors;
};
