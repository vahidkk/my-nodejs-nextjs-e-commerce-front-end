import { useState, useEffect } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import { useCartContext } from "../context/cart_context";
import { useCurrentUser } from "../utils/useSWR";
import { formatPrice } from "../utils/helpers";
import { useRouter } from "next/router";

const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);
const CheckoutForm = () => {
  const {
    cart: purchase,
    total_amount,
    shipping_fee,
    clearCart,
    countCartTotal,
  } = useCartContext();
  const { loggedInUser, loggedInUserID } = useCurrentUser();
  const router = useRouter();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [isTotalAmountTrue, setIsTotalAmountTrue] = useState(true);
  const [intentId, setIntentId] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const createPaymentIntent = async () => {
    try {
      const { data } = await axios.post("/api/stripe", {
        purchase,
        shipping_fee,
        total_amount,
      });
      setClientSecret(data.clientSecret);
      return true;
    } catch (err) {
      setError(err.response.data);
      setDisabled(true);
    }
  };
  const postOrderToBackEnd = async (orderStatus) => {
    try {
      const { data } = await axios.post("/api/orders", {
        tax: 1,
        shippingFee: shipping_fee,
        subtotal: total_amount,
        total: total_amount,
        items: purchase,
        status: orderStatus,
        user: loggedInUserID,
        clientSecret: 0,
      });
      setIsTotalAmountTrue(
        data.order.total === total_amount + shipping_fee + data.order.tax
      );
      setIntentId(data.order._id);
    } catch (err) {
      setError(err.response.data);
      setDisabled(true);
    }
  };
  const patchOrderBackEnd = async (orderStatus) => {
    try {
      const data = await axios.patch(`/api/orders/${intentId}`, {
        paymentIntentId: intentId,
        status: orderStatus,
      });
      if (orderStatus === "paid") {
        for (const item of purchase) {
          const revalidate = await axios.get(
            `/api/revalidate?secret=${
              process.env.NEXT_PUBLIC_REVALIDATE_SECRET_TOKEN
            }&path=${"product/" + item.product}`
          );
        }
      }
    } catch (err) {}
  };
  useEffect(() => {
    total_amount && createPaymentIntent() && postOrderToBackEnd("pending");
  }, [total_amount]);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      patchOrderBackEnd("failed");
      setProcessing(false);
    } else {
      setError(null);
      patchOrderBackEnd("paid");
      setProcessing(false);
      setSucceeded(true);
      setTimeout(() => {
        clearCart();
        router.push("/");
      }, 10000);
    }
  };

  return (
    <div>
      {succeeded ? (
        <article>
          <br />
          <br />
          <h4>Thank you</h4>
          <h4>Your payment was successful!</h4>
          <h3>Redirecting to home page shortly ...</h3>
        </article>
      ) : (
        <article>
          <br />
          <br />
          <h3>Hello, {loggedInUser && loggedInUser}</h3>
          <br />
          <h4>
            Your cart's total amount is :
            <b> {formatPrice(shipping_fee + total_amount)}</b>
            {isTotalAmountTrue === false &&
              "It seems that your cart total price is not matching with our calculation. Please contact our support team."}
          </h4>
          <p className="test-card">(test Card Number : 4242 4242 4242 4242)</p>
        </article>
      )}
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          disabled={processing || disabled || succeeded || !isTotalAmountTrue}
          id="submit"
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinnier"></div> : "Pay"}
          </span>
        </button>
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          <br />
          Payment succedded !
        </p>
      </form>
    </div>
  );
};

const StripeCheckout = () => {
  return (
    <Wrapper>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  form {
    width: 30vw;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  .test-card {
    color: var(--clr-grey-5);
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  .result-message {
    text-align: center;
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  button {
    background: var(--clr-primary-2);
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: var(--clr-primary-2);
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: var(--clr-primary-2);
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media (max-width: 1200px) {
    form {
      width: 40vw;
    }
  }
  @media (max-width: 700px) {
    form {
      width: 80vw;
    }
  }
`;

export default StripeCheckout;
