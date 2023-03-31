const validateEmailFormat = (email: string) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(email);
};

const validatePasswordFormat = (password: string) => {
    return password?.toString().length > 5
}

const validateNameFormat = (name: string) => {
    return name?.toString().length > 2
}

export {
    validateEmailFormat,
    validatePasswordFormat,
    validateNameFormat
}
