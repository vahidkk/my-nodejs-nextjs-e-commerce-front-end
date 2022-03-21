import styled from "styled-components";
import Link from "next/link";
import PageHero from "../components/PageHero";
import StripeCheckout from "../components/StripeCheckout";
import { useCartContext } from "../context/cart_context";

const CheckoutPage = () => {
  const { cart } = useCartContext();
  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        {!cart || cart.length < 1 ? (
          <div className="empty">
            <h2>your cart is empty</h2>
            <Link href="/products" className="btn">
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
