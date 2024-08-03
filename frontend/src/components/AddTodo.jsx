import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import url from "../url";
import Cookies from "js-cookie";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const AddTodo = ({ filterSelected, setFilterSelected }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState("");

  const AddTask = async () => {
    const token = Cookies.get("auth");
    if (task.length !== 0) {
      setLoading(true);
      try {
        await axios.post(
          url + "/todos",
          { title: task },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLoading(false);
        setTask("");
      } catch (e) {
        setLoading(false);
        setTask("");
        console.log(e.message);
      }
    }
  };

  const LoadingSpinner = () => {
    return (
      <ThreeDots
        visible={true}
        height="30"
        width="30"
        color="white"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  };

  return (
    <section className="w-full px-6 py-5 flex justify-center">
      <div className="w-full flex xl:max-w-screen-2xl  justify-between">
        <div className="w-full flex flex-col items sm:flex-row sm:justify-between ">
          <div className="w-full flex items-start justify-start  my-4 ">
            <div className="flex items-center w-full ">
              <input
                onChange={(e) => {
                  setTask(e.target.value);
                }}
                placeholder="Add new task"
                className="border px-2 py-2  flex flex-grow xl:max-w-lg lg:max-w-md md:max-w-sm  sm:max-w-xs rounded-md "
              />
              <button
                onClick={() => AddTask()}
                className="ml-2 rounded-md text-sm flex flex-col justify-center items-center bg-[#8BC34A] text-white dark:text-black px-1 py-2 md:px-2 md:py-2 lg:px-4  xl:px-8  "
              >
                {!loading ? "Add Task" : <LoadingSpinner />}
              </button>
            </div>
          </div>
          <div className="w-full flex items-center  justify-end my-4  ">
            <div className="w-full flex flex-col max-w-32 justify-center">
              <div
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className=" cursor-pointer flex items-stretch flex-grow border rounded-md px-2 py-1.5"
              >
                <CiFilter
                  className="fill-black dark:fill-white"
                  fontSize="1.5em"
                />
                <p className="font-semibold text-md ml-1 mr-0.5 dark:text-white">
                  {filterSelected}
                </p>
              </div>
              <div>
                {isFilterOpen ? (
                  <div className=" transition absolute z-50 pt-1">
                    <div className="bg-whiter  transition dark:bg-[#1e1e1e]  rounded-md dark:text-white p-2 border">
                      <div
                        onClick={() => {
                          setFilterSelected("All");
                          setIsFilterOpen(false);
                        }}
                        className={`flex cursor-pointer transition hover:bg-gray-200/80 dark:hover:bg-white/80 dark:hover:text-black px-2 py-0.5 my-1 rounded-md + ${
                          filterSelected === "All"
                            ? "bg-[#8BC34A]/80 text-white dark:text-black"
                            : ""
                        }`}
                      >
                        <p>All</p>
                      </div>
                      <div
                        onClick={() => {
                          setFilterSelected("Completed");
                          setIsFilterOpen(false);
                        }}
                        className={`flex cursor-pointer transition hover:bg-gray-200/80 dark:hover:bg-white/80 dark:hover:text-black px-2 py-0.5 my-1 rounded-md + ${
                          filterSelected === "Completed"
                            ? "bg-[#8BC34A]/80 text-white dark:text-black"
                            : ""
                        }`}
                      >
                        <p>Completed</p>
                      </div>
                      <div
                        onClick={() => {
                          setFilterSelected("InComplete");
                          setIsFilterOpen(false);
                        }}
                        className={`flex cursor-pointer transition hover:bg-gray-200/80 dark:hover:bg-white/80 dark:hover:text-black px-2 py-0.5 my-1 rounded-md + ${
                          filterSelected === "InComplete"
                            ? "bg-[#8BC34A]/80 text-white dark:text-black"
                            : ""
                        }`}
                      >
                        <p>InComplete</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddTodo;
