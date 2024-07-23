import "./Data.css";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";

function Data({
  id,
  text,
  createdOn,
  completedBefore,
  isCompleted,
  onDelete,
  editable,
  setEditData,
}) {
  const [completed, setCompleted] = useState("pending");

  let date1 = new Date(createdOn);
  let date2 = new Date(completedBefore);

  // Calculating the time difference
  // of two dates
  let Difference_In_Time = date2.getTime() - date1.getTime();

  // Calculating the no. of days between
  // two dates
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  function handleDelete(id) {
    if (prompt("Are You Sure You Want to Delete it ?") == "yes") {
      onDelete(id);
    }
  }
  function handleEdit(id) {
    editable(id);
  }

  return (
    <>
      <li
        onClick={(e) => {
          e.stopPropagation();
          handleEdit(id);
        }}
      >
        <div
          className={`data ${
            isCompleted == "completed"
              ? "completed"
              : Difference_In_Days < 2
              ? "red"
              : Difference_In_Days < 3
              ? "yellow"
              : ""
          } ${""}`}
        >
          <div className="text">
            <p>{text}</p>
          </div>
          <div className="feature">
            <span className="status">
              <select
                name="isCompleted"
                id=""
                value={isCompleted}
                onChange={(e) => {
                  setCompleted(e.target.value);
                  handleEdit(id);
                  setEditData((editData) => {
                    return { ...editData, [e.target.name]: e.target.value };
                  });
                }}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </span>
            <span
              className="edit"
              onClick={(e) => {
                e.stopPropagation();
                return handleEdit(id);
              }}
            >
              <BiEdit></BiEdit>
            </span>
            <span
              className="close"
              onClick={(e) => {
                e.stopPropagation();
                return handleDelete(id);
              }}
            >
              <MdDeleteForever></MdDeleteForever>
            </span>
          </div>
        </div>
      </li>
    </>
  );
}

export default Data;
