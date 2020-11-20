import styled from 'styled-components';
import ReactSelect from 'react-select';

export const Select = styled(ReactSelect)`
  margin-bottom: 1rem;
`;

export const ErrorMesssage = styled.div`
  color: #ea4335;
  margin-top: 0.3rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  display: flex;
  flex-direction: column;
  ${props =>
    props.width && {
      width: props.width,
    }}

  ${props =>
    !props.width && {
      flex: 1,
    }}

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -5px;
  margin-left: -5px;
`;

export const Input = styled.input`
  display: block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6e707e;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d1d3e2;
  border-radius: 0.35rem;

  &:focus {
    color: #6e707e;
    background-color: #fff;
    border-color: #bac8f3;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
  }
`;

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #858796;
  text-align: left;
`;
