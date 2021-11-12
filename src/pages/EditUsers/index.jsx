import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

function EditUsers({ usersData, setUsersData }) {
  const history = useHistory();
  const { id } = useParams();
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
    const data = usersData.map((item) => {
      if (item.id === id) {
        item.nama = dataUsers.nama;
        item.id = dataUsers.id;
        item.nip = dataUsers.nip;
        item.noTelp = dataUsers.noTelp;
        item.email = dataUsers.email;
      }
      return item;
    });
    localStorage.setItem("DataUsers", JSON.stringify(data));
    setUsersData(data);
    history.push("/");
  };

  useEffect(() => {
    const data = usersData.filter((item) => item.id === id)[0];
    setDataUsers(data);
  }, [id]);
  return (
    <div className="row">
      <div className="col-md-8 mx-auto mt-5">
        <h1>Edit Users</h1>
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

export default EditUsers;
