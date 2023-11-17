import * as Formik from 'formik';
import { TFunction } from 'i18next';

interface Values {
  name: string;
  surname: string;
  gender: string;
  password: string;
}

export const validateEditProfile = (values: Values, t: TFunction) => {
  const errors: Formik.FormikErrors<Values> = {};

  if (
    values.password &&
    (values.password.length < 4 || values.password.length > 16)
  ) {
    errors.password = t('invalid_password_error');
    values.password = '';
  }

  return errors;
};
