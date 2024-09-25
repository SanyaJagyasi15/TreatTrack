import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./AddReceipt.css";

const EditReceipt = () => {
  const { index } = useParams();
  const [receipt, setReceipt] = useState(null);
  const [date, setDate] = useState("");
  const [items, setItems] = useState([]);
  const [showOther, setShowOther] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedReceipts = JSON.parse(localStorage.getItem("receipts")) || [];
    const receiptToEdit = savedReceipts[index];

    if (receiptToEdit) {
      setReceipt(receiptToEdit);
      setDate(receiptToEdit.date);
      setItems(receiptToEdit.items);
      setShowOther(receiptToEdit.items.map((item) => item.reason === "other"));
    }
  }, [index]);

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];

    if (name === "amount") {
      newItems[index].amount = Math.max(value, 0);
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

  const handleUpdate = () => {
    const updatedReceipts = JSON.parse(localStorage.getItem("receipts"));
    updatedReceipts[index] = { ...receipt, date, items };
    localStorage.setItem("receipts", JSON.stringify(updatedReceipts));
    setSuccess("Receipt updated successfully!");
    setError(null);
    setTimeout(() => navigate("/viewreceipt"), 200);
  };

  const handleCancel = () => {
    navigate("/viewreceipt");
  };

  if (!receipt) return <p>Loading...</p>;

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
          Edit Receipt
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
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
                  <option value="snacks">Snacks</option>
                  <option value="prasad">Prasad</option>
                  <option value="other">Other</option>
                </select>
              </div>

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
                  type="file"
                  name="image"
                  onChange={(e) => handleFileChange(index, e)}
                />
              </div>
            </motion.div>
          ))}

          <button onClick={handleUpdate} className="save">
            Update
          </button>

          <button type="button" className="cancel" onClick={handleCancel}>
            Cancel
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </motion.div>
    </div>
  );
};

export default EditReceipt;
