type BannerProps = {
  image: string;
  img?: string;
  tag: string;
  line: string;
};

function Banner({ image, img, tag, line }: BannerProps) {
  return (
    <section className="w-[100%] mt-20">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="h-[40vh] p-2 bg-cover text-white flex gap-5 items-center justify-center"
      >
        {img && (
          <>
            <img className="h-full p-2 border-2" src={img} alt="Image" />
          </>
        )}
        <div className="text-center">
          <h1 className="text-3xl max-md:text-2xl font-bold leading-10">
            {tag}
          </h1>
          <p className="text-sm">{line}</p>
        </div>
      </div>
    </section>
  );
}

export default Banner;
