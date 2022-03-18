import useSWR from "swr";

export function useAllProducts() {
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

export function useCurrentUser(id) {
  const { data, error, mutate } = useSWR(`/api/users/showMe`, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });
  return {
    loggedInUser: data ? (data.user ? data.user.name : undefined) : data,
    // role: data ? data.user.role : data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
