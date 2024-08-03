import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { MdDone } from "react-icons/md";
import url from "../url";
import Cookies from "js-cookie";
import axios from "axios";

const TodoItem = ({ id, title, IsDone }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [updatetitle, setUpdateTitle] = useState("");
  useEffect(() => {
    setUpdateTitle(title);
  }, []);
  const DeleteTodo = async (id) => {
    try {
      const token = Cookies.get("auth");
      await axios.delete(url + "/todos/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  const UpdateDone = async (id, title, IsDone) => {
    try {
      const token = Cookies.get("auth");
      await axios.put(
        url + "/todos/" + id,
        { title, IsDone },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (e) {
      console.log(e.message);
    }
  };
  const updateTodo = async (id, IsDone) => {
    try {
      console.log(id);
      const token = Cookies.get("auth");
      await axios.put(
        url + "/todos/" + id,
        { title: updatetitle, IsDone },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="w-full my-5 flex dark:text-white  items-center justify-between">
      <div className="flex">
        <input
          className="cursor-pointer"
          type="checkbox"
          checked={IsDone ? true : false}
          onChange={() => UpdateDone(id, title, !IsDone)}
        />
        {!editStatus ? (
          <h1
            onClick={() => UpdateDone(id, title, !IsDone)}
            className={`ml-3 flex-grow max-w-sm text-lg md:text-xl cursor-pointer font-semibold ${
              IsDone ? "line-through text-gray-400" : null
            }`}
          >
            {" "}
            {title}
          </h1>
        ) : (
          <input
            onChange={(e) => {
              setUpdateTitle(e.target.value);
            }}
            className="ml-3 text-lg flex-grow md:text-xl max-w-sm  dark:text-black font-normal"
            value={updatetitle}
          />
        )}
      </div>
      <div className="flex">
        <div
          onClick={() => {
            DeleteTodo(id);
          }}
          className="cursor-pointer mr-2"
        >
          <MdDeleteOutline className=" text-2xl md:text-3xl" />
        </div>
        {!editStatus ? (
          <div
            className="cursor-pointer mr-2"
            onClick={() => {
              setEditStatus(true);
            }}
          >
            <MdModeEdit className="text-2xl md:text-3xl" />
          </div>
        ) : (
          <div
            className="cursor-pointer mr-2"
            onClick={() => {
              updateTodo(id, IsDone);
              setEditStatus(false);
            }}
          >
            <MdDone className="text-2xl md:text-3xl" />
          </div>
        )}
      </div>
    </div>
  );
};

const TodoPanel = ({ filterSelected }) => {
  const [data, setData] = useState([]);
  const [CompletedData, setCompletedData] = useState([]);
  const [InCompletedData, setInCompletedData] = useState([]);

  const getData = () => {
    const token = Cookies.get("auth");
    axios
      .get(url + "/todos", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        FilterData(res.data.data);
        setData(res.data.data);
      });
  };

  const FilterData = (reqData) => {
    const CompletedData = reqData.filter((each) => {
      if (each.IsDone) return true;
    });
    const InCompletedData = reqData.filter((each) => {
      if (!each.IsDone) return true;
    });
    setCompletedData(CompletedData);
    setInCompletedData(InCompletedData);
  };

  useEffect(() => {
    getData();

    const id = setInterval(() => {
      getData();
    }, 5000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const renderTodo = () => {
    switch (filterSelected) {
      case "All":
        return data.map((each) => (
          <TodoItem
            key={each._id}
            id={each._id}
            title={each.title}
            IsDone={each.IsDone}
          />
        ));
      case "Completed":
        return CompletedData.map((each) => (
          <TodoItem
            key={each._id}
            id={each._id}
            title={each.title}
            IsDone={each.IsDone}
          />
        ));

      case "InComplete":
        return InCompletedData.map((each) => (
          <TodoItem
            key={each._id}
            id={each._id}
            title={each.title}
            IsDone={each.IsDone}
          />
        ));

      default:
        return <div></div>;
    }
  };

  return (
    <section className="w-full  px-6 py-5 flex justify-center">
      <div className="border rounded-md py-10 px-6 w-full flex xl:max-w-screen-2xl ">
        <div className="flex flex-col w-full">{renderTodo()}</div>
      </div>
    </section>
  );
};

export default TodoPanel;
