import { FaTimes, FaEdit } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle, onEdit }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}
        <span>
          <FaEdit
            style={{ color: "green", marginRight: "5px" }}
            onClick={() => onEdit(task)}
          />
          <FaTimes
            style={{ color: "red" }}
            onClick={() => {
              onDelete(task.id);
            }}
          />
        </span>
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
