import { People24Regular, Tag24Regular, CheckboxChecked24Regular } from "@fluentui/react-icons";

const TableHeader = () => {
  return (
    <div className="grid grid-cols-[1.5fr_0.8fr_1fr_1fr] items-center font-semibold py-2 border-b px-6 pl-8">
      <span></span>
      <span className="flex items-center justify-center">
        <CheckboxChecked24Regular className="mr-1" /> Status
      </span>
      <span className="flex items-center justify-center">
        <People24Regular className="mr-1" /> Assignee
      </span>
      <span className="flex items-center justify-center">
        <Tag24Regular className="mr-1" /> Category
      </span>
    </div>
  );
};

export default TableHeader;
