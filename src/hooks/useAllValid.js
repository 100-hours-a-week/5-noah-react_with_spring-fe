import {useEffect, useState} from 'react';

const useAllValid = (...bools) => {
    const [result, setResult] = useState(false);

    useEffect(() => {
        setResult(bools.every(Boolean));
    }, [bools]);

    return result;
};

export default useAllValid;
