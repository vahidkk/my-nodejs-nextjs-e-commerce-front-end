import styled from "styled-components";
import { useOrdersHistory } from "../utils/useSWR";
import OrderColumns from "./OrdersColumns";
import OrdersList from "./OrdersList";
import Loading from "./Loading";
import Error from "./Error";

const OrdersHistory = () => {
  const { data, isLoading, isError, mutate } = useOrdersHistory();

  return (
    <Wrapper className="section section-center">
      <OrderColumns />
      {data ? (
        data.orders.map((item) => {
          return <OrdersList key={item.id} {...item} />;
        })
      ) : isError ? (
        <Error />
      ) : (
        <Loading />
      )}
      <hr />
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
`;
export default OrdersHistory;
