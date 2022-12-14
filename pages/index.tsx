import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";

import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-component";
import { BlurhashCanvas } from "react-blurhash";

import ImageCard from "components/ImageCard";
import Topics from "components/Topics";

// types
import type { InferGetStaticPropsType } from "next";
import type { IAPIResponse } from "types/ApiResponse";

type HomeProps = InferGetStaticPropsType<typeof getStaticProps> & {};

const SearchSVG = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const Home = ({ images, imgOfTheDay }: HomeProps) => {
  const catagoriesWrapper = useRef(null);
  const [page, setPage] = useState(3);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const defaultHometags = [
    { id: "001", title: "room" },
    { id: "002", title: "home" },
    { id: "003", title: "bedroom" },
    { id: "004", title: "kitchen" },
    { id: "005", title: "interiors" },
    { id: "006", title: "bathroom" },
    { id: "007", title: "kidsroom" },
    { id: "008", title: "living" },
    { id: "009", title: "balcony" },
    { id: "010", title: "dining" },
    { id: "011", title: "yard" },
    { id: "012", title: "roof" },
    { id: "013", title: "furniture" },
    { id: "014", title: "exterior" },
    { id: "015", title: "closet" },
  ];

  const handleFormsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchValue.length > 0) {
      router.push(`/search/${searchValue.split(" ").join("-")}`);
    }
  };

  const nextFunction = () => {
    fetch(
      `https://api.unsplash.com/photos/random?client_id=${process.env.NEXT_PUBLIC_API_KEY}&count=30&query=interior`
    )
      .then((data) => data.json())
      .then((imgData: IAPIResponse[]) => {
        images?.push(...imgData);
        setPage(page + 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div ref={catagoriesWrapper} className="home">
      {images ? (
        <>
          <div className="random-img">
            {imgOfTheDay && (
              <>
                {imgOfTheDay.blur_hash ? (
                  <BlurhashCanvas
                    hash={imgOfTheDay.blur_hash}
                    punch={1}
                    height={32}
                    width={32}
                  />
                ) : null}
                {imgOfTheDay.urls && (
                  <Image
                    src={`${imgOfTheDay.urls.raw}&w=1500&fm=webp&q=75`}
                    alt={imgOfTheDay.alt_description || "Image Of The Day"}
                    unoptimized={true}
                    layout="fill"
                    objectFit="cover"
                  />
                )}

                {/* form */}
                <div className="form-wrapper">
                  <h1>Kosugelion</h1>

                  <p>
                    A photo search app powered by{" "}
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href="https://unsplash.com/?utm_source=photon&utm_medium=referral"
                    >
                      Unsplash API
                    </a>
                  </p>

                  <form onSubmit={handleFormsubmit} className="form">
                    <input
                      type="search"
                      name="search"
                      id="search"
                      placeholder="Search anything..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />

                    <button type="submit">
                      <SearchSVG />
                    </button>
                  </form>
                </div>
                {/* form ends */}

                {/* credits */}
                <p className="credits">
                  Photo by{" "}
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href={
                      imgOfTheDay.user &&
                      `${imgOfTheDay.user.links.html}?utm_source=photon&utm_medium=referral`
                    }
                  >
                    {imgOfTheDay.user &&
                      `${imgOfTheDay.user.first_name} ${imgOfTheDay.user.last_name}`}
                  </a>{" "}
                  on{" "}
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href="https://unsplash.com/?utm_source=photon&utm_medium=referral"
                  >
                    Unsplash
                  </a>
                </p>
              </>
            )}
          </div>

          <Topics items={defaultHometags} wrapper={catagoriesWrapper} />

          <div className="infinite-scroll-wrapper">
            <InfiniteScroll
              dataLength={images.length}
              next={nextFunction}
              scrollThreshold={0.7}
              hasMore={true}
              loader={
                <h1 className="loading-msg">
                  <Image
                    src="/loading.gif"
                    loading="eager"
                    width={32}
                    height={32}
                    alt="1"
                  />
                  <span> Loading </span>
                </h1>
              }
              className="infinite-scroll"
              endMessage={
                <h1 className="end-msg">We dont have more images to show</h1>
              }
            >
              <Masonry
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}
                className="masonry"
              >
                {images?.map((image) => (
                  <ImageCard key={image.id} data={image} />
                ))}
              </Masonry>
            </InfiniteScroll>
          </div>
        </>
      ) : (
        <>
          <div className="error">
            <h1> API LIMIT EXCEED </h1>
            <h1>SORRY UNSPLASH HAS SOME API LIMITATIONS</h1>
            <h1> TRY AGAIN AFTER AN HOUR </h1>
            <h1> API ACCESS LIMIT IS 50 REQ PER HOUR </h1>
          </div>
        </>
      )}
    </div>
  );
};

// static stuff
export const getStaticProps = async () => {
  // images fn and var declaration starts
  const images: IAPIResponse[] = [];

  await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/photos/random?client_id=${process.env.NEXT_PUBLIC_API_KEY}&count=30&query=interior`
  )
    .then((data) => data.json())
    .then((imgData: IAPIResponse[]) => {
      images.push(...imgData);
    })
    .catch((err) => console.log(err));
  // images fn and var declaration ends

  // random images fn and var declaration starts
  let imgOfTheDay: IAPIResponse | null = null;

  //TOP????????????
  const backgroundImage: String = "interior";
  await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/photos/random/?client_id=${process.env.NEXT_PUBLIC_API_KEY}&query=${backgroundImage}`
  )
    .then((data) => data.json())
    .then((imgData: IAPIResponse) => {
      imgOfTheDay = imgData;
    })
    .catch((err) => console.log(err));
  // random images fn and var declaration ends

  if (images.length === 0)
    return { props: { images: null, topics: null, imgOfTheDay: null } };

  return {
    props: { images, imgOfTheDay: imgOfTheDay as IAPIResponse | null },
    revalidate: 10 * 60,
  }; // revalidate in seconds
};

export default Home;
