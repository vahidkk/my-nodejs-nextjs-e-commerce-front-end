import useSWR from "swr";

export function useAllProducts() {
  const { data, error } = useSWR(`/api/products`);
  const isFeatured = data
    ? data.products.map((i) => {
        if (!i.featured) return i;
      })
    : [];
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    isFeatured,
  };
}

export function useSingleProduct(id) {
  const { data, error } = useSWR(`/api/products/${id}`);

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
    loggedInUserID: data ? (data.user ? data.user._id : undefined) : data,
    // role: data ? data.user.role : data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useOrdersHistory() {
  const { data, error, mutate } = useSWR(`/api/orders/showAllMyOrders`);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
export function useOrderDetail(id) {
  const { data, error, mutate } = useSWR(`/api/orders/${id}`);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
