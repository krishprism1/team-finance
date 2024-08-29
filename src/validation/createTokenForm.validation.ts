import { ITokenForm, ValidationErrors } from "@/utils/interface.utils";

export const createTokenValidateStep = (step: number, data: ITokenForm): ValidationErrors => {
    const errors: ValidationErrors = {};

    switch (step) {
        case 2:
            if (!data.name) {
                errors.name = 'Name is required';
            }
            if (!data.symbol) {
                errors.symbol = 'Symbol is required';
            }
            if (!data.supply) {
                errors.supply = 'Supply is required';
            }
            if (!data.decimal) {
                errors.decimal = 'Decimal is required';
            }
            if (!data.description) {
                errors.description = 'Description is required';
            }
            break;
        default:
            break;
    }

    return errors;
};

export const isStepValid = (errors: ValidationErrors): boolean => {
    return Object.keys(errors).length === 0;
};
