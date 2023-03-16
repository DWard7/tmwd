import React from "react";

function Form({ search, setSearch }) {
  
  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };
  
  return (
    <div className="container mt-3" style={{ width: "50%" }}>
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
              style={{
                height: "40px",
                position: "absolute",
                top: "79px",
                left: "63.63%",
              }}
              type="submit"
              className="btn btn-outline-primary rounded-pill"
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
