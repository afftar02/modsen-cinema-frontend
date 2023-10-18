import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASE_URL } from 'constants/BaseApiUrl';

type Headers = {
  Authorization?: string;
  'Content-Type'?: string;
};

type RequestParams = {
  headers?: Headers;
  method?: string;
  url: string;
  data?: unknown;
  params?: unknown;
};

const axiosInstance = axios.create();

const getSessionFromStorage = () =>
  JSON.parse(localStorage.getItem('tokens') as string);

// фабрика создания запросов
export const request = async <ResData>({
  headers = {},
  method = 'GET',
  url,
  data,
  params,
}: RequestParams): Promise<AxiosResponse<ResData, unknown>> => {
  // получили токен
  const { accessToken, refreshToken } = getSessionFromStorage() || {};

  // если есть токен то добавили его в header
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  // формируем параметры запроса
  const options = {
    headers,
    method,
    data,
    params,
    url: BASE_URL + url,
  };

  try {
    // выполняем запрос
    return axiosInstance(options);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401 && refreshToken) {
      options.headers.Authorization = `Bearer ${refreshToken}`;
      options.method = 'POST';
      options.url = BASE_URL + '/auth/refresh';

      const refreshResponse = await axiosInstance(options);
      localStorage.setItem(
        'tokens',
        JSON.stringify({
          accessToken: refreshResponse.data.accessToken,
          refreshToken: refreshToken,
        })
      );

      return request({
        headers,
        method,
        url,
        data,
        params,
      });
    }

    throw axiosError;
  }
};
