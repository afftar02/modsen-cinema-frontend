import { Icon } from 'modsen-library';
import { styled } from 'styled-components';

export const StyledSelect = styled.select<{
  $color: string;
  $optionBgColor: string;
  $selectHoverColor: string;
}>`
  appearance: none;
  /* safari */
  -webkit-appearance: none;
  background-color: transparent;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 300;
  color: ${(props) => props.$color};
  outline: none;
  padding: 5px 0 5px 15px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.$selectHoverColor};
  }

  & option {
    background-color: ${(props) => props.$optionBgColor};
  }
`;

export const SelectContainer = styled.div`
  position: relative;
`;

export const SelectArrow = styled(Icon)`
  transform: rotate(90deg);
  position: absolute;
  right: 15px;
  top: 10px;
`;
