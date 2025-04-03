import './DataTable.css'
const DataTable = ({ data, onEdit, onDelete, columnMapping = {} }) => {
    if (!Array.isArray(data) || data.length === 0) {
        return <p>Không tìm thấy dữ liệu</p>;
      }
  
    const columns = Object.keys(data[0]);
  
    return (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{columnMapping[col] || col}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={col}>{row[col]}</td>
                  ))}
                  <td>
                    <button onClick={() => onEdit(row)} className="action-button edit">
                    Sửa
                    </button>
                    <button onClick={() => onDelete(row.id)} className="action-button delete">
                    Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  };


  export default DataTable;