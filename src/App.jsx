import TaskBoard from "./components/TaskBoard";
import "./index.css";
import { initializeIcons } from "@fluentui/react";
initializeIcons(); 


function App() {
  return (
    <div className="bg-white-50 min-h-screen flex items-center justify-center">
      
      <TaskBoard />
    </div>
    
  );
}

export default App;







