import * as process from 'process';

export const EMAIL_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID ?? '';

export const EMAIL_TEMPLATE_ID =
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID ?? '';

export const EMAIL_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY ?? '';
