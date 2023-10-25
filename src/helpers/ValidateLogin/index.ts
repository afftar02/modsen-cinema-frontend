import * as Formik from 'formik';
import { TFunction } from 'i18next';

interface Values {
  email: string;
  password: string;
}

export const validateLogin = (values: Values, t: TFunction) => {
  const errors: Formik.FormikErrors<Values> = {};

  if (!values.email) {
    errors.email = t('email_required_error');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = t('invalid_email');
    values.email = '';
  }

  if (!values.password) {
    errors.password = t('password_required_error');
  } else if (values.password.length < 4 || values.password.length > 16) {
    errors.password = t('invalid_password_error');
    values.password = '';
  }

  return errors;
};
