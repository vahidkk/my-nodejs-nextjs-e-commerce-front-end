import styled from "styled-components";
import { useOrderDetail } from "../../utils/useSWR";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import CartContent from "../../components/CartContent";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useRouter } from "next/router";

const Order = () => {
  const router = useRouter();
  const { number } = router.query;
  const { data, isLoading, isError } = useOrderDetail(number);

  return (
    <main>
      <PageHero title={`order : ${data ? data.order._id : "history"}`} />
      <Wrapper className="page">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error />
        ) : (
          <CartContent data={data} />
        )}
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

export default Order;
