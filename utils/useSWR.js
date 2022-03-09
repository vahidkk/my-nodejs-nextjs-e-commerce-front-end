import useSWR from "swr";

export function useAllProducts() {
  // const { data, error } = useSWR(`/api/user/${id}`)
  const { data, error } = useSWR(`/api/products`);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
