import api from "../lib/api";

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
  const toggleStatus = async () => {
    try {
      const res = await api.put(`/api/tasks/${task._id}`, {
        status: !task.status,
      });
      onTaskUpdated(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const togglePin = async () => {
    try {
      const res = await api.put(`/api/tasks/${task._id}`, {
        pinned: !task.pinned,
      });
      onTaskUpdated(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async () => {
    try {
      await api.delete(`/api/tasks/${task._id}`);
      onTaskDeleted(task._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li
      className={`flex justify-between items-center p-4 rounded-lg shadow-sm border transition ${
        task.pinned
          ? "bg-yellow-50 border-yellow-300"
          : "bg-white border-gray-200"
      }`}
    >
      <div>
        <h3
          className={`font-semibold text-lg ${
            task.status ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={toggleStatus}
          className={`px-3 py-1 text-sm rounded transition ${
            task.status
              ? "bg-gray-400 text-white hover:bg-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {task.status ? "Undone" : "Done"}
        </button>
        <button
          onClick={togglePin}
          className={`px-3 py-1 text-sm rounded transition ${
            task.pinned
              ? "bg-yellow-500 text-white hover:bg-yellow-600"
              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
          }`}
        >
          {task.pinned ? "Unpin" : "Pin"}
        </button>
        <button
          onClick={deleteTask}
          className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
}