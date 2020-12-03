namespace App {
    export interface Validatable {
        value: string | number;
        required?: boolean;
        minLength?: number
        maxLength?: number;
        min?: number
        max?: number;
    }
    
    export function validate(validatableInput: Validatable) {
        let isValid = true;
        if (validatableInput.required) {//values must be required
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }
    
        if (validatableInput.minLength != null //check case 0 when ints diferrent null, undefined
            && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length > validatableInput.minLength;
        }
    
        if (validatableInput.maxLength != null //check case 0 when ints diferrent null, undefined
            && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
        }
    
        if (validatableInput.min != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
    
        if (validatableInput.max != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value < validatableInput.max;
        }
        console.log(validatableInput.value);
        console.log(validatableInput?.min)
        console.log(isValid);
        return isValid;
    }
}