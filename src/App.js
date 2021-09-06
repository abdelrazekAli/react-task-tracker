import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/About";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  // Local storage
  let getTasks = localStorage.getItem("tasks");
  const setToLocal = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const [tasks, setTasks] = useState(getTasks ? JSON.parse(getTasks) : []);

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
    setToLocal([...tasks, newTask]);
  };

  // Delete Task
  const deleteTask = (id) => {
    let filterTasks = tasks.filter((task) => task.id !== id);
    setTasks(filterTasks);
    setToLocal(filterTasks);
  };

  // Toggle reminder
  const toggleReminder = (id) => {
    let updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, reminder: !task.reminder } : task
    );
    setTasks(updatedTasks);
    setToLocal(updatedTasks);
  };

  const [showAddTask, setShowAddTask] = useState(false);

  return (
    <Router>
      <div className="container">
        <Header
          onClick={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "There is no tasks"
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
