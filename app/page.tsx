import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { PHOTOS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export default async function Home() {
  const photos = await client.fetch(PHOTOS_QUERY);
  console.log(photos.length);
  const smallThumbnails = Array.from(
    { length: 100 - photos.length },
    (_, index) => <SmallThumbnail key={index} opacityValue={index + 1} />
  );

  const thumbnails = Array.from({ length: 100 - photos.length }, (_, index) => (
    <Thumbnail key={index} opacityValue={index + 1} />
  ));

  return (
    <main>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center sm:text-5xl">
          Photos I need to take until I can upgrade my gear
        </h1>
        <section className="py-10">
          <div className="flex">
            {photos.map((photo) => (
              <div key={photo._id} className="flex">
                {photo.mainImage ? (
                  <Image
                    src={urlFor(photo.mainImage)
                      .width(80)
                      .height(80)
                      .quality(100)
                      .auto("format")
                      .url()}
                    alt={photo?.mainImage?.alt || ""}
                    width="40"
                    height="40"
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                ) : null}
              </div>
            ))}
            {smallThumbnails}
          </div>
        </section>
        <section className="py-10">
          <div className="flex flex-wrap">
            {thumbnails}
            {photos.map((photo) => (
              <div key={photo._id} className="w-40 h-40">
                {photo.mainImage ? (
                  <Image
                    src={urlFor(photo.mainImage)
                      .width(280)
                      .height(280)
                      .quality(100)
                      .auto("format")
                      .url()}
                    alt={photo?.mainImage?.alt || ""}
                    width="160"
                    height="160"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SmallThumbnail({ opacityValue }) {
  const style = { opacity: opacityValue / 100 };
  return <div className="h-10 w-10 bg-white" style={style}></div>;
}

function Thumbnail({ opacityValue }) {
  const style = { opacity: opacityValue / 100 };
  return <div className="h-40 w-40 bg-white" style={style}></div>;
}
