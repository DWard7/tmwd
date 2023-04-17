import React from "react";

function Form({ search, setSearch }) {
  
  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };
  
  return (
    <div className="container mt-3">
      <div className="mb-3">
        <form>
          <div className="d-flex">
            <input
              value={search}
              onChange={handleOnChange}
              placeholder="Search for a movie, tv show, person"
              style={{ height: "40px" }}
              type="text"
              className="form-control rounded-pill"
              id="search"
              name="search"
            />
            <button
              type="submit"
              className="btn btn-primary rounded-pill"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
