export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to TaskManager
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Organize your tasks, stay productive, and keep track of what matters.
      </p>

      <div className="flex gap-4">
        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl shadow hover:bg-gray-200 transition"
        >
          Register
        </a>
      </div>
    </div>
  );
}