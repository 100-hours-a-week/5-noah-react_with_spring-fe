const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

const validateEmail = (email) => {
    if (email.length === 0) {
        return {
            status: false,
            message: '* 이메일을 입력해주세요.',
        };
    }

    if (emailRegex.test(email)) {
        return {
            status: true,
            message: null,
        };
    } else {
        return {
            status: false,
            message: '* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)',
        };
    }
};

export default validateEmail;
