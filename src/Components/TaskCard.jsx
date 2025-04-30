import React from 'react';

function TaskCard({ task, changeStatus, deleteTask, provided }) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="bg-black p-4 mb-4 rounded-xl shadow-md border-2 border-red-600 hover:scale-105 transition-transform"
    >
      <h3 className="text-lg font-bold text-red-400">{task.title}</h3>
      <p className="text-sm text-gray-400 mt-2">{task.description}</p>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {task.status !== 'To Do' && (
          <button
            className="text-xs bg-red-500 px-3 py-1 rounded-full hover:bg-red-600"
            onClick={() => changeStatus(task._id, 'To Do')}
          >
            To Do
          </button>
        )}
        {task.status !== 'In Progress' && (
          <button
            className="text-xs bg-yellow-500 px-3 py-1 rounded-full hover:bg-yellow-600"
            onClick={() => changeStatus(task._id, 'In Progress')}
          >
            In Progress
          </button>
        )}
        {task.status !== 'Done' && (
          <button
            className="text-xs bg-green-500 px-3 py-1 rounded-full hover:bg-green-600"
            onClick={() => changeStatus(task._id, 'Done')}
          >
            Done
          </button>
        )}
        <button
          className="text-xs bg-red-700 px-3 py-1 rounded-full hover:bg-red-800"
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
