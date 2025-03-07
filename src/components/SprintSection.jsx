import { useState, useEffect } from "react";
import Task from "./TaskItem";
import { ChevronDown, ChevronRight } from "lucide-react";

const SprintSection = ({ sprintData }) => {
  const [tasks, setTasks] = useState([...sprintData.tasks]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    status: "To Do",
    assignee: "",
    category: "",
  });

  useEffect(() => {
    setTasks([...sprintData.tasks]);
  }, [sprintData]);

  // Handle Create Task Click
  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Add New Task
  const handleSubmit = () => {
    if (newTask.name.trim()) {
      const newTaskData = { id: Date.now(), ...newTask, completed: false };
      setTasks((prevTasks) => [...prevTasks, newTaskData]);
      setIsModalOpen(false);
      setNewTask({ name: "", status: "To Do", assignee: "", category: "" });
    }
  };

  // Delete Task
  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="task-group">
      <div
        className="task-group-header flex items-center justify-between mb-2 cursor-pointer"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          )}
          <h2 className="font-semibold text-lg">{sprintData.title}</h2>
          <div>{tasks.length} Tasks</div>
        </div>
      </div>

      {isExpanded && (
        <div className="w-full space-y-2 transition-all duration-300">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div className="task-item" key={task.id}>
                <Task
                  key={task.id}
                  taskData={task}
                  onDelete={handleDelete}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No tasks available</p>
          )}

          <button
            onClick={handleCreateClick}
            className="text-blue-500 text-sm mt-2"
          >
            + Create
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          <div className="relative bg-white p-6 rounded-lg shadow-lg w-80 z-50">
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>

            <input
              type="text"
              name="name"
              placeholder="Summary"
              value={newTask.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
            />

            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <input
              name="assignee"
              placeholder="Add Assignee"
              value={newTask.assignee}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newTask.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SprintSection;