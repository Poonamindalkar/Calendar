import { useState } from "react";
import { CheckCircle, Square as SquareIcon, Pencil } from "lucide-react";

const Task = ({ taskData, onToggleComplete }) => {
  const [isCompleted, setIsCompleted] = useState(taskData.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(taskData.status);

  const toggleCompletion = () => {
    setIsCompleted(!isCompleted);
    onToggleComplete(taskData.id);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setIsEditing(false); // Close dropdown after selection
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

      {/* Status Dropdown */}
      <div className="flex items-center gap-2 justify-center relative">
        {isEditing ? (
          <select
            value={status}
            onChange={handleStatusChange}
            className="p-1 border rounded text-xs absolute top-0 left-0 z-10 bg-white shadow-md"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        ) : (
          <span className={`px-3 py-1 text-xs font-medium rounded ${
            status === "Completed" ? "bg-green-200 text-green-700" :
            status === "In Progress" ? "bg-blue-200 text-blue-700" :
            "bg-gray-200 text-gray-700"
          }`}>
            {status}
          </span>
        )}
        <button onClick={() => setIsEditing(true)}>
          <Pencil className="w-4 h-4 text-gray-500" />
        </button>
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
