import { useCallback } from 'react';

import {
  FileInputContainer,
  FileUploadLabel,
  StyledInput,
  UploadedFileName,
} from './styled';
import { FileInputProps } from './types';

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
