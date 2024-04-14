function Banner(props: any) {
  return (
    <section className="w-[100%] mt-20">
      <div
        style={{ backgroundImage: `url(${props.image})` }}
        className="h-[40vh] bg-cover text-white flex flex-col items-center justify-center"
      >
        <h1 className="text-3xl max-md:text-2xl font-bold leading-10">
          {props.tag}
        </h1>
        <p className="text-sm">{props.line}</p>
      </div>
    </section>
  );
}

export default Banner;
