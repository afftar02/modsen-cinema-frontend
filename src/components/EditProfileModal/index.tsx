import { styled } from 'styled-components';
import Input from 'components/Input';
import Button from 'components/Button';
import { useFormik } from 'formik';
import PasswordInput from 'components/PasswordInput';
import { validateEditProfile } from 'helpers/ValidateEditProfile';
import FileInput from 'components/FileInput';
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

type AuthFormProps = {
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
`;

const TextBlock = styled.div`
  width: 430px;
  height: 123px;

  color: ${(props) => props.theme.color};
  text-shadow: 10px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: 'Inria Sans', sans-serif;
  font-size: 32px;
  font-style: italic;
  font-weight: 300;
  line-height: normal;
`;

const StyledForm = styled.form`
  margin-top: 20px;
  margin-bottom: 58px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const SubmitButton = styled(Button)`
  width: 100%;
`;

function EditProfileModal({ onClose }: AuthFormProps) {
  const [avatar, setAvatar] = useState<File>();

  const { loadUser } = useAuth() as AuthContextType;

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      gender: '',
      password: '',
    },
    validate: validateEditProfile,
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
  }, [avatar, formik, loadUser]);

  return (
    <ModalPortal>
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
            <span>Please, enter new profile information:</span>
          </TextBlock>
          <StyledForm onSubmit={formik.handleSubmit}>
            <FileInput value={avatar?.name} onChange={handleFileUpload} />
            <Input
              placeholder={formik.errors.name ?? 'Enter new name'}
              onChange={formik.handleChange}
              value={formik.values.name}
              onClick={() => formik.setFieldError('name', undefined)}
              name={'name'}
              isError={!!formik.errors.name}
            />
            <Input
              placeholder={formik.errors.surname ?? 'Enter new surname'}
              onChange={formik.handleChange}
              value={formik.values.surname}
              onClick={() => formik.setFieldError('surname', undefined)}
              name={'surname'}
              isError={!!formik.errors.surname}
            />
            <Input
              placeholder={formik.errors.gender ?? 'Enter new gender'}
              onChange={formik.handleChange}
              value={formik.values.gender}
              onClick={() => formik.setFieldError('gender', undefined)}
              name={'gender'}
              isError={!!formik.errors.gender}
            />
            <PasswordInput
              withIcon={false}
              placeholder={formik.errors.password ?? 'Enter new password'}
              onChange={formik.handleChange}
              value={formik.values.password}
              onClick={() => formik.setFieldError('password', undefined)}
              isError={!!formik.errors.password}
            />
            <SubmitButton type={'submit'}>Save</SubmitButton>
          </StyledForm>
        </ErrorBoundary>
      </Modal>
    </ModalPortal>
  );
}

export default EditProfileModal;
