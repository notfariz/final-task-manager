export default function SortBar({ sortBy, setSortBy }) {
  return (
    <div className="flex items-center justify-end mb-4">
      <label htmlFor="sort" className="mr-3 text-gray-700 font-medium">
        Sort by:
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="date">Date (Newest first)</option>
        <option value="title">Title (A → Z)</option>
        <option value="pinned">Pinned First</option>
      </select>
    </div>
  );
}
