import { useEffect, useState } from "react";

/**
 * React hook to fetch data from a given URL
 * @param url - The URL to fetch data from
 * @returns {isLoading: boolean, error: string, data: T | null} - An object containing loading state, error message, and fetched data
 * @example
 * const { isLoading, error, data } = useFetch<MyType>({ url: 'https://api.example.com/data' });
 */
const useFetch = <T>({
  url,
}: {
  url: string;
}): { isLoading: boolean; error: string; data: T | null } => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          signal,
        });
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data: T = await response.json();
        setData(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setError(error.message);
          console.error("Fetch error: ", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  return { isLoading, error, data };
};

export default useFetch;
