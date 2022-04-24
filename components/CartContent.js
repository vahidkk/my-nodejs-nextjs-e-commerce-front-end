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
          <p className="btn">
            {data ? "back to orders history" : "continue shopping"}
          </p>
        </Link>
        {!data ? (
          <p type="button" className="btn margin-left" onClick={clearCart}>
            clear shopping cart
          </p>
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
  @media (max-width: 776px) {
    .btn {
      text-align: center;
    }
    .margin-left {
      margin-left: 10px;
    }
  }
`;
export default CartContent;
