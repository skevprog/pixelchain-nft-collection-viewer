import { useEffect, useState } from 'react';
import axios from 'axios';
import { AxiosConfig, FetchParamsType, ReturnedData } from './ts/useFetchTypes';
import { getErrorMessage } from '../utils/helpers';

const useFetch = <FetchedData, paramsData>(
  url: string,
  axiosConfig: AxiosConfig,
  fetchParams: FetchParamsType<paramsData> = {},
): ReturnedData<FetchedData> => {
  const [data, setData] = useState<FetchedData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return;
      try {
        setLoading(true);
        const resp = await axios({
          ...axiosConfig,
          params: { ...fetchParams },
        });
        setData(resp.data);
      } catch (e: unknown) {
        setError(getErrorMessage(e));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, axiosConfig, fetchParams]);

  return { data, loading, error };
};

export default useFetch;
