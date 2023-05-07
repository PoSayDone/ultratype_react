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
    errorStringArray: string[]
}

const useValidation = (value: string, validations: ValidationsType, confirmValue?: string): ValidationResultType => {
    const [isEmpty, setIsEmpty] = useState<boolean>(true);
    const [isNotSame, setIsNotSame] = useState<boolean>(false);
    const [minLengthError, setMinLengthError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [inputValid, setInputValid] = useState<boolean>(false);
    const [errorStringArray, setErrorStringArray] = useState([""]);

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
        setErrorStringArray([])
        if (isEmpty) {
            setErrorStringArray(errorString => [...errorString, "Поле не может быть пустым"]);
        }
        if (minLengthError) {
            setErrorStringArray(errorString => [...errorString, `Минимальная длина ${validations['minLength']}`]);
        }
        if (emailError && validations.isEmail) {
            setErrorStringArray(errorString => [...errorString, `В поле должен находится email`]);
        }
        if (isNotSame) {
            setErrorStringArray(errorString => [...errorString, `Поля должны совпадать`]);
        }
    }, [isEmpty, minLengthError, emailError, isNotSame]);

    return {
        isEmpty,
        minLengthError,
        emailError,
        inputValid,
        isSame: isNotSame,
        errorStringArray
    };
};

export default useValidation;