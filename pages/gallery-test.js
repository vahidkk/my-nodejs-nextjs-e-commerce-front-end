import Image from "next/image";
import { getPictures } from "./api/pictures";

export default function Gallery({ pictures }) {
  return (
    <div className="">
      {" "}
      <div className="">
        {" "}
        <h1 className="">
          {" "}
          incremental image loading with Cloudinary test{" "}
        </h1>{" "}
      </div>
      <div className="">
        {pictures.map((picture, idx) => (
          <Image
            key={idx}
            src={picture.large}
            placeholder="blur"
            blurDataURL={`data:image/jpeg;base64,${picture.small}`}
            width={800}
            height={600}
            alt="Ruble picture of our Galaxy"
          />
        ))}{" "}
      </div>{" "}
    </div>
  );
}
export async function getStaticProps() {
  const pictures = await getPictures("large-images");
  return { props: { pictures } };
}
