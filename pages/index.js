import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
// import FeaturedProducts from "../components/FeaturedProducts";
import Services from "../components/Services";
import Contact from "../components/Contact";

export default function Home() {
  // const [data, setData] = useState(null);
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch("/api/auth/login", {
  //     headers: {
  //       // Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //     body: JSON.stringify({
  //       email: "vahid@gmail.com",
  //       password: "123456",
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     });
  // }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No data</p>;

  return (
    <main>
      <Hero />
      {/* <FeaturedProducts /> */}
      <Services />
      <Contact />
    </main>
  );
}
