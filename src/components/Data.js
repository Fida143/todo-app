import "./Data.css";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";

function Data({ id, text, onDelete, editable, resetData }) {
  const [completed, setCompleted] = useState(false);
  function handleDelete(id) {
    console.log(id);
    onDelete(id);
  }
  function handleEdit(id) {
    console.log("edit", id);
    editable(id);
  }

  const handleCompleted = (e) => {
    e.stopPropagation();
    setCompleted(!completed);
  };

  return (
    <>
      <li
        onDoubleClick={(e) => {
          e.stopPropagation();
          handleCompleted(e);
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleEdit(id);
        }}
      >
        <div className={`data ${completed ? "completed" : ""}`}>
          <div className="text">
            <p>{text}</p>
          </div>
          <div className="feature">
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
      {/* <button className='btn btn-clear' onClick={handleReset}>Clear all</button> */}
    </>
  );
}

export default Data;
