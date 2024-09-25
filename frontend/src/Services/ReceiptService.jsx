import axios from "axios";

const API_URL = "http://localhost:8080/api/receipts/";

class ReceiptService {
  getAllReceipts() {
    return axios.get(API_URL);
  }

  addReceipt = async (formData) => {
    try {
      const response = await axios.post(API_URL + "add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding receipt:", error);
      throw error;
    }
  };

  getReceiptsByUser(userId) {
    return axios.get(API_URL + "user/" + userId);
  }
}

export default new ReceiptService();
