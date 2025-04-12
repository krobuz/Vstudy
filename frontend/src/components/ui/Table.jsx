import React from 'react';
import './Table.css';

const Table = ({ 
  columns, 
  data, 
  onRowClick,
  className = ''
}) => {
  return (
    <div className={`table-wrapper ${className}`}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index}
                className={column.className || ''}
                style={column.style}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              className={onRowClick ? 'clickable' : ''}
            >
              {columns.map((column, colIndex) => (
                <td 
                  key={colIndex}
                  className={column.className || ''}
                  style={column.style}
                >
                  {column.render 
                    ? column.render(row[column.key], row) 
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table; 