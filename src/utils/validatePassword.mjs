const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,20}$/;

const validatePassword = (password) => {
    if (password.length === 0) {
        return {
            status: false,
            message: '* 비밀번호를 입력해주세요.',
        };
    }

    if (passwordRegex.test(password)) {
        return {
            status: true,
            message: null,
        };
    } else {
        return {
            status: false,
            message: '* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.',
        };
    }
};

export default validatePassword;
