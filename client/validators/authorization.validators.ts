import isEmail from "validator/lib/isEmail";
import validator from "validator";
import isAlpha = validator.isAlpha;
import contains = validator.contains;
import isAlphaLocales = validator.isAlphaLocales;

const validateEmail = (email: string): boolean => {
    return email.length ? !isEmail(email) : false
}

const validatePassword = (password: string): boolean => {
    return password.length ? contains(password, ' ') : false
}

const validateName = (name: string): boolean => {
    return name.length ? !isAlpha(name, 'ru-RU') : false;
}

export {validateEmail, validateName, validatePassword}
