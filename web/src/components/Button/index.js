import styled from 'styled-components';

export const Button = styled.button`
  font-size: 0.8rem;
  border-radius: 0.35rem;
  padding: 0.75rem 1rem;
  color: #fff;
  font-weight: 400;
  text-align: center;
  border: 1px solid transparent;
  line-height: 1.5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #2e59d9;
    border-color: #2653d4;
    text-decoration: none;
  }

  &&:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(105, 136, 228, 0.5);
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
