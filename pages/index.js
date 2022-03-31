import Head from "next/head";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Services from "../components/Services";
import Contact from "../components/Contact";
import { getPictures } from "./api/pictures";

export default function Home({ manipulateDataWithNewImages }) {
  const featuredProducts = manipulateDataWithNewImages.filter(
    (prod) => prod.featured === true
  );

  return (
    <main>
      <Head>
        <title>Lets Go Shopping !</title>
      </Head>
      <Hero />
      <FeaturedProducts data={featuredProducts} />
      <Services />
      <Contact />
    </main>
  );
}

export async function getStaticProps() {
  const res = await fetch(process.env.MY_API_PRODUCTS_ROUTE);
  const data = await res.json();
  const rawImages = data.products.map((i) => {
    return i.image[0];
  });
  const pictures = await getPictures(rawImages);
  const manipulateDataWithNewImages = data.products.map((item, index) => {
    return { ...item, image: [pictures[index]] };
  });
  return { props: { manipulateDataWithNewImages } };
}
