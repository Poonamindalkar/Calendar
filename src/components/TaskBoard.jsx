import { useState } from "react";
import SprintSection from "./SprintSection";
import TableHeader from "./TableHeader";
import tasks from "../data/tasks";
import { SearchBox, Dropdown } from "@fluentui/react";
 
const TaskBoard = () => {
  const [groupBy, setGroupBy] = useState("Sprint");
  const groupingOptions = ["Sprint",  "Status", "Assignee", "Category"];

  const handleGroupBySelection = (_, option) => {
    setGroupBy(option.key);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-4">List View Board</h1>

      {/* Search & Group By Dropdown */}
      <div className="flex justify-between items-center mb-4 relative">
        {/* Fluent UI SearchBox */}
        <SearchBox 
          placeholder="Search..." 
          onSearch={(value) => console.log("Searching for:", value)}
          styles={{ root: { width: 300 } }} 
        />

        {/* Fluent UI Dropdown for Grouping */}
        <Dropdown
          placeholder={`Group by: ${groupBy}`}
          options={groupingOptions.map((option) => ({ key: option, text: option }))}
          selectedKey={groupBy}
          onChange={handleGroupBySelection}
          styles={{ dropdown: { width: 180 } }}
        />
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
