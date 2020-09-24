import styled from 'styled-components';

export const Code = styled.div`
  color: #5a5c69;
  font-size: 7rem;
  line-height: 1;
  width: 12.5rem;
  position: relative;
  align-self: center;

  @keyframes noise-anim {
    0% {
      clip: rect(89px, 9999px, 100px, 0);
    }
    5% {
      clip: rect(4px, 9999px, 62px, 0);
    }
    10% {
      clip: rect(43px, 9999px, 16px, 0);
    }
    15% {
      clip: rect(2px, 9999px, 68px, 0);
    }
    20% {
      clip: rect(12px, 9999px, 6px, 0);
    }
    25% {
      clip: rect(89px, 9999px, 25px, 0);
    }
    30% {
      clip: rect(15px, 9999px, 38px, 0);
    }
    35% {
      clip: rect(57px, 9999px, 97px, 0);
    }
    40% {
      clip: rect(24px, 9999px, 72px, 0);
    }
    45% {
      clip: rect(81px, 9999px, 3px, 0);
    }
    50% {
      clip: rect(93px, 9999px, 26px, 0);
    }
    55% {
      clip: rect(68px, 9999px, 85px, 0);
    }
    60% {
      clip: rect(43px, 9999px, 28px, 0);
    }
    65% {
      clip: rect(44px, 9999px, 11px, 0);
    }
    70% {
      clip: rect(17px, 9999px, 33px, 0);
    }
    75% {
      clip: rect(74px, 9999px, 66px, 0);
    }
    80% {
      clip: rect(100px, 9999px, 4px, 0);
    }
    85% {
      clip: rect(92px, 9999px, 31px, 0);
    }
    90% {
      clip: rect(93px, 9999px, 98px, 0);
    }
    95% {
      clip: rect(23px, 9999px, 77px, 0);
    }
    100% {
      clip: rect(92px, 9999px, 8px, 0);
    }
  }

  @keyframes noise-anim-2 {
    0% {
      clip: rect(69px, 9999px, 53px, 0);
    }
    5% {
      clip: rect(37px, 9999px, 82px, 0);
    }
    10% {
      clip: rect(35px, 9999px, 22px, 0);
    }
    15% {
      clip: rect(97px, 9999px, 91px, 0);
    }
    20% {
      clip: rect(45px, 9999px, 56px, 0);
    }
    25% {
      clip: rect(82px, 9999px, 3px, 0);
    }
    30% {
      clip: rect(73px, 9999px, 70px, 0);
    }
    35% {
      clip: rect(70px, 9999px, 50px, 0);
    }
    40% {
      clip: rect(15px, 9999px, 87px, 0);
    }
    45% {
      clip: rect(78px, 9999px, 34px, 0);
    }
    50% {
      clip: rect(95px, 9999px, 21px, 0);
    }
    55% {
      clip: rect(82px, 9999px, 35px, 0);
    }
    60% {
      clip: rect(57px, 9999px, 30px, 0);
    }
    65% {
      clip: rect(21px, 9999px, 71px, 0);
    }
    70% {
      clip: rect(17px, 9999px, 42px, 0);
    }
    75% {
      clip: rect(69px, 9999px, 9px, 0);
    }
    80% {
      clip: rect(43px, 9999px, 54px, 0);
    }
    85% {
      clip: rect(39px, 9999px, 12px, 0);
    }
    90% {
      clip: rect(83px, 9999px, 34px, 0);
    }
    95% {
      clip: rect(57px, 9999px, 71px, 0);
    }
    100% {
      clip: rect(81px, 9999px, 41px, 0);
    }
  }

  &:before {
    content: '${props => props.children}';
    position: absolute;
    left: -2px;
    text-shadow: 1px 0 #4e73df;
    top: 0;
    color: #5a5c69;
    background: #f8f9fc;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: noise-anim-2 3s infinite linear alternate-reverse;
  }

  &:after {
    content: '${props => props.children}';
    position: absolute;
    left: 2px;
    text-shadow: -1px 0 #e74a3b;
    top: 0;
    color: #5a5c69;
    background: #f8f9fc;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: noise-anim 2s infinite linear alternate-reverse;
  }
`;

export const Description = styled.p`
  color: #5a5c69;
  margin-bottom: 5rem;
  font-size: 1.25rem;
  font-weight: 300;
  align-self: center;
`;

export const Paragraph = styled.p`
  color: #b7b9cc;
  align-self: center;
`;

export const GoBack = styled.button`
  color: #4e73df;
  text-decoration: none;
  background-color: transparent;
  cursor: pointer;
  border: none;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  align-self: center;

  &&:active {
    outline: none;
  }

  &&:focus {
    outline: none;
  }

  &&:hover {
    color: #4e00df;
  }
`;
