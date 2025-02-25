import { useState, useEffect } from "react";

function AccountingTable(props) {
  const [rows, setRows] = useState(props.data);

   useEffect(() => {
    setRows(props.data);
  }, [props.data]);

  return (
    <div className={`accountingTableContainer ${props.tableContainerClass}`}>
      <table>
        <thead>
          <tr>
            {props.columns.map((col, index) => (
              <th key={index} className={`table${col.key}`}>
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {props.columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col.key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={props.columns.length}>لا توجد بيانات</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AccountingTable;
