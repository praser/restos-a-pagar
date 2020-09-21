import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  background-color: #f8f9fc;
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export const Content = styled.div`
  background-color: #ffffff;
  border-radius: 0.35rem;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  max-width: 750px;
  min-width: 450px;
  padding: 25px;
  width: 80%;
`;

export const LoginImage = styled.img`
  display: block;
  height: 100%;
  width: 45%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 400px;
  width: 45%;
`;

export const Title = styled.h1`
  color: #3a3b45;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const Input = styled.input`
  background-clip: padding-box;
  background-color: #fff;
  border-radius: 10rem;
  border: 1px solid #d1d3e2;
  color: #6e707e;
  display: block;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 400;
  height: auto;
  line-height: 1.5;
  margin: 0;
  overflow: visible;
  padding: 0.7rem 1rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;

  &:focus {
    outline: none !important;
    box-shadow: 0 0 8px #719ece;
  }
`;

export const Button = styled.button`
  font-size: 0.8rem;
  border-radius: 10rem;
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
`;

export const Divider = styled.hr`
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const Link = styled.a`
  font-size: 80%;
  font-weight: 400;
  color: #4e73df;
  text-decoration: none;
  background-color: transparent;
  text-align: center;
`;
