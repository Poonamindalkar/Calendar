import { useState } from 'react';
import SprintSection from './SprintSection';
import TableHeader from './TableHeader';
import tasks from '../data/tasks';
import { SearchBox } from '@fluentui/react';

const TaskBoard = () => {
    const [groupBy, setGroupBy] = useState('Sprint');
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hoveredFilter, setHoveredFilter] = useState(null);
    const [currentFilter, setCurrentFilter] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState();
    const [newUser, setNewUser] = useState('');
    const [allTasks, setAllTasks] = useState(tasks);

    const addUser = () => {
        if (newUser.trim() && !users.includes(newUser)) {
            setUsers([...users, newUser]);
            setNewUser('');
        }
    };

    const filterTasks = (type, value) => {
        if (!value) {
            setFilteredTasks(tasks);
            setCurrentFilter(null);
            return;
        }

        const newTasks = tasks
            .map((sprint) => ({
                ...sprint,
                tasks: sprint.tasks.filter((task) =>
                    Array.isArray(task[type]) ? task[type].includes(value) : task[type] === value,
                ),
            }))
            .filter((sprint) => sprint.tasks.length > 0);

        setFilteredTasks(newTasks);
        setCurrentFilter(`${type.charAt(0).toUpperCase() + type.slice(1)}: ${value}`);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);

        if (!query.trim()) {
            setFilteredTasks(tasks);
            return;
        }

        const lowerQuery = query.toLowerCase();

        const newTasks = tasks
            .map((sprint) => ({
                ...sprint,
                tasks: sprint.tasks.filter(
                    (task) =>
                        task.name.toLowerCase().includes(lowerQuery) ||
                        task.assignee.toLowerCase().includes(lowerQuery) ||
                        task.category.toLowerCase().includes(lowerQuery),
                ),
            }))
            .filter((sprint) => sprint.tasks.length > 0);

        setFilteredTasks(newTasks);
    };

    return (
        <div className="container">
            <div className="header-section">
                <h1 className="text-2xl font-semibold mb-4">List View Board</h1>
            </div>

            <div className="flex items-center mb-4 space-x-4">
                <SearchBox
                    placeholder="Search..."
                    styles={{ root: { width: 320 } }}
                    onChange={(e, newValue) => handleSearch(newValue || '')}
                    value={searchQuery}
                />
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Add user"
                        value={newUser}
                        onChange={(e) => setNewUser(e.target.value)}
                        className="border rounded-md px-8 py-1 w-32"
                    />
                    <button onClick={addUser} className="bg-blue-500 text-white px-3 py-1 rounded-md">
                        Add
                    </button>
                    <span className="bg-gray-200 px-4 py-1 rounded-md">Group by</span>
                </div>
            </div>

            {currentFilter && (
                <div className="flex items-center justify-between bg-blue-100 text-blue-700 px-4 py-2 rounded-md mb-4">
                    <span className="font-medium">{`Showing: ${currentFilter}`}</span>
                    <button
                        onClick={() => filterTasks(null, null)}
                        className="text-sm text-blue-500 hover:underline"
                    >
                        Clear Filter
                    </button>
                </div>
            )}

            <TableHeader />

            <div className="space-y-6 mt-2">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((sprint) => (
                        <SprintSection key={sprint.title} sprintData={sprint} users={users} />
                    ))
                ) : (
                    <p className="text-gray-400 text-center">No tasks found</p>
                )}
            </div>
        </div>
    );
};

export default TaskBoard;