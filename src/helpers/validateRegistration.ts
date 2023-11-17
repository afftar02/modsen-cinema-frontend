import * as Formik from 'formik';
import { validateLogin } from 'helpers/validateLogin';
import { TFunction } from 'i18next';

interface Values {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export const validateRegistration = (values: Values, t: TFunction) => {
  const errors: Formik.FormikErrors<Values> = {};

  if (!values.name) {
    errors.name = t('name_required_error');
  }

  if (!values.surname) {
    errors.surname = t('surname_required_error');
  }

  const loginErrors = validateLogin(values, t);

  return { ...errors, ...loginErrors };
};
