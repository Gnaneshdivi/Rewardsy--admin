import React from 'react';
import './CommonTable.css'; // Import CSS for styling

const CommonTable = ({ data, columns, onRowClick }) => {
  return (
    <div className="common-table-container">
      <table className="common-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick && onRowClick(item)} // Call onRowClick if provided
              className="table-row"
            >
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
