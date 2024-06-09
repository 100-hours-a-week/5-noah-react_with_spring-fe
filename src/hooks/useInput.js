import {useState} from 'react';

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChangeWithValue = (value) => {
        setValue(value);
    };

    const handleChangeWithEvent = (event) => {
        setValue(event.target.value);
    };

    return {
        value,
        onChangeWithEvent: handleChangeWithEvent,
        onChangeWithValue: handleChangeWithValue,
    };
};

export default useInput;
