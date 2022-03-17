import { UserPlus, UserMinus, ShoppingCart } from "react-feather";
import Link from "next/link";
import { useCurrentUser } from "../utils/useSWR";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useSideBarContext } from "../context/context";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import axios from "axios";

const CartButtons = () => {
  const { closeSidebar } = useSideBarContext();
  const { total_items, clearCart } = useCartContext();
  const { loggedInUser, mutate } = useCurrentUser();
  const router = useRouter();
  const { user, logout } = useUserContext();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      res.status === 200 && mutate({ loggedInUser: null }) && logout();
    } catch (err) {
      throw err;
    }
  };
  return (
    <Wrapper className="cart-btn-wrapper">
      <span href="/cart" className="cart-btn1" onClick={closeSidebar}>
        Cart
        <span className="cart-container">
          <ShoppingCart />
          <span className="cart-value">{total_items}</span>
        </span>
      </span>

      {loggedInUser ? (
        <button type="button" className="auth-btn" onClick={logoutHandler}>
          Logout
          <UserMinus />
        </button>
      ) : (
        <button
          type="button"
          className="auth-btn"
          onClick={() => router.push("/login")}
        >
          Login
          <UserPlus />
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn1 {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    cursor: pointer;
    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;
export default CartButtons;
