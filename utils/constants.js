import { Repeat, HelpCircle, Shield } from "react-feather";
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

export const links = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "about",
    url: "/about",
  },
  {
    id: 3,
    text: "products",
    url: "/products",
  },
];

export const services = [
  {
    id: 1,
    icon: <Shield />,
    title: "Security",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 2,
    icon: <HelpCircle />,
    title: "Support",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 3,
    icon: <Repeat />,
    title: "Refund",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
];
