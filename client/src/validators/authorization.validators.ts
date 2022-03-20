import isEmail from "validator/lib/isEmail";
import validator from "validator";
import isNumeric = validator.isNumeric;
import isAlphanumeric = validator.isAlphanumeric;

const validateEmail = (email: string): boolean => {
    return email.length ? !isEmail(email) : false
}

const validatePassword = (password: string): boolean => {
    return password.length ? !(isAlphanumeric(password, 'en-US') && password.length > 4) : false;
}

const validateName = (name: string): boolean => {
    return name.length ? isNumeric(name) : false;
}

export {validateEmail, validateName, validatePassword}
