
import axios from "axios";
import React from "react";
import { baseURL } from "../utils/constant";
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
// ToDo component represents a single ToDo item in the list.
const ToDo = ({ text, description, completed, id, setUpdateUI, setShowPopup, setPopupContent }) => {
  // Function to handle deletion of a ToDo item.
  const deleteTodo = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
    });
  };

  // Function to handle initiating the update of a ToDo item.
  const updateToDo = () => {
    setPopupContent({ text, description, completed, id });
    setShowPopup(true);
  };

  // Function to handle toggling the completion status of a ToDo item.
  const toggleComplete = () => {
    axios
      .put(`${baseURL}/update/${id}`, {
        toDo: text,
        description,
        completed: !completed,
      })
      .then((res) => {
        console.log("Toggle complete success:", res.data);
        setUpdateUI((prevState) => !prevState);
        
      })
      .catch((err) => {
        console.error("Toggle complete error:", err);
      });
  };

  return (
    
   
    <div className={`toDo `}>
        {/* <div onClick={toggleComplete}>{completed ? "Undo" : "Complete"} */}
    
        {/* <strong>{text}</strong>
        {description && <p>{description}</p>} */}
        
      {/* </div> */}
      <Card
    style={{
      width: 800,
    }}
    actions={[
      <EditOutlined key="edit" onClick={updateToDo} />,
      <DeleteOutlined key="setting" onClick={deleteTodo} />,
      
      
    ]}
  >
    <Meta title={text} description={description} />
  </Card>
    
    </div>
    
  );
};

export default ToDo;
