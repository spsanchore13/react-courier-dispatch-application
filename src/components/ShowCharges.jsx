const ShowCharges = (result) => {
  return (
    <div className="show_charges">
      <h3>Delivery Type: {result.CourierDeliveryType}</h3>
      <h3>Pin Code: {result.DeliveryPinCode}</h3>
      <h3>Charges: Rs {result.ExpectedCourierCharges}</h3>
      <h3>Weight: {result.CourierWeight} kg</h3>
    </div>
  );
};

export default ShowCharges;
