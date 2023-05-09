import { useState, ChangeEvent, useEffect } from "react";
import useValidation, { ValidationsType, ValidationResultType } from "./useValidation";

interface UseAuthInputReturnType extends ValidationResultType {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: ChangeEvent<HTMLInputElement>) => void;
    isDirty: boolean;
}

const useAuthInput = (initialValue: string, validations: ValidationsType, confirmValue?: string): UseAuthInputReturnType => {
    const [value, setValue] = useState<string>(initialValue);
    const [errorString, setErrorString] = useState<string>();
    const [isDirty, setDirty] = useState<boolean>(false);
    const valid = useValidation(value, validations, confirmValue);

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
    };

    const onBlur = (event: ChangeEvent<HTMLInputElement>): void => {
        setDirty(true);
    };

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid,
    };
};

export default useAuthInput;