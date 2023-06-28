const { pinCodes, courierRates } = require("../constant/courierData");

const calculateCharge = (req, res) => {
  try {
    const { weight, pinCode, deliveryType } = req.body;

    const roundedWeight = Math.ceil(+weight * 2) / 2;

    const zone = pinCodes[pinCode];

    // console.log(zone);
    if (!zone) {
      res.status(401).send({
        message:
          "Sorry for the inconvenience!, Service not available for this pin code.",
      });
    } else {
      const { first, additional } = courierRates[deliveryType][zone];

      const expectedCharges = first + (roundedWeight - 0.5) * additional;

      res.status(200).send({
        ExpectedCourierCharges: expectedCharges,
        DeliveryPinCode: pinCode,
        CourierWeight: +weight,
        CourierDeliveryType: deliveryType,
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { calculateCharge };
