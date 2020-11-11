import styled from 'styled-components';

export const PageTitle = styled.h2`
  color: #5a5c69;
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 1.2;
`;

export const PageContextInfo = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 400;
  line-height: 1.2;
  color: #858796;
  text-align: left;
  background-color: transparent;
  svg {
    margin-right: 0.5rem;
  }
`;

const Pill = styled.span`
  margin-left: 0.5rem !important;
  padding-right: 0.6em;
  padding-left: 0.6em;
  border-radius: 10rem;
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
`;

export const PillSuccess = styled(Pill)`
  color: #fff;
  background-color: #1cc88a;
`;

export const PillPrimary = styled(Pill)`
  color: #fff;
  background-color: #4e73df;
`;

export const PillWarning = styled(Pill)`
  color: #fff;
  background-color: #f6c23e;
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 200;
  line-height: 1.2;
  color: rgb(58, 59, 69);
  text-align: left;
  background-color: transparent;
`;
