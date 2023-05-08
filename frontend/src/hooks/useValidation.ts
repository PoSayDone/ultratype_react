import { useEffect, useState } from "react"

export interface ValidationsType {
    minLength?: number;
    isEmpty?: boolean;
    isEmail?: boolean;
    isConfirm?: boolean;
}

export interface ValidationResultType {
    isEmpty: boolean;
    minLengthError: boolean;
    emailError: boolean;
    inputValid: boolean;
    isSame: boolean;
    errorString: string;
}

const useValidation = (value: string, validations: ValidationsType, confirmValue?: string): ValidationResultType => {
    const [isEmpty, setIsEmpty] = useState<boolean>(true);
    const [isNotSame, setIsNotSame] = useState<boolean>(false);
    const [minLengthError, setMinLengthError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [inputValid, setInputValid] = useState<boolean>(false);
    const [errorString, setErrorString] = useState<string>("");

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation]!
                        ? setMinLengthError(true)
                        : setMinLengthError(false);
                    break;
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true);
                    break;
                case 'isEmail':
                    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true);
                    break;
                case 'isConfirm':
                    value == confirmValue ? setIsNotSame(false) : setIsNotSame(true)
                    break;
            }
        }
    }, [value, validations]);

    useEffect(() => {
        if (isEmpty || minLengthError || emailError || isNotSame) {
            setInputValid(false);
        } else {
            setInputValid(true);
        }
    }, [isEmpty, minLengthError, emailError, isNotSame]);

    useEffect(() => {
        setErrorString("")
        if (emailError && validations.isEmail) {
            setErrorString(`В поле должен находится email`);
        }
        if (isNotSame) {
            setErrorString(`Поля должны совпадать`);
        }
        if (minLengthError) {
            setErrorString(`Минимальная длина ${validations['minLength']}`);
        }
        if (isEmpty) {
            setErrorString("Поле не может быть пустым");
        }
    }, [isEmpty, minLengthError, emailError, isNotSame]);

    return {
        isEmpty,
        minLengthError,
        emailError,
        inputValid,
        isSame: isNotSame,
        errorString
    };
};

export default useValidation;