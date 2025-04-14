import "./DataTable.css"
const DataTable = ({ data, onEdit, onDelete, columnMapping = {}, exclude = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
      return <p>Không tìm thấy dữ liệu</p>;
  }

  const columns = Object.keys(columnMapping).filter(key => !exclude.includes(key));


  const isDate = (value) => {
    // Kiểm tra xem có phải ISO date không
    return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value);
  };
  
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
      <div className="table-container">
          <table className="custom-table">
              <thead>
                  <tr>
                    <th>STT</th>
                     {columns
                        .filter((col) => col !== "id") // Ẩn cột "id"
                        .map((col) => (
                            <th key={col}>{columnMapping[col] || col}</th>
                        ))}
                      <th>Thao tác</th>
                  </tr>
              </thead>
              <tbody>
                  {data.map((row, index) => (
                         <tr key={row.id || index}>
                            <td>{index + 1}</td>
                            {columns
                            .filter((col) => col !== 'id')
                            .map((col) => (
                                <td key={col}>{isDate(row[col]) ? formatDate(row[col]) : row[col]}</td>
                            ))}
                          <td>
                              <button className="edit-btn" onClick={() => onEdit(row)}>Sửa</button>
                              <button className="delete-btn" onClick={() => onDelete(row.id)}>Xóa</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
};

export default DataTable;
