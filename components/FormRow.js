import styled from "styled-components";

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  horizontal,
  placeholder,
}) => {
  return (
    <Wrapper>
      <div className="form-row">
        {!horizontal && (
          <label htmlFor={name} className="form-label">
            {name}
          </label>
        )}
        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className="form-input"
          placeholder={placeholder}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .form {
    width: var(--max-width);
    max-width: var(--max-width);
    background: var(--clr-primary-4);
    border-radius: var(--radius);
    box-shadow: var(--dark-shadow);
    padding: 2rem 2.5rem;
    margin: 3rem auto;
  }
  .form-label {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
  }
  .form-input,
  .form-textarea {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: var(--radius);
    background: var(--clr-primary-10);
    border: 1px solid var(--clr-primary-7);
  }

  .form-row {
    margin-bottom: 1rem;
  }

  .form-textarea {
    height: 7rem;
  }
  ::placeholder {
    font-family: inherit;
    letter-spacing: var(--spacing);
  }
  .form-alert {
    color: var(--clr-primary-7);
    letter-spacing: var(--spacing);
    text-transform: capitalize;
  }
`;

export default FormRow;
