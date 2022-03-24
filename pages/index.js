import Head from "next/head";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Services from "../components/Services";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main>
      <Head>
        <title>Lets Go Shopping !</title>
      </Head>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
}
