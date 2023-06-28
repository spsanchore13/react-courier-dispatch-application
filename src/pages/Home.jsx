import axios from "axios";
import Form from "../components/Form";
import ShowCharges from "../components/ShowCharges";
import { useState } from "react";
import Loading from "../components/Loading";

const Home = () => {
  const [result, setResult] = useState({});
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const [error, setError] = useState("");

  const calculateCharges = (payload) => {
    setShowLoadingIndicator(true);
    setResult({});
    axios
      .post(
        `https://react-courier-dispatch.onrender.com/courier/charges`,
        payload
      )
      .then((res) => {
        // console.log(res);
        if (error) {
          setError("");
        }
        setResult(res.data);
        setShowLoadingIndicator(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setShowLoadingIndicator(false);
        console.error(err);
      });
  };
  return (
    <div data-cy="courier_container">
      {!showLoadingIndicator ? (
        <>
          <Form calculateCharges={calculateCharges} setResult={setResult} />
          {result.DeliveryPinCode ? <ShowCharges {...result} /> : null}
        </>
      ) : (
        <Loading />
      )}

      {!showLoadingIndicator && error ? (
        <div data-cy="error_message">{error}</div>
      ) : null}
    </div>
  );
};

export default Home;
