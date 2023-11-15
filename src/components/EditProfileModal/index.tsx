import { styled, useTheme } from 'styled-components';
import { useFormik } from 'formik';
import { validateEditProfile } from 'helpers/ValidateEditProfile';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import ModalPortal from 'components/ModalPortal';
import { motion } from 'framer-motion';
import CloseIcon from 'components/CloseIcon';
import { ChangeEvent, useCallback, useState } from 'react';
import { uploadAvatar } from 'services/avatarService';
import { AuthContextType, useAuth } from 'auth/Auth';
import { updateUser } from 'services/userService';
import { UserType } from 'types/User';
import { useTranslation } from 'react-i18next';
import { Button, FileInput, Input, PasswordInput } from 'modsen-library';
import OutsideHandler from 'components/OutsideHandler';

type EditProfileFormProps = {
  onClose: () => void;
};

const Modal = styled(motion.div)`
  position: relative;
  width: 840px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bgColor};
  padding: 40px 107px;

  @media (max-width: 840px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    padding: 20px 25px;
  }
`;

const TextBlock = styled.div`
  display: flex;
  align-items: center;
  min-height: 100px;
  max-width: 430px;

  color: ${(props) => props.theme.color};
  text-shadow: 10px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: 'Inria Sans', sans-serif;
  font-size: 32px;
  font-style: italic;
  font-weight: 300;
  line-height: normal;

  @media (max-width: 500px) {
    max-width: 230px;
  }
`;

const StyledForm = styled.form`
  margin-top: 20px;
  margin-bottom: 58px;
  display: flex;
  flex-direction: column;
  gap: 50px;

  @media (max-width: 500px) {
    gap: 35px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
`;

function EditProfileModal({ onClose }: EditProfileFormProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [avatar, setAvatar] = useState<File>();

  const { loadUser } = useAuth() as AuthContextType;

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
      await handleProfileEdit();
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

  const handleProfileEdit = useCallback(async () => {
    try {
      if (avatar) {
        await uploadAvatar(avatar);
      }
      const editedData: Partial<UserType> = {};
      if (formik.values.name) {
        editedData.name = formik.values.name;
      }
      if (formik.values.surname) {
        editedData.surname = formik.values.surname;
      }
      if (formik.values.gender) {
        editedData.gender = formik.values.gender;
      }
      if (formik.values.password) {
        editedData.password = formik.values.password;
      }
      if (JSON.stringify(editedData) !== JSON.stringify({})) {
        await updateUser(editedData);
      }
      await loadUser();
    } catch (err) {
      alert(t('loading_error'));
      await loadUser();
    }
  }, [t, avatar, formik, loadUser]);

  return (
    <ModalPortal isFixed>
      <OutsideHandler onClick={onClose}>
        <Modal
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
              <Input
                placeholder={
                  formik.errors.gender ?? t('edit_gender_placeholder')
                }
                onChange={formik.handleChange}
                value={formik.values.gender}
                onClick={() => formik.setFieldError('gender', undefined)}
                name={'gender'}
                isError={!!formik.errors.gender}
                color={theme.color}
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
      </OutsideHandler>
    </ModalPortal>
  );
}

export default EditProfileModal;
