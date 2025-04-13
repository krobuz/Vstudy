import "./DataTable.css"
const DataTable = ({ data, onEdit, onDelete, columnMapping = {}, exclude = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
      return <p>Không tìm thấy dữ liệu</p>;
  }

  const columns = Object.keys(columnMapping).filter(key => !exclude.includes(key));

  return (
      <div className="table-container">
          <table className="custom-table">
              <thead>
                  <tr>
                      {columns.map((col) => (
                          <th key={col}>{columnMapping[col] || col}</th>
                      ))}
                      <th>Thao tác</th>
                  </tr>
              </thead>
              <tbody>
                  {data.map((row) => (
                      <tr key={row.id}>
                          {columns.map((col) => (
                              <td key={col}>{row[col]}</td>
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
