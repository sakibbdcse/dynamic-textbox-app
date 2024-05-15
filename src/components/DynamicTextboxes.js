import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DynamicTextboxes.css";

const DynamicTextboxes = () => {
  const [numTextboxes, setNumTextboxes] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch data from the database when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/get-data");
        const data = await response.json();
        setInputs(data.inputs);
        setNumTextboxes(data.inputs.length);
        calculateTotal(data.inputs);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleNumTextboxesChange = (e) => {
    setNumTextboxes(Number(e.target.value));
  };

  const generateTextboxes = () => {
    const newInputs = Array.from({ length: numTextboxes }, () => ({
      value: "",
      checked: false,
    }));
    setInputs(newInputs);
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    setInputs(newInputs);
  };

  const handleCheckboxChange = (index) => {
    const newInputs = [...inputs];
    newInputs[index].checked = !newInputs[index].checked;
    setInputs(newInputs);

    calculateTotal(newInputs);
  };

  const calculateTotal = (inputs) => {
    const selectedInputs = inputs.filter((input) => input.checked);
    const totalValue = selectedInputs.reduce(
      (acc, input) => acc + Number(input.value || 0),
      0
    );
    setTotal(totalValue);
  };

  const saveTotal = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/save-total", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs, total }),
      });
      if (response.ok) {
        toast.success("Total saved successfully!");
      } else {
        toast.error("Failed to save total");
      }
    } catch (error) {
      toast.error("Error saving total");
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1>Dynamic Textboxes</h1>
      <div className="controls">
        <label>
          Number of textboxes:
          <input
            type="number"
            value={numTextboxes}
            onChange={handleNumTextboxesChange}
          />
        </label>
        <button onClick={generateTextboxes}>Add Textboxes</button>
      </div>
      {inputs.map((input, index) => (
        <div className="input-group" key={index}>
          <input
            type="number"
            value={input.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <input
            type="checkbox"
            checked={input.checked}
            onChange={() => handleCheckboxChange(index)}
          />
        </div>
      ))}
      <div className="total">
        <p>Total: {total}</p>
      </div>
      <button className="save-button" onClick={saveTotal}>
        Save Total
      </button>
    </div>
  );
};

export default DynamicTextboxes;
