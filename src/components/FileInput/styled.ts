import { styled } from "styled-components";

export const StyledInput = styled.input`
  &[type='file'] {
    display: none;
  }
`;

export const FileUploadLabel = styled.label<{
  $isUploaded: boolean;
  $borderColor: string;
  $textColor: string;
  $uploadedBgColor: string;
  $uploadedColor: string;
}>`
  width: fit-content;
  border: 1px solid ${(props) => props.$borderColor};
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  color: ${(props) => props.$textColor};
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 300;
  ${(props) =>
  props.$isUploaded &&
  `
    background-color: ${props.$uploadedBgColor};
    color: ${props.$uploadedColor};
  `}
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #4f4f4f;
    color: #fff;
  }
`;

export const UploadedFileName = styled.span<{ $color: string }>`
  color: ${(props) => props.$color};
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 300;
`;

export const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;