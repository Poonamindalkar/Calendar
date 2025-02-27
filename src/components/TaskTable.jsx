import React from "react";
import TableHeader from "./TableHeader";
import tasks from "../data/tasks";

const TaskTable = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md">
      <TableHeader />

      {tasks.map((section) => (
        <div key={section.title} className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h2>

          <div className="divide-y divide-gray-200">
            {section.tasks.map((task) => (
              <div 
                key={task.id} 
                className="grid grid-cols-4 px-4 py-3 text-gray-700 text-sm items-center"
              >
                <div className="px-2">{task.name}</div>
                <div className="px-2">{task.status}</div>
                <div className="px-2">{task.assignee}</div>
                <div className="px-2">{task.category}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskTable;
