import Task from "./TaskItem";
import { ChevronDown } from "lucide-react";

const SprintSection = ({ sprintData }) => {
  if (!sprintData || !sprintData.tasks) {
    return <div className="text-gray-500 p-4">No tasks available</div>;
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md border">
      {/* Sprint Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <ChevronDown className="w-5 h-5 text-gray-600" />
          <h2 className="font-semibold text-lg">{sprintData.title}</h2>
          <div>{sprintData.tasks.length} Tasks</div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {sprintData.tasks.length > 0 ? (
          sprintData.tasks.map((task, index) => (
            <Task key={index} taskData={task} />
          ))
        ) : (
          <p className="text-gray-400 text-sm">No tasks available</p>
        )}
      </div>

      {/* Add Task Button */}
      <button className="text-blue-500 text-sm mt-2">+ Create</button>
    </div>
  );
};

export default SprintSection;
