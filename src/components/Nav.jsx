import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = ({ info }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
  };

  const handleSearch = () => {
    setSearch("");
  };

  const citiesFiltered = info.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <h1 className="navbar-brand">Weather_App</h1>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search City"
              aria-label="Search"
              value={search}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      {search && (
        <div className="search-box">
          <ul>
            {citiesFiltered.map((city, index) => (
              <Link
                to={`/Weather/${city.name}`}
                key={city.id}
                style={{ textDecoration: "none" }}
                onClick={handleSearch}
              >
                <li key={city.id}>{city.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
