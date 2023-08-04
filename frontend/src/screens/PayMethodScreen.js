import React, { useContext, useEffect, useState } from "react";
import CheckOutSteps from "../components/CheckOutSteps";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/esm/Button";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

export default function PayMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethod);
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <div className='container small-container'>
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className='my-3'>Choose Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className='mb-3'>
            <Form.Check
              type='radio'
              id='PayPal'
              value='Paypal'
              label='Paypal'
              checked={paymentMethodName === "PayPal"}
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
          </div>
          <div className='mb-3'>
            <Form.Check
              type='radio'
              id='Stripe'
              value='Stripe'
              label='Stripe'
              checked={paymentMethodName === "Stripe"}
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
          </div>
          <div className='mb-3'>
            <Button type='submit'>Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
