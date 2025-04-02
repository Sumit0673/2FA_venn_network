import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000/api";
console.log(API_URL)

export const sendTransaction = async (data) => {
	    return axios.post(`${API_URL}/transaction`, data);
};

export const verifyOTP = async (data) => {
	    return axios.post(`${API_URL}/otp/verify`, data);
};

