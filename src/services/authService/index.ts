import { request } from 'services/axiosService';

type RegisterUserParams = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

type LoginUserParams = {
  email: string;
  password: string;
};

type TokensData = {
  access_token: string;
  refresh_token: string;
};

export const registerUser = async (values: RegisterUserParams) => {
  const { data } = await request<TokensData>({
    method: 'POST',
    url: '/auth/register',
    data: values,
  });
  localStorage.setItem(
    'tokens',
    JSON.stringify({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    })
  );
};

export const loginUser = async (values: LoginUserParams) => {
  const { data } = await request<TokensData>({
    method: 'POST',
    url: '/auth/login',
    data: values,
  });
  localStorage.setItem(
    'tokens',
    JSON.stringify({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    })
  );
};
