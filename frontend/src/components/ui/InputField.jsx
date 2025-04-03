const InputField = ({ value, onChange, placeholder }) => {
    return <input type="text" value={value} onChange={onChange} placeholder={placeholder} className="custom-input" 
            style={{
              display: "flex",
              width: "100%",
              maxWidth: "300px",
              padding: "10px 15px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              transition: "border-color 0.3s, box-shadow 0.3s",
              marginRight: "4px",
              marginBot: "4px",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}/>;
  };

  export default InputField;