import React, { useState } from 'react';
import useFetch from './hooks/useFetch';

import './App.css';
import { AxiosConfig } from './hooks/ts/useFetchTypes';
import { API_URL, TOKEN } from './api';
import Card from './components/Card';
import Loader from './components/Loader';

interface FetchParams {
  cursor?: string,
}
interface Nft {
  id: number,
  name: string,
  image_url: string,
}
interface FetchData {
  assets: Nft[],
  next?: string,
  previous?: string,
}

const axiosConfig: AxiosConfig = {
  url: API_URL,
  method: 'get',
  headers: {
    Authorization: `token ${TOKEN}`,
  },
};

function App() {
  const [fetchParams, setFetchParams] = useState<FetchParams>({});
  const { data, loading, error } = useFetch<FetchData, FetchParams>(API_URL, axiosConfig, fetchParams);

  const nextPage = () => {
    setFetchParams({ cursor: data?.next });
  };

  if (error) return <h2>{error}</h2>;
  if (loading) return <Loader />;

  return (
    <div className="App">
      <div className="cards-container">
        {data?.assets?.length
          ? data.assets.map((asset: Nft) => <Card name={asset.name} key={asset.id} imgSource={asset.image_url} />)
          : <h2>No data to display</h2>}
      </div>
      <button type="button" onClick={nextPage}>Load more</button>
    </div>
  );
}

export default App;
