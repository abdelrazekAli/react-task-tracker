import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/About";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
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
  const [showEditTask, setShowEditTask] = useState(false);

  // Edit Task
  const [editValues, setEditValues] = useState({
    text: "",
    day: "",
    reminder: false,
  });

  const onEditTask = (task) => {
    setShowEditTask(!showEditTask);
    setShowAddTask(false);
    setEditValues(task);
  };

  let { day, text, reminder, id } = editValues;

  const editTask = (task) => {
    let updatedTasks = tasks.map((ele) =>
      ele.id === task.id ? { ...task } : ele
    );
    setTasks(updatedTasks);
    setToLocal(updatedTasks);
    setShowEditTask(false);
  };

  // Toogle Button
  const toggleButton = () => {
    if (showEditTask || showAddTask) {
      setShowEditTask(false);
      setShowAddTask(false);
    } else {
      setShowAddTask(true);
    }
  };

  return (
    <Router>
      <div className="container">
        <Header onClick={toggleButton} showAdd={showAddTask || showEditTask} />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {showEditTask && (
                <EditTask
                  textValue={text}
                  dayValue={day}
                  reminderValue={reminder}
                  id={id}
                  onEdit={editTask}
                />
              )}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                  onEdit={onEditTask}
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
