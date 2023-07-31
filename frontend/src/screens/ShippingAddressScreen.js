import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckOutSteps from "../components/CheckOutSteps";

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalcode, setPostalCode] = useState(
    shippingAddress.postalcode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const onSubmitHandler = (event) => {
    event.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalcode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ fullName, address, city, postalcode, country })
    );
    navigate("/payment");
  };
  return (
    <div>
      <Helmet>Shipping Address</Helmet>
      <CheckOutSteps step1 step2></CheckOutSteps>
      <div className='container small-container'>
        <h1 className='my-3'>Shipping Address</h1>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className='mb-3' controlId='fullName'>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='postalcode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalcode}
              onChange={(event) => setPostalCode(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              required
            />
          </Form.Group>
          <div className='mb-3'>
            <Button variant='primary' type='submit'>
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
