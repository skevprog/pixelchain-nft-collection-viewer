export type FetchParamsType<T> = {
   [x in keyof T]?: string;
}

type HttpMethodType = 'get' | 'post' | 'put';

export interface ReturnedData<T> {
   data?: T,
   loading: boolean,
   error?: string,
}

export interface AxiosConfig {
  url: string;
  method: HttpMethodType;
  headers: {
    Authorization: string;
  },
}
