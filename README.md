<h1 style="color:black">
React Full Stack Courier Dispatch Application
</h1>

<h2 style="color:red">
Installation & Note:
</h2>

- Use node version(LTS) should be `v16.16.0`
- Don't change/override package.json
- Please make sure you do not push package-lock.json
- Make sure that the json-server is up and running at port `8080`
- Use `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}` as the json-server URL where ever you use `http://localhost:8080`

```
// install node_modules
npm install --engine-strict

// run locally
npm run start

// run server
npm run server

// run server jest tests
npm run test
```

<h1 style="color:#215dc8">
1. Backend Instructions 
</h1>

<h2 style="color:#215dc8">
Maximum Marks: 10
</h2>

```
✅ Able to make submission: - 1 Mark
✅ Able to setup server: - 1 Mark
✅ Should return correct result when a POST request is made to endpoint `/courier/charges` for delivery type `Forward` - Test-1: - 1 Mark
✅ Should return correct result when a POST request is made to endpoint `/courier/charges` for delivery type `Forward` - Test-2: - 1 Mark
✅ Should return correct result when a POST request is made to endpoint `/courier/charges` for delivery type `Forward` - Test-3: - 1 Mark
✅ Should return correct result when a POST request is made to endpoint `/courier/charges` for delivery type `Forward & RTO` - Test-1: - 1 Mark
✅ Should return correct result when a POST request is made to endpoint `/courier/charges` for delivery type `Forward & RTO` - Test-2: - 1 Mark
✅ Should return correct result when a POST request is made to endpoint `/courier/charges` for delivery type `Forward & RTO` - Test-3: - 1 Mark
✅ Should return a error message if pin code does not match: 2 mark
```

<h3 style="color:#215dc8">
I. Backend Folder Structure (Important Files)
</h3>

```
├── constant
|  └── courierData.js            ? pinCodes and courierRates data
├── controllers
|  └── courier.controller.js     ? Complete controller function in this file
├── package.json
├── README.md                    ? Implementation instructions
├── routes
|  └── courier.route.js          ? Create routes in this file
├── server.js                    ? Create server in this file
└── __test__                     ? Jest test cases
   └── app.test.js
```

<h3 style="color:#215dc8">
II. Endpoints needs to be implemented
</h3>

<h4 style="color:#215dc8">
A. GET - "/" - 1 Mark
</h4>

- This will return a html `h2` tag with the text `Welcome To Courier Dispatch Application`

<h4 style="color:#215dc8">
B. POST - "/courier/charges" - 6 Marks
</h4>

- This route will take the following three inputs from users:

  - Weight of product in KG, upto two decimal points (user to input decimal value)
  - 6-digit customer pincode (user to input customer pincode)
  - Delivery type via drop down (user to choose between two options: “Forward” or “Forward
    & RTO”)

- Request body -

  ```
  {
    weight: 5,                      ? Weight of courier
    pinCode: "673002",              ? 6 digit pin code
    deliveryType: "ForwardAndRTO",  ? Can be `Forward` or `ForwardAndRTO`
  }
  ```

- Response of the this route should be:

  - Expected courier charge with courier details

  ```
  {
    ExpectedCourierCharges: "",   ? Courier expected charges
    DeliveryPinCode: "",          ? Delivery pin code
    CourierWeight: "",            ? Courier weight(received from user)
    CourierDeliveryType: ",       ? Delivery Type
  }
  ```

- As soon as the user provides the required information, do the following:
  - Round up (to upper value) the weight in a multiples of 0.5 KG (examples: 0.4 -> 0.5; 0.5 -> 0.5; 0.950 ->
    1, 2.2 > 2.5)
  - Take user given pincode and lookup in “Company X - Pincode Zones” to see applicable zone(data given into directory `constant/courierData.js`)
  - Take rounded-up weight (step #1), applicable zone (step #2) and Delivery type (user
    input) and calculate the expected rate using the “Courier Company Rates”
  - return expected courier charge into response with status code `200`.
  - if pin code not exist, then return an error message with status code `401`
  ```
  {
    message:"Sorry for the inconvenience!, Service not available for this pin code.",
  }
  ```

<h1 style="color:#215dc8">
1. Frontend Instructions 
</h1>

You need to develop a website where user can enter weight, pincode and select courier type and on submitting need to show the details of the courier along with the charges.

<figure>
<img src="https://i.imgur.com/Y7990rI.gif" style="border: 1px solid gray; border-radius: 5px;" width="100%"/>
</figure>

<h2 style="color:#215dc8">
Maximum Marks: 10
</h2>

```
✅ Able to make a submission: - 1 Mark
✅ Should have an application title visible: - 1 mark
✅ Should be able to check the courier details for Forward Type: - 2 marks
✅ Should be able to check the courier details for ForwardAndRTO Type: - 2 marks
✅ Form is getting reset after submitting the courier details and the ShowCharges component exists on the DOM: - 1 mark
✅ Whenever the user re-enters the form the ShowCharges should not exist on the DOM: - 1 mark
✅ Loading indicator should exist on the DOM between req and res of the server: - 1 mark
✅ if pin code does not exist then it should show error message received from server: 1 mark
```

