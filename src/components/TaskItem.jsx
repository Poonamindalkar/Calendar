import { useState } from "react";
import { CheckCircle, Square as SquareIcon } from "lucide-react";

const Task = ({ taskData, onToggleComplete }) => {
  const [isCompleted, setIsCompleted] = useState(taskData.completed);

  const toggleCompletion = () => {
    setIsCompleted(!isCompleted);
    onToggleComplete(taskData.id); // Update parent state
  };

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center px-4 py-3 bg-white rounded-lg shadow border">
      {/* Task Name with Checkbox */}
      <div className="flex items-center gap-3">
        <button onClick={toggleCompletion} className="focus:outline-none">
          {isCompleted ? (
            <CheckCircle className="text-blue-500 w-5 h-5" />
          ) : (
            <SquareIcon className="text-gray-400 w-5 h-5" />
          )}
        </button>
        <span className={`text-gray-700 font-medium ${isCompleted ? "line-through text-gray-400" : ""}`}>
          {taskData.name}
        </span>
      </div>

      {/* Status Badge */}
      <div className="flex justify-center">
        <span className={`px-3 py-1 text-xs font-medium rounded ${
          taskData.status === "Completed" ? "bg-green-200 text-green-700" :
          taskData.status === "In Progress" ? "bg-blue-200 text-blue-700" :
          "bg-gray-200 text-gray-700"
        }`}>
          {taskData.status}
        </span>
      </div>

      {/* Assignee */}
      <div className="flex justify-center text-gray-700 text-sm font-medium">
        {taskData.assignee}
      </div>

      {/* Category Tag */}
      <div className="flex justify-center">
        <span className={`px-3 py-1 text-xs font-medium rounded ${
          taskData.category === "Research" ? "bg-pink-200 text-pink-700" :
          "bg-yellow-200 text-yellow-700"
        }`}>
          {taskData.category}
        </span>
      </div>
    </div>
  );
};

export default Task;
