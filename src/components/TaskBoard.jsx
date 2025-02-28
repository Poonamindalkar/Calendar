import { useState } from "react";
import SprintSection from "./SprintSection";
import TableHeader from "./TableHeader";
import { Badge } from "./Avatar";
import tasks from "../data/tasks";
import { SearchBox } from "@fluentui/react";

const TaskBoard = () => {
  const [groupBy, setGroupBy] = useState("Sprint");
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredFilter, setHoveredFilter] = useState(null);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  //  Function to Filter Tasks by Dropdown
  const filterTasks = (type, value) => {
    if (!value) {
      setFilteredTasks(tasks);
      setCurrentFilter(null);
      return;
    }

    const newTasks = tasks.map((sprint) => ({
      ...sprint,
      tasks: sprint.tasks.filter((task) => task[type] === value),
    })).filter((sprint) => sprint.tasks.length > 0);

    setFilteredTasks(newTasks);
    setCurrentFilter(`${type.charAt(0).toUpperCase() + type.slice(1)}: ${value}`);
  };

  //  Function to Filter Tasks by Search Query
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredTasks(tasks); 
      return;
    }

    const lowerQuery = query.toLowerCase();

    const newTasks = tasks.map((sprint) => ({
      ...sprint,
      tasks: sprint.tasks.filter(
        (task) =>
          task.name.toLowerCase().includes(lowerQuery) ||
          task.assignee.toLowerCase().includes(lowerQuery) ||
          task.category.toLowerCase().includes(lowerQuery)
      ),
    })).filter((sprint) => sprint.tasks.length > 0);

    setFilteredTasks(newTasks);
  };

  const handleHover = (filterType) => {
    setHoveredFilter(filterType);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-4">List View Board</h1>

      {/* Search & Filter Dropdown */}
      <div className="flex justify-between items-center mb-4 relative">
        <SearchBox
          placeholder="Search..."
          styles={{ root: { width: 300 } }}
          onChange={(e, newValue) => handleSearch(newValue)}
          value={searchQuery}
          
        />
        <Badge />


        {/* Custom Dropdown */}
        <div
          className="relative bg-gray-200 px-4 py-2 rounded-md cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          Group by
          {dropdownOpen && (
            <div className="absolute top-full left-0 w-40 bg-white shadow-md border rounded-md mt-1">
              <div className="p-2 hover:bg-gray-100" onMouseEnter={() => handleHover("status")}>
                Status →
                {hoveredFilter === "status" && (
                  <div className="absolute left-full top-0 w-40 bg-white shadow-md border rounded-md">
                    {["To Do", "In Progress", "Completed"].map((status) => (
                      <div
                        key={status}
                        className="p-2 hover:bg-gray-200"
                        onClick={() => filterTasks("status", status)}
                      >
                        {status}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-2 hover:bg-gray-100" onMouseEnter={() => handleHover("assignee")}>
                Assignee →
                {hoveredFilter === "assignee" && (
                  <div className="absolute left-full top-0 w-40 bg-white shadow-md border rounded-md">
                    {Array.from(new Set(tasks.flatMap((s) => s.tasks.map((t) => t.assignee)))).map((assignee) => (
                      <div
                        key={assignee}
                        className="p-2 hover:bg-gray-200"
                        onClick={() => filterTasks("assignee", assignee)}
                      >
                        {assignee}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-2 hover:bg-gray-100" onMouseEnter={() => handleHover("category")}>
                Category →
                {hoveredFilter === "category" && (
                  <div className="absolute left-full top-0 w-40 bg-white shadow-md border rounded-md">
                    {Array.from(new Set(tasks.flatMap((s) => s.tasks.map((t) => t.category)))).map((category) => (
                      <div
                        key={category}
                        className="p-2 hover:bg-gray-200"
                        onClick={() => filterTasks("category", category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Show Current Filter */}
      {currentFilter && (
        <div className="flex items-center justify-between bg-blue-100 text-blue-700 px-4 py-2 rounded-md mb-4">
          <span className="font-medium">{`Showing: ${currentFilter}`}</span>
          <button
            onClick={() => filterTasks(null, null)}
            className="text-sm text-blue-500 hover:underline"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Table Header */}
      <TableHeader />

      {/* Sprint Sections */}
      <div className="space-y-6 mt-2">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((sprint) => <SprintSection key={sprint.title} sprintData={sprint} />)
        ) : (
          <p className="text-gray-400 text-center">No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default TaskBoard;
