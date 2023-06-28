import React, { useState } from "react";

const Form = ({ calculateCharges, setResult }) => {
  const [formData, setFormData] = useState({
    weight: "",
    pinCode: "",
    deliveryType: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateCharges(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="weight">Weight</label>
      <input
        type="number"
        name="weight"
        placeholder="Enter Courier Weight(Kg)"
        value={formData.weight}
        onChange={(e) => {
          setResult({});
          setFormData({ ...formData, weight: e.target.value });
        }}
      />
      <label htmlFor="pinCode">Pin Code</label>
      <input
        type="text"
        name="pinCode"
        placeholder="Enter Delivery Pin Code"
        value={formData.pinCode}
        onChange={(e) => {
          setResult({});
          setFormData({ ...formData, pinCode: e.target.value });
        }}
      />
      <label htmlFor="deliveryType">Delivery Type</label>
      <select
        name="deliveryType"
        value={formData.deliveryType}
        onChange={(e) => {
          setResult({});
          setFormData({ ...formData, deliveryType: e.target.value });
        }}
      >
        <option value="">Select Delivery Type</option>
        <option value="Forward">Forward</option>
        <option value="ForwardAndRTO">Forward & RTO</option>
      </select>
      <input type="submit" value="Calculate Charges" />
    </form>
  );
};

export default Form;
