import "./Input.css";
import Data from "./Data";
// import './Container.css'
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
  setData,
}) {
  let initialState = { text: "", id: "" };
  const [editData, setEditData] = useState(initialState);

  const [search, SetSearch] = useState("");

  // let newData;

  function handleChange(e) {
    e.stopPropagation();
    console.log(e.target.value);
    setEditData({ ...editData, [e.target.name]: e.target.value });
    console.log(editData);
  }

  function handleSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    // console.log(e);
    //  console.log("submit",newData);
    if (edit) update(editData);
    else onAdd(editData);
    setEditData(initialState);
    // console.log("editzzz",edit);
    // console.log(editData);
  }

  useEffect(() => {
    if (edit !== null) {
      setEditData(edit);
      console.log("editz", edit);
    }
  }, [edit]);

  function handleReset(e) {
    e.stopPropagation();
    e.preventDefault();
    setEditData(initialState);
  }

  function handleClear(e) {
    e.stopPropagation();
    clearData();
  }

  function handleSearch(e) {
    e.stopPropagation();
    console.log(e.target.value);
    SetSearch(e.target.value);
  }

  // const handleCompleted = (e) =>{

  // }

  //   function handleFilter() {
  //     const input = search.toUpperCase();
  //     // data.map((d) => console.log(d.text.toUpperCase(), "fill"));
  //     data.map((d) => console.log(d.text.toUpperCase().indexOf(input)));

  //     console.log(input);
  //   }

  //   useEffect(() => {
  //     handleFilter();
  //   }, [search]);

  return (
    <>
      <div className="main-container">
        <form className="getData">
          <textarea
            type="text"
            placeholder="Add your new todo here ..."
            onChange={handleChange}
            name="text"
            value={editData.text}
          />

          <Tooltip id={`tooltip-top`}>
            <button className="btn" onClick={handleSubmit}>
              {edit ? <BiEdit></BiEdit> : "+"}
            </button>
          </Tooltip>

          <button className="btn reset" onClick={handleReset}>
            {<GrPowerReset></GrPowerReset>}
          </button>
        </form>

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
                    onDelete={onDelete}
                    editable={editable}
                  ></Data>
                );
              }
            })}
            {/* {data.map((d) => (
                
              <Data
                key={d.id}
                id={d.id}
                text={d.text.toUpperCase()}
                onDelete={onDelete}
                editable={editable}
              ></Data>
            ))} */}
          </ol>
        </div>
      </div>
    </>
  );
}

export default Input;
