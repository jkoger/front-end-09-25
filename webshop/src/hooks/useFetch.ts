import { useEffect, useState } from "react";

function useFetch(endPoint: string) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_BASE_URL + endPoint)
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setLoading(false);
      });
  }, []);

  return {
    items,
    loading,
  };
}

export default useFetch;
