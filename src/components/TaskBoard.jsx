import { useState } from "react";
import SprintSection from "./SprintSection";
import TableHeader from "./TableHeader";
import tasks from "../data/tasks";
import { SearchBox, Dropdown } from "@fluentui/react";

const TaskBoard = () => {
  const [groupBy, setGroupBy] = useState("Sprint");
  const groupingOptions = ["Sprint", "Status", "Assignee", "Category"];

  const handleGroupBySelection = (_, option) => {
    setGroupBy(option.key);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl">  
      <h1 className="text-2xl font-semibold mb-4 text-center">List View Board</h1>

      {/* Search & Group By */}
      <div className="flex justify-between items-center mb-4">
        <SearchBox
          placeholder="Search..."
          onSearch={(value) => console.log("Searching for:", value)}
          styles={{ root: { width: 250 } }} 
        />

        <Dropdown
          placeholder={`Group by: ${groupBy}`}
          options={groupingOptions.map((option) => ({ key: option, text: option }))}
          selectedKey={groupBy}
          onChange={handleGroupBySelection}
          styles={{ dropdown: { width: 160 } }}
        />
      </div>

      {/* Table Header */}
      <div className="w-full">
        <TableHeader />
      </div>

      {/* Sprint Sections */}
      <div className="w-full mt-2 space-y-4">
        {tasks.map((sprint) => (
          <SprintSection key={sprint.title} sprintData={sprint} />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
