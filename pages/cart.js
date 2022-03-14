import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import Link from "next/link";
import PageHero from "../components/PageHero";
import CartContent from "../components/CartContent";

const CartPage = () => {
  const { cart } = useCartContext();
  if (!cart || cart.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <Link href="/products">
            <a className="btn">fill it</a>
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <main>
      <PageHero title="cart" />
      <Wrapper className="page">
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
