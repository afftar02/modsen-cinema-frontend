import { styled } from 'styled-components';
import { ChangeEvent, useCallback } from 'react';

type FileInputProps = {
  uploadText: string;
  uploadedText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  borderColor: string;
  textColor: string;
  uploadedButtonBgColor: string;
  uploadedButtonColor: string;
  value?: string;
};

const StyledInput = styled.input`
  &[type='file'] {
    display: none;
  }
`;

const FileUploadLabel = styled.label<{
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

const UploadedFileName = styled.span<{ $color: string }>`
  color: ${(props) => props.$color};
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 300;
`;

const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

function FileInput({
  onChange,
  value,
  uploadText,
  uploadedText,
  borderColor,
  textColor,
  uploadedButtonBgColor,
  uploadedButtonColor,
}: FileInputProps) {
  const cutFileName = useCallback((fileName: string) => {
    const cutFromIndex = fileName.lastIndexOf('\\') + 1;
    return fileName.slice(cutFromIndex);
  }, []);

  return (
    <FileInputContainer>
      <FileUploadLabel
        htmlFor="avatar-file"
        $isUploaded={!!value}
        $borderColor={borderColor}
        $textColor={textColor}
        $uploadedBgColor={uploadedButtonBgColor}
        $uploadedColor={uploadedButtonColor}
      >
        {value ? uploadedText : uploadText}
      </FileUploadLabel>
      <UploadedFileName $color={textColor}>
        {cutFileName(value ?? '')}
      </UploadedFileName>
      <StyledInput
        id={'avatar-file'}
        type={'file'}
        onChange={onChange}
        name={'avatar'}
      />
    </FileInputContainer>
  );
}

export default FileInput;
