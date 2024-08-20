// validation.ts
export interface TokenDetail {
    name: string;
    symbol: string;
    supply: Number;
    decimal: Number;
    description: string;
    website: string;
    twitter: string;
    telegram: string;
    mintable: boolean;
    burnable: boolean;
}

export interface ValidationErrors {
    [key: string]: string;
}

export const validateStep = (step: number, data: TokenDetail): ValidationErrors => {
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
            if (!data.website) {
                errors.website = 'Website is required';
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
