const TableHeader = () => {
  const headers = ["Summary", "Status", "Assignee", "Category"];

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-gray-100 px-4 py-2 rounded-md text-gray-600 font-semibold text-sm max-w-3xl mx-auto">
      {headers.map((header) => (
        <div key={header} className="text-left">{header}</div>
      ))}
    </div>
  );
};

export default TableHeader;
