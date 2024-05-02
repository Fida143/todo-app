// import Container from './components/Container';
import "./App.css";
import { useEffect, useState } from "react";
import Input from "./components/Input";
import { SlNote } from "react-icons/sl";

function App() {
  console.log("App..");

  // const dataDB =[
  // {
  //   id:1,
  //   text:" hi i am fida hussain"
  // },
  // {
  //   id:2,
  //   text:" hello i am fida hussain"
  // },
  // {
  //   id:3,
  //   text:" bolo i am fida hussain"
  // }
  // ]

  function getLocalValue() {
    const list = localStorage.getItem("items");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  }

  const [data, setData] = useState(() => getLocalValue());
  const [edit, setEdit] = useState(null);
  let length = data.length;

  function onAdd(editData) {
    console.log("onAdd", editData);
    setData([...data, { ...editData, id: `data-${Date.now()}` }]);
    // console.log(length);

    // console.log(data);
  }

  function onDelete(id) {
    console.log("delete", id);
    setData(data.filter((d) => d.id !== id));
  }
  function editable(id) {
    console.log("appedit", id);
    console.log(data.find((d) => d.id === id));
    setEdit(data.find((d) => d.id === id));
    // console.log(edit);
  }

  function update(edit) {
    const index = data.findIndex((d) => d.id === edit.id);
    console.log(index);
    let newtodo = [...data];
    newtodo.splice(index, 1, edit);
    setData(newtodo);
    setEdit(null);
  }
  function clearData() {
    setData([]);
  }

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(data));
  }, [data]);

  return (
    <main>
      <h1>
        <SlNote /> MY TODO
      </h1>
      {/* <div className="main-container"> */}
      {/* <Container data={data} onAdd={onAdd} onDelete={onDelete} editable={editable} edit={edit} update={update}></Container> */}
      <Input
        data={data}
        onAdd={onAdd}
        onDelete={onDelete}
        editable={editable}
        edit={edit}
        update={update}
        clearData={clearData}
        length={length}
        setData={setData}
      ></Input>

      {/* <Container data={data} onAdd={onAdd} onDelete={onDelete} editable={editable} edit={edit} update={update}></Container> */}
      {/* </div> */}
    </main>
  );
}

export default App;
