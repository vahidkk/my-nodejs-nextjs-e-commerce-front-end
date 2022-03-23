import { useState, useEffect } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/user_context";
import FormRow from "./FormRow";
import Link from "next/link";
import { useCurrentUser } from "../utils/useSWR";
import { useRouter } from "next/router";

function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { user, register, isLoading, showAlert } = useUserContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = values;
    register({ name, email, password });
  };
  const router = useRouter();
  const { loggedInUser, mutate } = useCurrentUser();
  useEffect(() => {
    loggedInUser && router.push("/");
  }, []);

  useEffect(() => {
    mutate();
    router.query.next === "checkout" && user && router.push("/checkout");
  }, [user]);

  return (
    <>
      <Wrapper className="page full-page">
        <div className="container">
          <form className="form" onSubmit={onSubmit}>
            <FormRow
              type="name"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />

            <FormRow
              type="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
            />

            <FormRow
              type="password"
              name="password"
              value={values.password}
              handleChange={handleChange}
            />

            <button type="submit" className="btn " disabled={isLoading || user}>
              {isLoading ? "Fetching..." : "Register"}
            </button>
            <br />
            <br />
            {showAlert && (
              <div className="alert alert-danger">Error : {showAlert.msg}</div>
            )}

            {user && (
              <div className="alert alert-success">
                You have successfully registered and logged-in. <br />
                <Link href="/">
                  <a className="btn ">Shop Now !</a>
                </Link>
              </div>
            )}

            <p>
              {!user && (
                <>
                  Already a member?<Link href="/login">Log in</Link>
                </>
              )}
            </p>
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

export default Register;
