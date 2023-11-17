import { ChangeEvent, memo, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'auth/Auth';
import { AuthContextType } from 'auth/types';
import { useFormik } from 'formik';
import { editProfile } from 'helpers/EditProfile';
import { validateEditProfile } from 'helpers/ValidateEditProfile';
import { useClickOutside } from 'hooks/useClickOutside';
import { FileInput, Input, PasswordInput } from 'modsen-library';
import { useTheme } from 'styled-components';

import CloseIcon from 'components/CloseIcon';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import GenderSelect from 'components/GenderSelect';
import ModalPortal from 'components/ModalPortal';

import { Modal, StyledForm, SubmitButton, TextBlock } from './styled';
import { EditProfileFormProps } from './types';

function EditProfileModal({ onClose }: EditProfileFormProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [avatar, setAvatar] = useState<File>();
  const modalRef = useRef(null);

  const { loadUser } = useAuth() as AuthContextType;

  useClickOutside(modalRef, onClose);

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      gender: '',
      password: '',
    },
    validate: (values) => validateEditProfile(values, t),
    validateOnChange: false,
    onSubmit: async () => {
      await editProfile(formik.values, loadUser, t, avatar);
      onClose();
    },
  });

  const handleFileUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0];
        setAvatar(file);
      }
    },
    []
  );

  return (
    <ModalPortal isFixed>
      <Modal
        ref={modalRef}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{
          duration: 0.3,
        }}
      >
        <CloseIcon onClick={onClose} />
        <ErrorBoundary fallback={<ErrorFallback />}>
          <TextBlock>
            <span>{t('edit_profile_title')}</span>
          </TextBlock>
          <StyledForm onSubmit={formik.handleSubmit}>
            <FileInput
              value={avatar?.name}
              onChange={handleFileUpload}
              uploadText={t('upload_avatar_text')}
              uploadedText={t('uploaded_file_text')}
              textColor={theme.color}
              borderColor={theme.color}
              uploadedButtonBgColor={theme.buttonBgColor}
              uploadedButtonColor={theme.buttonColor}
            />
            <Input
              placeholder={formik.errors.name ?? t('edit_name_placeholder')}
              onChange={formik.handleChange}
              value={formik.values.name}
              onClick={() => formik.setFieldError('name', undefined)}
              name={'name'}
              isError={!!formik.errors.name}
              color={theme.color}
            />
            <Input
              placeholder={
                formik.errors.surname ?? t('edit_surname_placeholder')
              }
              onChange={formik.handleChange}
              value={formik.values.surname}
              onClick={() => formik.setFieldError('surname', undefined)}
              name={'surname'}
              isError={!!formik.errors.surname}
              color={theme.color}
            />
            <GenderSelect
              onChange={formik.handleChange}
              value={formik.values.gender}
            />
            <PasswordInput
              withIcon={false}
              placeholder={
                formik.errors.password ?? t('edit_password_placeholder')
              }
              onChange={formik.handleChange}
              value={formik.values.password}
              onClick={() => formik.setFieldError('password', undefined)}
              isError={!!formik.errors.password}
              color={theme.color}
            />
            <SubmitButton type={'submit'}>{t('save_text')}</SubmitButton>
          </StyledForm>
        </ErrorBoundary>
      </Modal>
    </ModalPortal>
  );
}

export default memo(EditProfileModal);
