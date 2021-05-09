import React, { useState } from "react";
import { Weather } from "./Weather";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import "./App.css";

export default function App() {
  const [name, setName] = useState("");
  const [inputName, setInputName] = useState("");

  const onNameChange = (e) => {
    setInputName(e.target.value);
  };

  const onSearchClick = () => {
    setName(inputName);
  };

  return (
    <div>
      <div className="d-flex flex-row mx-auto">
      <div  className="justify-content-sm-center align-self-center mx-auto">
      <h1 className="main-heading">
        Weather Forecast App <FontAwesomeIcon icon="cloud-sun" color="white" />
      </h1>
      <hr className="line" />
      <div className="text-center">
      <input
        type="text"
        value={inputName}
        onChange={onNameChange}
        className="input-style"
      />
      <button onClick={onSearchClick} className="button-style">
        Search
      </button>
      </div>
      </div>
      </div>
      <Weather name={name} />
    </div>
 

  );
}
