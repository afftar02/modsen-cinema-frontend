import * as Formik from 'formik';

interface Values {
  email: string;
  password: string;
}

export const validateLogin = (values: Values) => {
  const errors: Formik.FormikErrors<Values> = {};

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
    values.email = '';
  }

  if (!values.password) {
    errors.password = 'Password required';
  } else if (values.password.length < 4) {
    errors.password = 'Password must be 4 characters or more';
    values.password = '';
  }

  return errors;
};
