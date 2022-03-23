import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import Link from "next/link";
import CartColumns from "./CartColumns";
import CartItem from "./CartItem";
import Error from "./Error";
import CartTotals from "./CartTotals";
import moment from "moment";

const CartContent = ({ data }) => {
  const { cart: cartContext, clearCart } = useCartContext();
  const cartHistory = data ? data.order.orderItems : undefined;
  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {cartHistory || cartContext ? (
        (cartHistory ? cartHistory : cartContext).map((item) => {
          return (
            <CartItem
              key={item.id}
              {...item}
              orderHistory={data ? true : false}
            />
          );
        })
      ) : (
        <Error />
      )}
      <hr />
      <div className="link-container">
        <Link href={data ? "/user/orders-history" : "/products"}>
          <p className="link-btn">
            {data ? "back to orders history" : "continue shopping"}
          </p>
        </Link>
        {!data ? (
          <button type="button" className="link-btn " onClick={clearCart}>
            clear shopping cart
          </button>
        ) : (
          <>
            <h4>order status : {data.order.status}</h4>
            <h4>
              created : {moment(data.order.createdAt).utc().format("DD/MM/YY")}
            </h4>
          </>
        )}
      </div>
      <CartTotals data={data ? data.order : null} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;
export default CartContent;
