import useSWR from "swr";

export function useAllProducts() {
  // const { data, error } = useSWR(`/api/user/${id}`)
  const { data, error } = useSWR(`/api/products`);
  const isFeatured = data
    ? data.products.map((i) => {
        if (!i.featured) return i;
      })
    : [];
  console.log(isFeatured);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    isFeatured,
  };
}

export function useSingleProduct(id) {
  const { data, error } = useSWR(`/api/products/${id}`);

  console.log(data);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
