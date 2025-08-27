import { useEffect, useState } from "react";
import api from "../lib/api";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import SortBar from "../components/SortBar";

export default function Dashboard({ searchTerm = "" }) {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchTasks = async (page = currentPage) => {
    try {
      const res = await api.get("/api/tasks", { params: { page, limit } });

      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);

      // ✅ Auto-go back one page if current page is empty
      if (res.data.tasks.length === 0 && page > 1) {
        setCurrentPage((p) => p - 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // ✅ filter by search term
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ sort after filtering
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "pinned") return b.pinned - a.pinned;
    if (sortBy === "title") return a.title.localeCompare(b.title);
    return new Date(b.date) - new Date(a.date); // newest first
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

      {/* ✅ Task form always adds to page 1 */}
      <div className="mb-6">
        <TaskForm
          onTaskAdded={() => {
            setCurrentPage(1); // jump to page 1
            fetchTasks(1); // refresh immediately
          }}
        />
      </div>

      <SortBar sortBy={sortBy} setSortBy={setSortBy} />

      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      <ul className="space-y-3">
        {sortedTasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onTaskUpdated={(updatedTask) =>
              setTasks(
                tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
              )
            }
            onTaskDeleted={() => fetchTasks()} // ✅ backend decides if page should shift
          />
        ))}
      </ul>

      {/* ✅ Show pagination only if more than 1 page */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
          >
            Prev
          </button>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded border ${
                  currentPage === pageNum
                    ? "bg-blue-500 text-white font-semibold"
                    : "bg-white hover:bg-gray-100 text-gray-700"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}