import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { formatPrice } from "../utils/helpers";
import Link from "next/link";
import { useCurrentUser } from "../utils/useSWR";
import { useRouter } from "next/router";

const CartTotals = ({ data }) => {
  const { loggedInUser } = useCurrentUser();
  const router = useRouter();

  const {
    total_amount: total_amount_context,
    shipping_fee: shipping_fee_context,
  } = useCartContext();

  if (data) {
    const {
      total,
      subtotal: total_amount_history,
      shippingFee: shipping_fee_history,
      tax,
    } = data;
  }
  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal :{" "}
            <span>
              {formatPrice(
                total_amount_history
                  ? total_amount_history
                  : total_amount_context
              )}
            </span>
          </h5>
          <p>
            shipping fee :{" "}
            <span>
              {formatPrice(
                shipping_fee_history
                  ? shipping_fee_history
                  : shipping_fee_context
              )}
            </span>
          </p>
          <p>
            tax : <span>{formatPrice(tax ? tax : 1)}</span>
          </p>
          <hr />
          <h4>
            order total :
            <span>
              {total
                ? formatPrice(total)
                : formatPrice(total_amount_context + shipping_fee_context + 1)}
            </span>
          </h4>
        </article>
        {data ? (
          ""
        ) : loggedInUser ? (
          <Link href="/checkout">
            <a className="btn">proceed to checkout</a>
          </Link>
        ) : (
          <button
            type="button"
            className="btn"
            onClick={() => router.push("/login?next=checkout")}
          >
            login to pay
          </button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
