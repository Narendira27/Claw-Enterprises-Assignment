import { useState } from "react";
import { AddTodo, DashboardFooter, Navbar, TodoPanel } from "../components";

const Dashboard = () => {
  const [filterSelected, setFilterSelected] = useState("All");
  return (
    <main className="flex flex-col min-h-screen min-w-screen transition-colors  bg-white dark:bg-[#1e1e1e]">
      <Navbar info={"DashBoard"} />
      <AddTodo
        filterSelected={filterSelected}
        setFilterSelected={setFilterSelected}
      />
      <TodoPanel filterSelected={filterSelected} />
      <DashboardFooter />
    </main>
  );
};

export default Dashboard;
