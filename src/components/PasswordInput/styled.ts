import { styled } from "styled-components";

export const StrengthBar = styled.div`
  width: 0;
  height: 5px;
  transition: all 1s ease-in-out;

  &[data-complexity='None'] {
    width: 0;
  }
  &[data-complexity='Low'] {
    width: 33%;
    background: red;
  }
  &[data-complexity='Medium'] {
    width: 66%;
    background: orange;
  }
  &[data-complexity='High'] {
    width: 100%;
    background: green;
  }
`;

export const ComplexityLabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const ComplexityLabel = styled.span`
  transition: all 1s ease-in-out;

  &[data-complexity='None'] {
    color: transparent;
  }
  &[data-complexity='Low'] {
    color: red;
  }
  &[data-complexity='Medium'] {
    color: orange;
  }
  &[data-complexity='High'] {
    color: green;
  }
`;