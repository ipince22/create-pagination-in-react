import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./App.css";

function App() {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(3); //por pagina
  const [pageCount, setPageCount] = useState(0);

  const getData = async () => {
    const res = await axios.get(`https://swapi.dev/api/people/`);
    const data = res.data.results;
    const slice = data.slice(offset, offset + perPage);
    const postData = slice.map((pd, index) => (
      <div key={index}>
        <p>{pd.name}</p>
        {/* <p>{pd.gender}</p> */}
      </div>
    ));
    setData(postData);
    setPageCount(Math.ceil(data.length / perPage));
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  useEffect(() => {
    getData();
  }, [offset]);

  return (
    <div className="App">
      {data}
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
