import { styled } from 'styled-components';
import { ChangeEvent, useCallback } from 'react';

type FileInputProps = {
  uploadText: string;
  uploadedText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const StyledInput = styled.input`
  &[type='file'] {
    display: none;
  }
`;

const FileUploadLabel = styled.label<{ $isUploaded: boolean }>`
  width: fit-content;
  border: 1px solid ${(props) => props.theme.color};
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  color: ${(props) => props.theme.color};
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 300;
  ${(props) =>
    props.$isUploaded &&
    `
    background-color: ${props.theme.buttonBgColor};
    color: ${props.theme.buttonColor};
  `}
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #4f4f4f;
    color: #fff;
  }
`;

const UploadedFileName = styled.span`
  color: ${(props) => props.theme.color};
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
}: FileInputProps) {
  const cutFileName = useCallback((fileName: string) => {
    const cutFromIndex = fileName.lastIndexOf('\\') + 1;
    return fileName.slice(cutFromIndex);
  }, []);

  return (
    <FileInputContainer>
      <FileUploadLabel htmlFor="avatar-file" $isUploaded={!!value}>
        {value ? uploadedText : uploadText}
      </FileUploadLabel>
      <UploadedFileName>{cutFileName(value ?? '')}</UploadedFileName>
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
