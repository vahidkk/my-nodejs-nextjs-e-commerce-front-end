import styled from "styled-components";
import { useEffect } from "react";
import { formatPrice } from "../utils/helpers";
import { MdPendingActions, MdFactCheck, MdSmsFailed } from "react-icons/md";
import Link from "next/link";
import moment from "moment";
import { useCurrentUser } from "../utils/useSWR";
import { useRouter } from "next/router";

const OrdersList = ({ _id: order, total, status, createdAt }) => {
  const { loggedInUser } = useCurrentUser();
  const router = useRouter();
  useEffect(() => !loggedInUser && router.push("/"), []);

  return (
    <Wrapper>
      <div className="order">
        <div>
          <h5 className="name">
            <u>
              <Link href={`order?number=${order}`}>{order}</Link>
            </u>
          </h5>
        </div>
      </div>
      <h5 className="total">{moment(createdAt).utc().format("DD/MM/YY")}</h5>
      <h5 className="total">{formatPrice(total)}</h5>
      <h5 className="total">{status}</h5>
      <h4 className="total-icon">
        {status === "pending" ? (
          <MdPendingActions />
        ) : status === "paid" ? (
          <MdFactCheck />
        ) : (
          <MdSmsFailed />
        )}
      </h4>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .subtotal {
    display: none;
  }
  .total {
    display: none;
  }
  .total-icon {
    display: block;
    font-size: 1.3rem;
    color: var(--clr-primary-2);
    font-weight: 400;
    padding-top: 17px;
  }
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .order {
    height: 100%;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }

  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }

  .total-small {
    color: var(--clr-primary-2);
  }
  .amount-btns {
    width: 75px;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.75rem;
    }
    h2 {
      font-size: 1rem;
    }
  }
  .remove-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  @media (min-width: 776px) {
    .subtotal {
      display: block;
      margin-bottom: 0;
      color: var(--clr-grey-5);
      font-weight: 400;
      font-size: 1rem;
    }
    .total-small {
      display: none;
    }
    .total {
      display: block;
      font-size: 1rem;
      color: var(--clr-primary-2);
      font-weight: 400;
    }
    .total-icon {
      display: block;
      font-size: 1.3rem;
      color: var(--clr-primary-2);
      font-weight: 400;
      padding-top: 17px;
    }
    .name {
      font-size: 0.85rem;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;

    .order {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`;

export default OrdersList;
