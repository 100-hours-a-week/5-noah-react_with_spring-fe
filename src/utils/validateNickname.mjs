const validateNickname = (nickname) => {
    if (nickname.length === 0) {
        return {
            status: false,
            message: '* 닉네임을 입력해주세요.',
        };
    } else if (nickname.includes(' ')) {
        return {
            status: false,
            message: '* 띄어쓰기를 없애주세요.',
        };
    } else if (nickname.length > 10) {
        return {
            status: false,
            message: '* 닉네임은 최대 10자까지 작성 가능합니다.',
        };
    } else {
        return {
            status: true,
            message: '',
        };
    }
};

export default validateNickname;
