import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';

import useFetch from '../../hooks/useFetch';

import { AxiosConfig } from '../../hooks/ts/useFetchTypes';
import { Nft, FetchParams, FetchData } from './types';
import { API_URL, TOKEN } from '../../api/services';

import Card from '../../components/Card';

import './styles.css';

const axiosConfig: AxiosConfig = {
  url: API_URL,
  method: 'get',
  headers: {
    Authorization: `token ${TOKEN}`,
  },
};

function Home() {
  const [fetchParams, setFetchParams] = useState<FetchParams>({});
  const [nfts, setNfts] = useState<Nft[]>([]);
  const { data, loading, error } = useFetch<FetchData, FetchParams>(API_URL, axiosConfig, fetchParams);

  useEffect(() => {
    if (!data) return;
    setNfts((prevData: Nft[]): Nft[] => [...prevData, ...data.assets]);
  }, [data, data?.assets]);

  const loadMore = useCallback(() => {
    setFetchParams({ cursor: data?.next });
  }, [data?.next]);

  const observer: any = useRef();
  const lastElement = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      }, { threshold: 1 });
      if (node) observer.current.observe(node);
    },
    [loading, loadMore],
  );

  if (error) return <h2>{error}</h2>;
  if (loading && !nfts.length) return <h1>Loading first...</h1>;

  return (
    <div>
      <div className="images-grid">
        {nfts.length
          ? nfts.map((asset: Nft, index: number) => {
            const isLastElement = nfts.length === index + 1;
            return isLastElement ? <Card className="grid-image" ref={lastElement} name={asset.name} key={asset.id} imgSource={asset.image_url} />
              : <Card name={asset.name} key={asset.id} imgSource={asset.image_url} />;
          })
          : <h2>No data to display</h2>}
        {loading && <h1>Loading...</h1>}
      </div>
    </div>
  );
}

export default Home;
