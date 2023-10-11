import Icon from 'components/Icon';
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

type AuthFormProps = {
  onClose: () => void;
};

const Modal = styled.div`
  position: relative;
  width: 840px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  background-color: #1e1f27;
  padding: 40px 107px;
`;

const CloseIcon = styled(Icon)`
  position: absolute;
  top: 40px;
  right: 50px;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

const TextBlock = styled.div`
  width: 430px;
  height: 123px;

  color: #fff;
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
  const formik = useFormik({
    initialValues: {
      avatar: '',
      name: '',
      surname: '',
      gender: '',
      password: '',
    },
    validate: validateEditProfile,
    validateOnChange: false,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      onClose();
    },
  });

  return (
    <ModalPortal>
      <Modal>
        <CloseIcon
          id="close"
          width={50}
          height={50}
          viewBox="0 0 50 50"
          onClick={onClose}
        />
        <ErrorBoundary fallback={<ErrorFallback />}>
          <TextBlock>
            <span>Please, enter new profile information:</span>
          </TextBlock>
          <StyledForm onSubmit={formik.handleSubmit}>
            <FileInput
              value={formik.values.avatar}
              onChange={formik.handleChange}
            />
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
