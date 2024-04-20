import React from "react";
import { Link } from "react-router-dom";

const handleClick = (cityname) => {
  window.open(`/weather/${cityname}`, "_blank");
};

const Cities = ({ info }) => {
  return (
    <div className="city-list">
      <div className="container">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">City_Name</th>
              <th scope="col">Country</th>
              <th scope="col">Time_Zone</th>
            </tr>
          </thead>
          {info.map((data, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>
                    <Link
                      to={`/Weather/${data.name}`}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        handleClick(data.name);
                      }}
                    >
                      {data.name}
                    </Link>
                  </td>
                  <td>{data.cou_name_en}</td>
                  <td>{data.timezone}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Cities;
