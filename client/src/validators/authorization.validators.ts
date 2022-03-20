import isEmail from "validator/lib/isEmail";
import validator from "validator";
import contains = validator.contains;
import isNumeric = validator.isNumeric;

const validateEmail = (email: string): boolean => {
    return email.length ? !isEmail(email) : false
}


const validateName = (name: string): boolean => {
    return name.length ? isNumeric(name) : false;
}

export {validateEmail, validateName}
