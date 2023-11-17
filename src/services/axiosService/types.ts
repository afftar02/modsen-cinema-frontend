export type Headers = {
  Authorization?: string;
  'Content-Type'?: string;
};

export type RequestParams = {
  headers?: Headers;
  method?: string;
  url: string;
  data?: unknown;
  params?: unknown;
};
