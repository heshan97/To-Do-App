// import axios from "axios";
// import React from "react";
// import { AiFillEdit } from "react-icons/ai";
// import { RxCross1 } from "react-icons/rx";
// import { baseURL } from "../utils/constant";

// const ToDo = ({ text,description, id, setUpdateUI, setShowPopup, setPopupContent }) => {
//   const deleteTodo = () => {
//     axios.delete(`${baseURL}/delete/${id}`).then((res) => {
//       console.log(res.data);
//       setUpdateUI((prevState) => !prevState);
//     });
//   };

//   const updateToDo = () => {
//     setPopupContent({ text, id });
//     setShowPopup(true);
//   };

//   return (
//     <div className="toDo">
//        <h3>{text}</h3>
//       <p>{description}</p>

//       <div className="icons">
//         <AiFillEdit className="icon" onClick={updateToDo} />
//         <RxCross1 className="icon" onClick={deleteTodo} />
//       </div>
//     </div>
//   );
// };

// export default ToDo;
// ToDo.js
// ToDo.js
// ToDo.js
import axios from "axios";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
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
    
    // <div className={`toDo ${completed ? "completed" : ""}`}>
    //   <div>
    //     <strong>{text}</strong>
    //     {description && <p>{description}</p>}
    //   </div>
    //   <div className="icons">
    //     <div className="checkbox">fdf</div>
    //     {/* <button onClick={toggleComplete}>{completed ? "Undo" : "Complete"}</button> */}
    //     <AiFillEdit className="icon" onClick={updateToDo} />
    //     <RxCross1 className="icon" onClick={deleteTodo} />
    //   </div>
    // </div>
    <div className={`toDo `}>
        {/* <div onClick={toggleComplete}>{completed ? "Undo" : "Complete"} */}
    
        {/* <strong>{text}</strong>
        {description && <p>{description}</p>} */}
        
      {/* </div> */}
      <Card
    style={{
      width: 500,
    }}
    actions={[
      <SettingOutlined key="setting" onClick={deleteTodo} />,
      <EditOutlined key="edit" onClick={updateToDo} />,
      // <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta title={text} description={description} />
  </Card>
    
    </div>
    
  );
};

export default ToDo;
