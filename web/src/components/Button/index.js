import styled from 'styled-components';

export const Button = styled.button`
  font-size: 0.8rem;
  border-radius: 0.35rem;
  padding: 0.75rem 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
  text-align: center;
  border: 1px solid transparent;
  line-height: 1.5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  cursor: pointer;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(58, 59, 69, 0.2);
  margin: 0 0.15rem;
  letter-spacing: 0.04rem;
  text-decoration: none;
  svg {
    margin-right: 0.3rem;
  }

  &:hover {
    background-color: #2e59d9;
    border-color: #2653d4;
    text-decoration: none;
    color: rgba(255, 255, 255, 1);
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(105, 136, 228, 0.5);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ButtonPrimary = styled(Button)`
  background-color: #4e73df;
  border-color: #4e73df;

  &:hover {
    background-color: #2e59d9;
    border-color: #2653d4;
  }
`;

export const ButtonDanger = styled(Button)`
  background-color: #ea4335;
  border-color: #ea4335;

  &:hover {
    background-color: #e12717;
    border-color: #e12717;
  }

  &&:focus {
    box-shadow: 0 0 0 0.2rem rgba(255, 39, 23, 0.5);
  }
`;

export const ButtonSecondary = styled(Button)`
  background-color: #36b9cc;
  border-color: #36b9cc;

  &:hover {
    background-color: #2c9faf;
    border-color: #2a96a5;
  }

  &&:focus {
    box-shadow: 0 0 0 0.2rem rgba(44, 159, 175, 0.5);
  }
`;

export const SmallButtonPrimary = styled(ButtonPrimary)`
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
`;

export const SmallButtonSecondary = styled(ButtonSecondary)`
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
`;
