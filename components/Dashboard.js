import { useState, useEffect } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/user_context";
import { useCurrentUser } from "../utils/useSWR";
import { useRouter } from "next/router";
import axios from "axios";

function Dashboard() {
  const { user, isLoading, logout } = useUserContext();
  const { loggedInUser, mutate } = useCurrentUser();

  const router = useRouter();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      res.status === 200 && mutate({ loggedInUser: null }) && logout();
      router.push("/login");
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    !loggedInUser && router.push("/");
  }, []);
  // useEffect(() => mutate(), [user]);

  return (
    <>
      <Wrapper className="page full-page">
        <div className="container">
          <h3>Welcome {loggedInUser} !</h3>
          <button
            type="submit"
            className="btn "
            onClick={() => router.push("/user/orders-history")}
          >
            Orders history
          </button>
          <br />
          <button
            type="submit"
            className="btn "
            onClick={() => router.push("/user/change-name")}
          >
            Change my name
          </button>
          <br />
          <button
            type="submit"
            className="btn "
            onClick={() => router.push("/user/change-password")}
          >
            Change my password
          </button>
          <br />
          <button type="submit" className="btn " onClick={logoutHandler}>
            Logout
          </button>
          <br />
          <button
            type="submit"
            className="btn "
            onClick={() => router.push("/")}
          >
            Back to homepage
          </button>
          <p></p>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .form {
    max-width: 400;
    border-top: 5px solid var(--primary-500);
  }
  .page {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
  }
  .full-page {
    min-height: 100vh;
  }

  h4 {
    padding-top: 0.4em;
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

export default Dashboard;
