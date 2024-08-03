const FooterSection = ({ setPopup }) => {
  return (
    <section className=" dark:bg-[#1e1e1e] py-6 flex  justify-center items-center ">
      <div className="px-6 flex flex-col justify-center items-center">
        <h1 className="text-center text-3xl md:text-4xl  dark:text-white lg:text-5xl my-2 md:my-4 lg:my-6  font-bold">
          Join the Thousand of Users Who Love Todo
        </h1>
        <p className="text-center my-2 md:my-4  dark:text-white/70 lg:my-6 text-lg md:text-xl  text-slate-600/70 ">
          Sign up today and start organizing your life with our powerful todo
          app.
        </p>
        <button
          onClick={() =>
            setPopup((prev) => ({ ...prev, open: true, page: "Register" }))
          }
          className="bg-[#8BC34A] dark:text-black text-white text-md md:text-lg  my-2 md:my-4 lg:my-6 md:px-6 lg:px-8  p-2 rounded-md mt-2"
        >
          Sign Up Now
        </button>
      </div>
    </section>
  );
};

export default FooterSection;
