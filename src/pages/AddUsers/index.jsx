import React, { useState } from "react";
import { useHistory } from "react-router";
import { listUsers } from "../ListUsers";

function AddUsers() {
  const history = useHistory();
  const [dataUsers, setDataUsers] = useState({
    id: "",
    nama: "",
    nip: "",
    noTelp: "",
    email: "",
  });
  const input = [
    { name: "id", state: dataUsers.id, text: "ID", type: "text" },
    { name: "nama", state: dataUsers.nama, text: "NAMA", type: "text" },
    { name: "nip", state: dataUsers.nip, text: "NIP", type: "text" },
    {
      name: "noTelp",
      state: dataUsers.noTelp,
      text: "NO TELP",
      type: "number",
    },
    { name: "email", state: dataUsers.email, text: "EMAIL", type: "email" },
  ];
  const handleChange = (e) => {
    setDataUsers((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    listUsers.push(dataUsers);
    localStorage.setItem("DataUsers", JSON.stringify(listUsers));
    history.push("/");
  };
  return (
    <div className="row">
      <div className="col-md-8 mx-auto mt-5">
        <h1>Add Users</h1>
        <form onSubmit={handleSubmit}>
          {input.map((item, index) => {
            return (
              <div className="mb-3" key={index}>
                <label htmlFor="exampleInputPassword1" className="form-label">
                  {item.text}
                </label>
                <input
                  type={item.type}
                  name={item.name}
                  className="form-control"
                  placeHolder={item.text}
                  defaultValue={item.state}
                  onChange={handleChange}
                />
              </div>
            );
          })}
          <button
            type="submit"
            class="btn btn-primary"
            disabled={
              !dataUsers.id ||
              !dataUsers.nama ||
              !dataUsers.nip ||
              !dataUsers.email ||
              !dataUsers.noTelp
            }
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUsers;
