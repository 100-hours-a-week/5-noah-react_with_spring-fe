const validateUserImageFile = (userImageFile) => {
    if (userImageFile) {
        return {
            status: true,
            message: null,
        };
    } else {
        return {
            status: false,
            message: '* 프로필 사진을 추가해주세요.',
        };
    }
};

export default validateUserImageFile;
