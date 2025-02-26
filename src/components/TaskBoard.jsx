import { useState } from "react";
import SprintSection from "./SprintSection";
import TableHeader from "./TableHeader";
import tasks from "../data/tasks"; // ✅ Ensure correct path
import { Search } from "lucide-react";

const TaskBoard = () => {
  const [groupBy, setGroupBy] = useState("Sprint");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const groupingOptions = ["Sprint", "Priority", "Status", "Assignee", "Category"];

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleGroupBySelection = (option) => {
    setGroupBy(option);
    setDropdownOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-4">List View Board</h1>

      {/* Search & Dropdown */}
      <div className="flex justify-between items-center mb-4 relative">
        <div className="relative w-96">
          <Search className="absolute left-3 top-2.5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full pl-10 p-2 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300" 
          />
        </div>

        <div className="relative">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition" 
            onClick={toggleDropdown}
          >
            Group by: {groupBy}
          </button>
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md">
              {groupingOptions.map((option) => (
                <li 
                  key={option} 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleGroupBySelection(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Table Header */}
      <TableHeader />

      {/* Sprint Sections */}
      <div className="space-y-6 mt-2">
        {tasks.map((sprint) => (
          <SprintSection key={sprint.title} sprintData={sprint} />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
