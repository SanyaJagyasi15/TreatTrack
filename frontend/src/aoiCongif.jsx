const API_BASE_URL = "http://localhost:8080/api";

export const API_ENDPOINTS = {
  ADD_RECEIPT: `${API_BASE_URL}/receipts/add`,
  GET_RECEIPTS: `${API_BASE_URL}/receipts`,
  UPDATE_RECEIPT: (id) => `${API_BASE_URL}/receipts/${id}`,
  DELETE_RECEIPT: (id) => `${API_BASE_URL}/receipts/delete/${id}`,
};
