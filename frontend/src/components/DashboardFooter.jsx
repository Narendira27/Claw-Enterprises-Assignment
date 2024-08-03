import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import url from "../url";

const DashboardFooter = () => {
  const [data, setData] = useState({ Total: 0, Completed: 0, Remaining: 0 });
  const fetchData = () => {
    const token = Cookies.get("auth");
    axios
      .get(url + "/todos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data.data;
        const totalTodo = data.length;
        let countCompleted = 0;
        data.map((each) =>
          each.IsDone ? (countCompleted = countCompleted + 1) : null
        );

        setData((prev) => ({
          ...prev,
          Total: totalTodo,
          Completed: countCompleted,
          Remaining: totalTodo - countCompleted,
        }));
      });
  };
  useEffect(() => {
    fetchData();
    const id = setInterval(() => {
      fetchData();
    }, 5000);
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <div className="py-5 px-6 fixed z-50 border-t bottom-0 bg-white dark:text-white dark:bg-[#1e1e1e] w-full">
      <div className="flex justify-center ">
        <div className="max-w-screen-2xl w-full flex justify-between items-center">
          <p>Total Tasks: {data.Total}</p>
          <p>Completed: {data.Completed}</p>
          <p>Remaining: {data.Remaining}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardFooter;
