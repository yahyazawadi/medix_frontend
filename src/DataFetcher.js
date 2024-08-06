import React from 'react';
import { useGetDataQuery } from './app/api/apiSlice';

const DataFetcher = () => {
  const { data, error, isLoading } = useGetDataQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataFetcher;
