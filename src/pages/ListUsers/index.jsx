/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { users } from "../../data";
import Pagination from "react-js-pagination";

const headUsers = ["No", "ID", "Nama", "Nip", "No Telp", "Email", "Action"];
export const listUsers = localStorage.getItem("DataUsers")
  ? JSON.parse(localStorage.getItem("DataUsers"))
  : users;

function ListUsers({ usersData, setUsersData }) {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [search, setSearch] = useState("");
  // Get Current post
  const indexOfLastPost = page * size;
  const indexOfFirstPost = indexOfLastPost - size;
  const currentPosts = usersData.slice(indexOfFirstPost, indexOfLastPost);

  // delete
  const deleteData = (id) => {
    const data = usersData.filter((item) => item.id !== id);
    setUsersData(data);
    localStorage.setItem("DataUsers", JSON.stringify(data));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setUsersData(
      usersData.filter((item) => {
        if (search === "") {
          return item;
        } else if (
          item.nama.toLowerCase().includes(search.toLowerCase()) ||
          item.nip.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase())
        ) {
          return item;
        }
      })
    );
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearch("");
    setUsersData(listUsers);
  };

  useEffect(() => {
    if (localStorage.getItem("DataUsers")) {
      setUsersData(JSON.parse(localStorage.getItem("DataUsers")));
    }
  }, []);
  return (
    <div className="row">
      <div className="col-md-8 mx-auto mt-5">
        <h1>List Users</h1>
        <div className="d-flex justify-content-between mb-2">
          <div>
            <Link to="/add" className="btn btn-sm btn-dark ">
              Tambah User
            </Link>
          </div>
          <form class="row no-gutters" onSubmit={handleSearch}>
            <div class="col-auto">
              <input
                type="text"
                class="form-control form-control-sm"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-sm btn-dark">
                Search
              </button>
            </div>
            <div class="col-auto">
              <button
                type="button"
                class="btn btn-sm btn-dark"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>{" "}
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead className="table-dark">
              <tr>
                {headUsers.map((item, index) => {
                  return <th key={index}>{item}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {listUsers && listUsers.length !== 0
                ? currentPosts.map((item, index) => {
                    return (
                      <tr>
                        <td>{(page - 1) * size + index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.nama}</td>
                        <td>{item.nip}</td>
                        <td>{item.noTelp}</td>
                        <td>{item.email}</td>
                        <td className="d-flex justify-content-around">
                          <Link
                            to={`/edit/${item.id}`}
                            className="btn btn-sm btn-warning"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteData(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center">
          <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={listUsers.length}
            pageRangeDisplayed={size}
            onChange={setPage}
            itemClass="page-item"
            linkClass="page-link"
            // activeLinkClass="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple"
          />
        </div>
      </div>
    </div>
  );
}

export default ListUsers;
