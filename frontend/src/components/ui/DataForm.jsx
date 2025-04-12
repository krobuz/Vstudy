
import "./DataForm.css"

const DataForm = ({
    fields,
    formData = {},
    onChange,
    onSubmit,
    onCancel,
    editingItem = null,
  }) => {
    const isEditing = !!editingItem;
  
    return (
      <form onSubmit={onSubmit} className="data-form">
        {fields.map((field) => (
          <div key={field.name} className="form-group">
            <label>{field.label}</label>
  
            {field.type === "select" && Array.isArray(field.options) ? (
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={onChange}
                required={field.required}
              >
                <option value="">-- Chọn {field.label} --</option>
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={onChange}
                required={field.required}
              />
            )}
          </div>
        ))}
  
        <div className="form-actions">
          <button
            type="submit"
          >
            {isEditing ? "Lưu" : "Thêm"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
            >
              Hủy
            </button>
          )}
        </div>
      </form>
    );
  };
  
  export default DataForm;
  