import { useState, useEffect } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/user_context";
import FormRow from "./FormRow";
import Link from "next/link";
import { useCurrentUser } from "../utils/useSWR";
import { useRouter } from "next/router";

function ChangePassword() {
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const { passwordChanged, changePassword, isLoading, showAlert } =
    useUserContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword } = values;
    changePassword({ oldPassword, newPassword });
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
              type="password"
              name="oldPassword"
              value={values.password}
              handleChange={handleChange}
              placeholder={"Old Password"}
            />
            <FormRow
              type="password"
              name="newPassword"
              value={values.password}
              handleChange={handleChange}
              placeholder={"New Password"}
            />

            <button
              type="submit"
              className="btn "
              disabled={isLoading || passwordChanged}
            >
              {isLoading ? "changing..." : "change"}
            </button>
            <br />
            <br />
            {showAlert && (
              <div className="alert alert-danger">Error : {showAlert.msg}</div>
            )}

            {passwordChanged && (
              <div className="alert alert-success">
                You have successfully change your Password.
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

export default ChangePassword;
