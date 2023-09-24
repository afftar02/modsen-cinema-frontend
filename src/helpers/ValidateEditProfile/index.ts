import * as Formik from 'formik';

interface Values {
  name: string;
  surname: string;
  gender: string;
  password: string;
}

export const validateEditProfile = (values: Values) => {
  const errors: Formik.FormikErrors<Values> = {};

  if (
    values.gender &&
    values.gender.toLowerCase() !== 'female' &&
    values.gender.toLowerCase() !== 'male'
  ) {
    errors.gender = 'Invalid gender type';
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
