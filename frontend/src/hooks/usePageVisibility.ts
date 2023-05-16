/*
* This react hook tracks page visibility using browser page visibility api.
* Reference: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
* 
* Use: const pageVisibilityStatus = usePageVisibility(); 
* Return type: boolean
*/

import { useState, useEffect } from 'react';

export default function usePageVisibility(): boolean {
    const [isFocused, setIsFocused] = useState(true);

    const onFocus = () => {
        setIsFocused(true)
    }

    const onBlur = () => {
        setIsFocused(false)
    }

    useEffect(() => {
        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);
        onFocus();
        return () => {
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur);
        };
    }, []);

    return isFocused;
}