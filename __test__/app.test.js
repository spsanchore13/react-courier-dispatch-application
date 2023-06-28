const request = require("supertest");
const server = require("../server");
global.score = 1;

describe("Full Stack Courier Dispatch Application", () => {
  it("Able to setup server", async () => {
    const res = await request(server).get("/");
    expect(res.text).toEqual(
      '<h2 style="color:green;font-size:26px;margin:20px auto;">Welcome To Courier Dispatch Application</h2>'
    );

    global.score += 1;
  });

  it("Should return correct result when a POST request is made to endpoint `/courier/charges` for delivery type `Forward` - Test-1", async () => {
    const input = {
      weight: 2.2,
      pinCode: "313301",
      deliveryType: "Forward",
    };

    const res = await request(server)
      .post("/courier/charges")
      .send(input)
      .set("Accept", "application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.ExpectedCourierCharges).toEqual(89.6);
    expect(res.body.DeliveryPinCode).toEqual("313301");
    expect(res.body.CourierWeight).toEqual(2.2);
    expect(res.body.CourierDeliveryType).toEqual("Forward");

    global.score += 1;
  });

  it("Should return correct result when a POST request is made to endpoint `/courier/charges` for delivery type `Forward` - Test-2", async () => {
    const input = {
      weight: 0.4,
      pinCode: "175101",
      deliveryType: "Forward",
    };

    const res = await request(server)
      .post("/courier/charges")
      .send(input)
      .set("Accept", "application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.ExpectedCourierCharges).toEqual(56.6);
    expect(res.body.DeliveryPinCode).toEqual("175101");
    expect(res.body.CourierWeight).toEqual(0.4);
    expect(res.body.CourierDeliveryType).toEqual("Forward");

    global.score += 1;
  });

  it("Should return correct result when a POST request is made to endpoint `/courier/charges` for delivery type `Forward` - Test-3", async () => {
    const input = {
      weight: 17,
      pinCode: "305801",
      deliveryType: "Forward",
    };

    const res = await request(server)
      .post("/courier/charges")
      .send(input)
      .set("Accept", "application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.ExpectedCourierCharges).toEqual(499.95);
    expect(res.body.DeliveryPinCode).toEqual("305801");
    expect(res.body.CourierWeight).toEqual(17);
    expect(res.body.CourierDeliveryType).toEqual("Forward");

    global.score += 1;
  });

  it("Should return correct result when a POST request is made to endpoint `/courier/charges` for delivery type `Forward & RTO` - Test-1", async () => {
    const input = {
      weight: 5,
      pinCode: "673002",
      deliveryType: "ForwardAndRTO",
    };

    const res = await request(server)
      .post("/courier/charges")
      .send(input)
      .set("Accept", "application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.ExpectedCourierCharges).toEqual(606.8);
    expect(res.body.DeliveryPinCode).toEqual("673002");
    expect(res.body.CourierWeight).toEqual(5);
    expect(res.body.CourierDeliveryType).toEqual("ForwardAndRTO");

    global.score += 1;
  });

  it("Should return correct result when a POST request is made to endpoint `/courier/charges` for delivery type `Forward & RTO` - Test-2", async () => {
    const input = {
      weight: 17,
      pinCode: "173213",
      deliveryType: "ForwardAndRTO",
    };

    const res = await request(server)
      .post("/courier/charges")
      .send(input)
      .set("Accept", "application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.ExpectedCourierCharges).toEqual(1938.8);
    expect(res.body.DeliveryPinCode).toEqual("173213");
    expect(res.body.CourierWeight).toEqual(17);
    expect(res.body.CourierDeliveryType).toEqual("ForwardAndRTO");

    global.score += 1;
  });

  it("Should return correct result when a POST request is made to endpoint `/courier/charges` for delivery type `Forward & RTO` - Test-3", async () => {
    const input = {
      weight: 1.2,
      pinCode: "452001",
      deliveryType: "ForwardAndRTO",
    };

    const res = await request(server)
      .post("/courier/charges")
      .send(input)
      .set("Accept", "application/json");
    expect(res.statusCode).toEqual(200);
    expect(res.body.ExpectedCourierCharges).toEqual(176.3);
    expect(res.body.DeliveryPinCode).toEqual("452001");
    expect(res.body.CourierWeight).toEqual(1.2);
    expect(res.body.CourierDeliveryType).toEqual("ForwardAndRTO");

    global.score += 1;
  });

  it("Should return a error message if pin code does not match", async () => {
    const input = {
      weight: 1.2,
      pinCode: "343041",
      deliveryType: "ForwardAndRTO",
    };

    const res = await request(server)
      .post("/courier/charges")
      .send(input)
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toMatch(
      "Sorry for the inconvenience!, Service not available for this pin code."
    );
    global.score += 2;
  });
});
afterAll((done) => {
  done();
  console.log("Final Score is", global.score);
});
