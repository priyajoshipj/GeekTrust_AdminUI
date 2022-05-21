import React from "react";
import "./style.scss";
import SortIcon from "../../img/sort-icon.png";

const DataTable = props => {
  console.log(" ropssssss >>> ", props)
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th></th>
            <th
              onClick={() => {
                props.onSortChange("name");
              }}
            >
              <span className="column-sort">
                 Name
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("surname");
              }}
            >
              <span className="column-sort">
                Role
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("email");
              }}
            >
              <span className="column-sort">
                E-Mail
                <img src={SortIcon} alt="E-Mail" />
              </span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.users?.length ? (
            props.users?.map(user => (
              <tr key={user.id}>
                <td>  <input type="checkbox" id={`chkbox${user.id}`} name="chkbox"  /></td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(user);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                <div className="no-record-message">No Record!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
