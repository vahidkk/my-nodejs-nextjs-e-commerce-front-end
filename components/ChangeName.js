import { useState, useEffect } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/user_context";
import FormRow from "./FormRow";
import Link from "next/link";
import { useCurrentUser } from "../utils/useSWR";
import { useRouter } from "next/router";

function ChangeName() {
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const { user, changeName, isLoading, showAlert } = useUserContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email } = values;
    changeName({ name, email });
  };
  const router = useRouter();
  const { loggedInUser } = useCurrentUser();
  useEffect(() => {
    !loggedInUser && router.push("/");
  }, []);

  return (
    <>
      <Wrapper className="page full-page">
        <div className="container">
          <form className="form" onSubmit={onSubmit}>
            <FormRow
              type="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
              placeholder={"Your Email"}
            />

            <FormRow
              type="name"
              name="name"
              value={values.name}
              handleChange={handleChange}
              placeholder={"New Name"}
            />

            <button type="submit" className="btn " disabled={isLoading || user}>
              {isLoading ? "changing..." : "change"}
            </button>
            <br />
            <br />
            {showAlert && (
              <div className="alert alert-danger">Error : {showAlert.msg}</div>
            )}

            {user && (
              <div className="alert alert-success">
                You have successfully change your name to :{" "}
                <b>
                  <u>{user}</u>
                </b>
                <br />
                <Link href="/">
                  <a className="btn ">Back to homepage</a>
                </Link>
              </div>
            )}
          </form>
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

export default ChangeName;
