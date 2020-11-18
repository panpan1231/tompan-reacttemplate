import React, { useState, useEffect } from "react";

const useGetApiData = (apiFunc, param) => {
  const [data, setData] = useState({ data: [] });
  const [params, setParams] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = () => {
      setIsLoading(true);
      apiFunc(
        !!params
          ? {
              ...params,
            }
          : { ...param }
      )
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getData();
  }, [params]);
  return [{ data, isLoading }, setParams];
};

export default useGetApiData;
