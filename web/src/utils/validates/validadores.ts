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

const validatePhoneFormat = (phone: string) => {
    return phone?.toString().length > 10
}

const validateDateFormat = (birthdate: string) => {
    return birthdate?.toString().length > 8
}

const validateTreatmentFormat = (treatment: string) => {
    return treatment?.toString().length > 1
}

const validateStatusFormat = (status: string) => {
    return status?.toString().length > 6
}

export {
    validateEmailFormat,
    validatePasswordFormat,
    validateNameFormat,
    validatePhoneFormat,
    validateDateFormat,
    validateTreatmentFormat,
    validateStatusFormat
}
