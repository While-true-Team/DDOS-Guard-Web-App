import axios from "axios";
import {RegistrationRequest, RegistrationResponse} from "../models/authorize.model";

export const registration = async (userData: RegistrationRequest) => {
    return await axios.post<RegistrationResponse>(`${window.location.protocol + "//" + window.location.hostname}:8080/register`, userData);
}