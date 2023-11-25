
import { Button,Input,Card, Col, Row } from 'antd';
import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";

const App = () => {
  // State variables for ToDo list, input fields, update trigger, popup visibility, and popup content.
  const [toDos, setToDos] = useState([]);
  const [inputToDo, setInputToDo] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});

  // Effect to fetch ToDo items from the server on initial load and when updateUI state changes.
  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => setToDos(res.data))
      .catch((err) => console.log(err));
  }, [updateUI]);

  // Function to save a new ToDo item.
  const saveToDo = () => {
    axios
      .post(`${baseURL}/save`, { toDo: inputToDo, description: inputDescription })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInputToDo("");
        setInputDescription("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>


      <div className="container">
        <h1 className="title">ToDo App</h1>

        {/* Input holder for adding new ToDo items */}
        <div className="input_holder">
          <Input
            value={inputToDo}
            onChange={(e) => setInputToDo(e.target.value)}
            type="text"
            placeholder="Add a Title"
          />
          <Input
            value={inputDescription}
            onChange={(e) => setInputDescription(e.target.value)}
            type="text"
            placeholder="Add a Description"
          />
          <Button type="primary" onClick={saveToDo}>Add</Button>
        </div>
       
        {/* ToDo list rendering */}
        <div className="list">
          {toDos.map((el) => (
            <ToDo
              key={el._id}
              text={el.toDo}
              description={el.description}
              id={el._id}
              setUpdateUI={setUpdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
            />
          ))}
        </div>
      </div>

      {/* Popup for updating ToDo items */}
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
          setInputDescription={setInputDescription}
        />
      )}
    </main>
  );
};

export default App;
