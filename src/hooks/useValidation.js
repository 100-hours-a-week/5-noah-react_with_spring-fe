import {useEffect, useState} from 'react';

const useValidation = (input, validator) => {
    const [helperText, setHelperText] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const result = validator(input);

        setHelperText(result.message);
        setIsValid(result.status);
    }, [input, validator]);

    const handleChangeHelperText = (value) => {
        setHelperText(value);
    };

    const handleInvalidate = () => {
        setIsValid(false);
    };

    return {
        helperText,
        isValid,
        handleChangeHelperText,
        handleInvalidate,
    };
};

export default useValidation;
