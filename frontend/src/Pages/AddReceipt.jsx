import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./AddReceipt.css";

const AddReceipt = () => {
  const [date, setDate] = useState("");
  const [items, setItems] = useState([
    { description: "", reason: "", otherReason: "", amount: "", image: null },
  ]);
  const [file, setFile] = useState(null);
  const [showOther, setShowOther] = useState([false]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const allFieldsValid = () => {
    if (!date) return false;

    return items.every((item) => {
      if (!item.description || !item.amount || !item.reason) {
        return false;
      }

      if (item.reason === "other" && !item.otherReason) {
        return false;
      }
      return true;
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];

    if (name === "amount") {
      // Ensure amount is always a string
      newItems[index][name] = value.toString();
    } else {
      if (name === "reason" && value === "other") {
        setShowOther(
          showOther.map((_, i) => (i === index ? true : showOther[i]))
        );
      } else if (name === "reason") {
        newItems[index].otherReason = "";
        setShowOther(
          showOther.map((_, i) => (i === index ? false : showOther[i]))
        );
      }

      newItems[index] = { ...newItems[index], [name]: value };
    }
    setItems(newItems);
  };

  const handleFileChange = (index, e) => {
    const newItems = [...items];
    newItems[index].image = e.target.files[0];
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("date", date);
    items.forEach((item, index) => {
      formData.append(`items[${index}][description]`, item.description);
      formData.append(`items[${index}][reason]`, item.reason);
      formData.append(`items[${index}][otherReason]`, item.otherReason);
      formData.append(`items[${index}][amount]`, item.amount);
      if (item.image) {
        formData.append(`items[${index}][image]`, item.image);
      }
    });

    try {
      await axios.post(
        "https://66e590885cc7f9b6273db7ff.mockapi.io/Receipt-Mgmt/expense",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Save receipt to local storage
      const newReceipt = { date, items };
      const savedReceipts = JSON.parse(localStorage.getItem("receipts")) || [];
      localStorage.setItem(
        "receipts",
        JSON.stringify([...savedReceipts, newReceipt])
      );

      setSuccess("Receipts added successfully!");
      setError(null);
      setDate("");
      setItems([
        {
          description: "",
          reason: "",
          otherReason: "",
          amount: "",
          image: null,
        },
      ]);
      setShowOther([false]);
    } catch (err) {
      setError("Failed to add receipts. Please try again.");
      setSuccess(null);
    }
  };

  const handleCancel = () => {
    setDate("");
    setItems([
      { description: "", reason: "", otherReason: "", amount: "", image: null },
    ]);
    setShowOther([false]);
  };

  return (
    <div className="add-receipt-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="add-receipt-card"
      >
        <h1
          style={{
            color: "#008CBA",
            fontFamily: "Arial, sans-serif",
            fontSize: "2.5rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "1.5rem",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          Add Receipts
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date</label>
            <br />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{
                padding: "5px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </div>

          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ marginBottom: "15px" }}
            >
              {/* Description field */}
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                  style={{ minHeight: "80px" }}
                />
              </div>

              {/* Reason dropdown */}
              <div className="form-group">
                <label>Reason</label>
                <select
                  name="reason"
                  value={item.reason || ""}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                  style={{
                    display: "block",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                    marginBottom: "10px",
                    width: "150px",
                  }}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {}
                  <option value="snacks">Snacks</option>
                  <option value="prasad">Prasad</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Other reason input */}
              {showOther[index] && (
                <div className="form-group">
                  <textarea
                    name="otherReason"
                    value={item.otherReason}
                    placeholder="Please specify"
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>
              )}

              {/* Amount field */}
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={item.amount}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                />
                <label>Attachment</label>
                <input
                  onChange={(e) => handleFileChange(index, e)}
                  type="file"
                  name="image"
                  accept="image/*"
                />
              </div>
            </motion.div>
          ))}

          <button type="submit" disabled={!allFieldsValid()} className="save">
            Save
          </button>

          <button
            type="button"
            disabled={!allFieldsValid()}
            className="cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </motion.div>
    </div>
  );
};

export default AddReceipt;
