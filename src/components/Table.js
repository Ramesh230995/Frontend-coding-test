import React, { useState, useEffect } from "react";
import data from "./mock_data.json";
import personImg from "../assets/person.png";
import { Pagination } from "antd";
import "antd/dist/antd.css";

const Table = () => {
  const [textWord, setTextWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [maxIndex, setMaxIndex] = useState(6);
  const [minIndex, setMinIndex] = useState(0);
  const [usersData, setUsersData] = useState(data);
  const [sort, setSort] = useState("name");
  const [sortType, setSortType] = useState("name");
  const pageSize = 6;

  // console.log("usersData :",data);
  console.log("usersData length:", data.length);

  const searchData = usersData.filter((item) => {
    return (
      item.name.toLowerCase().includes(textWord.toLowerCase()) ||
      item.description.toLowerCase().includes(textWord.toLowerCase())
    );
  });

  console.log("search data:", searchData);

  const changeHandler = (page) => {
    console.log("current page:", page);
    setCurrentPage(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  };

  const sortHandler = (e) => {
    setSort(e.target.value);
  };
  console.log("sort:", sort);

  console.log("maxIndex:", maxIndex);
  console.log("minIndex:", minIndex);

  return (
    <div className="mainLayout">
      <div className="gridLayout">
        <div className="contentNavbar">
          <input
            type="search"
            className="search"
            value={textWord}
            onChange={(e) => setTextWord(e.target.value)}
            placeholder="Search"
          />

          <span>Sort by</span>
          <select className="sort" value={sort} onChange={sortHandler}>
            <option value="name">name</option>
            <option value="dateLastEdited">dateLastEdited</option>
          </select>
        </div>
        <div>
          <div className="gridContainer">
            {searchData.map(
              (item, index) =>
              index >= minIndex &&
                index < maxIndex && (
                  <div className="card">
                    <div style={{paddingLeft:"10px"}}>
                      <div>
                      <span>
                        <img
                          src={personImg}
                          height="100px"
                          width="100px"
                          className="image"
                        />
                      </span>
                      </div>
                      <div>
                      <span>Name : {item.name}</span>
                      </div>
                      <div>
                      <span>Description : {item.description}</span>
                      </div>
                      <div>
                      <span>dateLastEdited : {item.dateLastEdited}</span>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
      <div className="tableContainer">
        {searchData.length > 0 ? (
          <table border="1">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Date Last Edited</th>
              </tr>
            </thead>
            <tbody>
              {searchData?.map(
                (item, index) =>
                  index >= minIndex &&
                  index < maxIndex && (
                    <tr key={index}>
                      <td>
                        <img src={personImg} height="50px" />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.dateLastEdited}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        ) : (
          <div className="nodata">No Data Found</div>
        )}
      </div>
      <Pagination
        total={searchData.length}
        pageSize={pageSize}
        current={currentPage}
        onChange={changeHandler}
        showSizeChanger={false}
        className="pagination"
      />
    </div>
  );
};

export default Table;
