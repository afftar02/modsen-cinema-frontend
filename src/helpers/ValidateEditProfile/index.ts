import * as Formik from 'formik';

interface Values {
  name: string;
  surname: string;
  gender: string;
  password: string;
}

export const validateEditProfile = (values: Values) => {
  const errors: Formik.FormikErrors<Values> = {};

  if (values.gender && values.gender !== 'FEMALE' && values.gender !== 'MALE') {
    errors.gender = 'Invalid gender type, please type MALE or FEMALE';
    values.gender = '';
  }

  if (values.password && values.password.length < 4) {
    errors.password = 'Password must be 4 characters or more';
    values.password = '';
  } else if (values.password && values.password.length > 16) {
    errors.password = 'Password must be 16 characters or less';
    values.password = '';
  }

  return errors;
};
