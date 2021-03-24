import { useEffect, useRef, useState } from "react";

export const useFetch = (url) => {
  const isMounted = useRef(true);
  const [state, setstate] = useState({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (url) {
      setstate({
        loading: true,
        data: null,
        error: null,
      });
      fetch(url)
        .then((resp) => resp.json())
        .then((respuesta) => {
          if (isMounted.current) {
            setstate({
              loading: false,
              data: respuesta,
              error: null,
            });
          }
        })
        .catch(() => {
          setstate({
            loading: false,
            data: null,
            error: "error",
          });
        });
    } else {
      setstate({
        loading: false,
        data: null,
        error: null,
      });
    }
  }, [url]);

  return state;
};
