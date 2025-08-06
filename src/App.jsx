import React from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const API_URL = 'http://localhost:8000/person';

  useEffect(()=> {
    getAllData();
  }, []);

  async function getAllData(){
    const response = await axios.get(API_URL)
    setUsers(response.data);
  }

  function addData(){
    if (name === "" || email === "") {
      alert("Nama dan Email tidak boleh kosong!");
      return;
    }
    const data = {
      name: name,
      email: email
    };
    axios.post(API_URL, data)
      .then(() => {
        setName("");
        setEmail("");
        getAllData();
      })
      .catch((error) => {
        console.error("Ada kesalahan saat menambahkan data:", error);
      });
    return false; // Prevent form submission

  }
  return (
    <div className="wrapper">
      <div className="header">
        <h3>Tambah Pengguna</h3>
        <form className="input-box" type="submit" onSubmit={addData}>
          <input type="text" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email"  value={email}  onChange={(e) => setEmail(e.target.value)} />
          <button type="submit">Simpan</button>
        </form>
      </div>
      <div className="data-pengguna">
        <h3>Data Pengguna</h3>
        <ul>
          {
            users.map((user) => (
              <li key={user.id}>
                <div>
                  {user.name} <span className="email">({user.email})</span>
                </div>
                <div>
                  <a href="#" className="edit">
                    Edit
                  </a>{" "}
                  -{" "}
                  <a href="#" className="delete">
                    Delete
                  </a>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;