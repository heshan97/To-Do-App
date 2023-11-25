// Popup.js
import axios from "axios";
import React, { useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { baseURL } from "../utils/constant";
import { Button,Input } from "antd";
// Popup component represents a modal for updating a ToDo item.
const Popup = ({ setShowPopup, popupContent, setUpdateUI, setInputDescription }) => {
  // State variables for input fields.
  const [toDoInput, setToDoInput] = useState(popupContent.text);
  const [descriptionInput, setDescriptionInput] = useState(popupContent.description);

  // Function to handle the update of a ToDo item.
  const updateToDo = () => {
    axios
      .put(`${baseURL}/update/${popupContent.id}`, { toDo: toDoInput, description: descriptionInput })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setShowPopup(false);
      })
      .catch((error) => {
        console.error("Update ToDo error:", error);
        // Handle error, show a message to the user, etc.
      });
  };

  return (
    <div className="backdrop">
      <div className="popup">
        <RiCloseCircleFill className="cross" onClick={() => setShowPopup(false)} />
        <h1>Update ToDo</h1>

        <div className="popup__input_holder">
          <Input
            value={toDoInput}
            onChange={(e) => setToDoInput(e.target.value)}
            type="text"
            placeholder="Update Title"
          />
          <Input
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            type="text"
            placeholder="Update Description..."
          />
          <Button onClick={updateToDo}>Update</Button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