<h3 style="color:#215dc8">
I. Frontend Folder Structure (Important Files)
</h3>

```
├── src
|  ├── App.css
|  ├── App.js
|  ├── components
|  |  ├── Form.jsx
|  |  ├── Loading.jsx
|  |  └── ShowCharges.jsx
|  ├── index.css
|  ├── index.js
|  └── pages
|     └── Home.jsx

```

<h3 style="color:#215dc8">
II. Components
</h3>

<h4 style="color:#215dc8">
A. App.js
</h4>

- App.js will contain the following components:
  - This `h1` tag should contain textContent `Calculate shipping rates`.
  - Import the `Home` component here.

<h4 style="color:#215dc8">
B. Home.jsx
</h4>

<figure>
<img src="https://i.imgur.com/yJ4fMJd.png" style="border: 1px solid gray; border-radius: 5px;" width="100%"/>
<figcaption align = "center"><b>Fig .1 Initial Page</b></figcaption>
</figure>

- This component will display either a `Form` component along with a `ShowCharges` component or a `Loading` component, but not both at the same time.
- The `ShowCharges` component should only be rendered when there is a need to display the results, such as showing the courier details, and charges obtained from the response.
- If entered pin code is not serviceable then show error message returned from server into a `div` tag with attribute `data-cy="error_message"`
- In all other cases, such as on page load, when the user is entering details in the `form`, the `ShowCharges` component should not be rendered on the `DOM`.
- For example,
  - Initially, on page load, the `ShowCharges` component should not be rendered on the `DOM`.
  - When the user enters the details in the form and submits the form, the loading indicator(Loading.jsx) should be visible between `req` and `res`, and when we get the response shows the `ShowCharges` component.
  - Again when the user starts entering details again, the `ShowCharges` component should not exist on the DOM.

<h4 style="color:#215dc8">
C. Form.jsx
</h4>

- This component will contain a form already provided in the boilerplate, you just need to add functionality.
- It will contain the `input` tags to enter `weight`, `pinCode`, and `select` tag to select the `Delivery Type`.
- On submitting the form(use onSubmit) make a `POST` request to `/courier/charges` with the appropriate payload.
- Now on a successful `POST` request you should get the response in such a way that all the details regarding the courier should be there. The sample response should include the following details.

```JSON
{
  CourierDeliveryType: "ForwardAndRTO",
  CourierWeight:12,
  DeliveryPinCode: "507101",
  ExpectedCourierCharges:1117.1
}
```

Note:-

Here the `CourierWeight` will be the actual weight the user enters. It means the response will show the `ExpectedCourierCharges` as per the `rounded-up` weight, but we will display the `weight` entered by the user only.

The form input fields should get empty after form submission.

<h4 style="color:#215dc8">
D. ShowCharges.jsx
</h4>

<figure>
<img src="https://i.imgur.com/NieNhaJ.png"  style="border: 1px solid gray; border-radius: 5px;" width="100%"/>
<figcaption align = "center"><b>Fig .2 - After submitting one query</b></figcaption>
</figure>

This component should be used to display the expected charges of the courier, once when the user submits all the details of the courier successfully for which charges need to be known.

This should contain the following HTML elements along with text content as mentioned below.

```HTML
<h3>Delivery Type: {CourierDeliveryType}</h3>
<h3>Pin Code: {DeliveryPinCode}</h3>
<h3>Charges: Rs {ExpectedCourierCharges}</h3>
<h3>Weight: {CourierWeight} kg</h3>
```

The details mentioned above `CourierDeliveryType`, `DeliveryPinCode`, `ExpectedCourierCharges`, `CourierWeight` should be the actual details of the courier(delivery type, pinCode, ExpectedCourierCharges) that we will/should get as a response after sending`POST` request to the server.

<figure>
<img src="https://i.imgur.com/jh9knpe.png"  style="border: 1px solid gray; border-radius: 5px;" width="100%"/>
<figcaption align = "center"><b>Fig .3 - After submitting another query</b></figcaption>
</figure>

<h4 style="color:#215dc8">
E. Loading.jsx
</h4>

- The Loading component should exist on the DOM between `req` and `res` from the server.

<figure>
<img src="https://i.imgur.com/2BIV0dc.png"  style="border: 1px solid gray; border-radius: 5px;" width="100%"/>
<figcaption align = "center"><b>Fig .4 - Between request and response of json server</b></figcaption>
</figure>

<h2 style="color:#215dc8">
General Instructions:
</h2>

- Do not remove `data-cy=’xxx` or `data-testid=xxx` from anywhere inside the code. They are the test inputs, removing them, may lead to low scores.
- Do not change the current folder structure, and names of components provided.
- Only use the data present in the db.json file, and do not modify the data in the JSON file.

<h2 style="color:#215dc8">
General guidelines:
</h2>

- The system on cp.masaischool.com may take between 1-20 minutes for responding
- So we request you to read the problem carefully and debug it before itself.
