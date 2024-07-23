import "./Input.css";
import Data from "./Data";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { GrPowerReset } from "react-icons/gr";
import Tooltip from "react-bootstrap/Tooltip";
function Input({
  data,
  onAdd,
  onDelete,
  editable,
  edit,
  update,
  clearData,
  length,
}) {
  //  By Default Today date and current Time is Selected

  let todayDate;

  function setCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    todayDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  setCurrentDateTime();

  //  Todo Initial State

  let initialState = {
    text: "",
    id: "",
    createdOn: todayDate,
    completedBefore: "",
    isCompleted: false,
  };

  // States

  const [editData, setEditData] = useState(initialState);
  const [search, SetSearch] = useState("");

  // Getting input Values

  function handleChange(e) {
    e.stopPropagation();
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }

  //  Create or Edit Todo

  function handleSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    if (edit) update(editData);
    else onAdd(editData);
    setEditData(initialState);
  }

  useEffect(() => {
    if (edit !== null) {
      setEditData(edit);
    }
  }, [edit]);

  //  Reset Input Data

  function handleReset(e) {
    e.stopPropagation();
    e.preventDefault();
    setEditData(initialState);
  }

  //  Delete all Todos

  function handleClear(e) {
    e.stopPropagation();
    clearData();
  }

  //  Search by Todo Text

  function handleSearch(e) {
    e.stopPropagation();
    SetSearch(e.target.value);
  }

  return (
    <>
      <div className="main-container">
        {/* Input Section */}
        <form className="getData">
          <textarea
            type="text"
            placeholder="Add your new todo here ..."
            onChange={handleChange}
            name="text"
            value={editData.text}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key == "Enter") {
                handleSubmit(e);
              }
            }}
          />
          <Tooltip id={`tooltip-top`}>
            <button className="btn" onClick={handleSubmit}>
              {edit ? <BiEdit></BiEdit> : "+"}
            </button>
          </Tooltip>
          <button className="btn reset" onClick={handleReset}>
            {<GrPowerReset></GrPowerReset>}
          </button>
          <span className="created-on">
            <span>Start :</span>
            <input
              type="datetime-local"
              name="createdOn"
              onChange={handleChange}
              value={editData.createdOn}
            />
          </span>
          <span className="completed-on">
            <span>End :</span>
            <input
              type="datetime-local"
              name="completedBefore"
              onChange={handleChange}
              value={editData.completedBefore}
            />
          </span>
        </form>

        {/* Todo List Section */}
        <div className="container">
          <input
            type="search"
            placeholder="Search your todo ..."
            onChange={handleSearch}
          />

          <p id="length">
            You have <b>{length}</b> todo list items{" "}
          </p>
          <button className="btn clear" onClick={handleClear}>
            Clear all
          </button>
          <ol>
            {" "}
            {data.map((d) => {
              if (d.text.toUpperCase().indexOf(search.toUpperCase()) > -1) {
                return (
                  <Data
                    key={d.id}
                    id={d.id}
                    text={d.text}
                    isCompleted={d.isCompleted}
                    onDelete={onDelete}
                    editable={editable}
                    editData={editData}
                    setEditData={setEditData}
                    createdOn={d.createdOn}
                    completedBefore={d.completedBefore}
                  ></Data>
                );
              }
            })}
          </ol>
        </div>
      </div>
    </>
  );
}

export default Input;
