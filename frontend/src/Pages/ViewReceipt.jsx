import React, { useEffect, useState } from "react";
import "./ViewReceipt.css";
//import Navbar from "../Components/Navbar";
const ViewReceipt = () => {
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipts, setSelectedReceipts] = useState(new Set());

  useEffect(() => {
    const savedReceipts = JSON.parse(localStorage.getItem("receipts")) || [];
    setReceipts(savedReceipts);
  }, []);

  const handleAdd = () => {
    window.location.href = "/addreceipt";
  };

  const handleEdit = () => {
    const selectedIndex = Array.from(selectedReceipts)[0];
    if (selectedIndex !== undefined) {
      window.location.href = `/editreceipt/${selectedIndex}`;
    }
  };

  const handleDelete = () => {
    const updatedReceipts = receipts.filter(
      (_, index) => !selectedReceipts.has(index)
    );
    setReceipts(updatedReceipts);
    localStorage.setItem("receipts", JSON.stringify(updatedReceipts));
    setSelectedReceipts(new Set());
  };

  const handleSelect = (index) => {
    const newSelectedReceipts = new Set(selectedReceipts);
    if (newSelectedReceipts.has(index)) {
      newSelectedReceipts.delete(index);
    } else {
      newSelectedReceipts.add(index);
    }
    setSelectedReceipts(newSelectedReceipts);
  };

  return (
    <>
      <div className="view-receipt-container">
        <div className="view-receipt-card">
          <h1>Receipts</h1>
          <div className="button-container">
            <button className="btn-add" onClick={handleAdd}>
              Add
            </button>
            <button
              className="btn-edit"
              onClick={handleEdit}
              disabled={selectedReceipts.size !== 1}
            >
              Edit
            </button>
            <button
              className="btn-delete"
              onClick={handleDelete}
              disabled={selectedReceipts.size === 0}
            >
              Delete
            </button>
          </div>

          {receipts.length === 0 ? (
            <p>No receipts available.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Reason</th>
                  <th>Amount</th>
                  <th>Submitter</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((receipt, receiptIndex) =>
                  receipt.items.map((item, itemIndex) => (
                    <tr key={`${receiptIndex}-${itemIndex}`}>
                      {itemIndex === 0 && (
                        <td rowSpan={receipt.items.length}>
                          <input
                            type="checkbox"
                            checked={selectedReceipts.has(receiptIndex)}
                            onChange={() => handleSelect(receiptIndex)}
                          />
                        </td>
                      )}
                      {itemIndex === 0 && (
                        <td rowSpan={receipt.items.length}>{receipt.date}</td>
                      )}
                      <td>{item.description}</td>
                      <td>{item.reason}</td>
                      <td>{item.amount}</td>
                      {itemIndex === 0 && (
                        <td rowSpan={receipt.items.length}>
                          {receipt.submitter}
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewReceipt;
