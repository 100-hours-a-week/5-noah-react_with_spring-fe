const updateNumberByUnit = (number) => {
    if (isNaN(number) || number < 0) {
        return 'ERROR';
    } else if (number < 1000) {
        return number;
    } else if (number < 10000) {
        return '1k';
    } else if (number < 100000) {
        return '10k';
    } else {
        return '100k';
    }
};

export default updateNumberByUnit;
