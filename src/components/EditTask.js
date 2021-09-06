import { useState } from "react";

const EditTask = ({ textValue, dayValue, reminderValue, id, onEdit }) => {
  const [text, setText] = useState(textValue);
  const [day, setDay] = useState(dayValue);
  const [reminder, setReminder] = useState(reminderValue);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Please add a task");
      return;
    }
    onEdit({ id, text, day, reminder });
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task Name</label>
        <input
          type="text"
          placeholder="Edit task"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
      <div className="form-control">
        <label>Date &amp; Time</label>
        <input
          type="text"
          placeholder="Edit date &amp; time"
          value={day}
          onChange={(e) => {
            setDay(e.target.value);
          }}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Edit reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => {
            setReminder(e.currentTarget.checked);
          }}
        />
      </div>
      <input type="submit" value="Edit task" className="btn btn-block" />
    </form>
  );
};

export default EditTask;
