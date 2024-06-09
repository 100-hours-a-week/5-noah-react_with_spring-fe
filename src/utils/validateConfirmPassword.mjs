const validateConfirmPassword = (password, confirmPassword) => {
    if (confirmPassword.length === 0) {
        return {
            status: false,
            message: '* 비밀번호를 한번 더 입력해주세요.',
        };
    } else if (password !== confirmPassword) {
        return {
            status: false,
            message: '* 비밀번호가 다릅니다.',
        };
    } else {
        return {
            status: true,
            message: null,
        };
    }
};

export default validateConfirmPassword;
