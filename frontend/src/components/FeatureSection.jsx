const calenderSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mb-4 h-8 w-8 text-[#4CAF50] dark:text-[#8BC34A]"
    >
      <path d="M8 2v4"></path>
      <path d="M16 2v4"></path>
      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
      <path d="M3 10h18"></path>
    </svg>
  );
};

const trackSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mb-4 h-8 w-8 text-[#4CAF50] dark:text-[#8BC34A]"
    >
      <path d="M20 6 9 17l-5-5"></path>
    </svg>
  );
};

const barRiseSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mb-4 h-8 w-8 text-[#4CAF50] dark:text-[#8BC34A]"
    >
      <path d="M2 20h.01"></path>
      <path d="M7 20v-4"></path>
      <path d="M12 20v-8"></path>
      <path d="M17 20V8"></path>
      <path d="M22 4v16"></path>
    </svg>
  );
};

const featuresDetails = [
  {
    id: 1,
    svg: calenderSvg(),
    title: "Organize Your Tasks",
    description:
      "Stay on top of your to-do list with our intuitive task management features.",
  },
  {
    id: 2,
    svg: trackSvg(),
    title: "Track Progress",
    description: "Mark tasks as complete and see your progress at a glance.",
  },
  {
    id: 3,
    svg: barRiseSvg(),
    title: "Stay Motivated",
    description: "Receive reminders and notifications to keep you on track.",
  },
];

const FeatureSection = () => {
  return (
    <section className="flex justify-center py-4  md:py-6 lg:py-10">
      <div className=" w-full xl:max-w-screen-2xl grid grid-cols-3 gap-4 xl:px-4 px-6">
        {featuresDetails.map((each) => (
          <div
            className=" col-span-3 lg:col-span-1 my-5 p-5 flex flex-col justify-center rounded-2xl bg-white shadow-xl dark:bg-[#1e1e1e]"
            key={each.id}
          >
            <div>{each.svg}</div>
            <h1 className="font-bold my-2 text-black dark:text-white text text-lg md:text-xl lg:text-2xl">
              {each.title}
            </h1>
            <p className="text-slate-500 dark:text-white/70 text text-md md:text-lg lg:text-xl">
              {each.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
