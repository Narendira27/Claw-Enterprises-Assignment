const HeroSection = ({ setPopup }) => {
  return (
    <section className="bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] w-full flex justify-center py-20 px-6 ">
      <div className="md:max-w-lg lg:max-w-2xl xl:max-w-4xl flex justify-center items-center">
        <div className="flex flex-col justify-center items-center  ">
          <h1 className="text-white  text-center text-4xl md:text-5xl lg:text-6xl tracking-tighter font-bold">
            Stay on top of your tasks with Todo
          </h1>
          <p className="text-lg lg:text-2xl  md:text-xl mx-4 my-4 md:my-6 lg:my-8 xl:my-10 text-white/70 dark:text-[#1e1e1e]/70 text-center">
            A simple and intuitive todo app to help you organize your life and
            boost your productivity.
          </p>
          <div className="flex w-full flex-col  md:flex-row  md:justify-center  ">
            <button
              onClick={() => {
                setPopup((prev) => ({ ...prev, open: true, page: "Login" }));
              }}
              className="bg-white font-medium  md:text-lg rounded-md md:mr-8 md:w-fit md:p-2 lg:px-4 xl:px-6 py-2 my-2 w-full text-center dark:bg-[#1e1e1e] transition-colors dark:text-[#8BC34A] dark:hover:bg-[#1e1e1e]/90 hover:bg-white/80 text-[#4CAF50]"
            >
              Get Started
            </button>
            <button className="text-white py-2 w-full  md:text-lg md:w-fit md:p-2 lg:px-4 xl:px-6 text rounded-md my-2 border border-solid border-white text-center dark:border-[#1e1e1e] dark:text-[#1e1e1e] dark:hover:bg-[#1e1e1e] dark:hover:text-[#8BC34A] transition-colors hover:text-[#4CAF50] hover:bg-white ">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
