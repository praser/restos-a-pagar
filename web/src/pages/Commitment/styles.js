import styled from 'styled-components';

import Button from 'components/atoms/Button';

export const UploadFile = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`;

export const FindFile = styled(Button)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin-right: 0;
`;

export const FileName = styled.div`
  flex: 1;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6e707e;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d1d3e2;
  border-left: none;
  border-right: none;
  cursor: pointer;
`;

export const RemoveFile = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: 0;
`;
