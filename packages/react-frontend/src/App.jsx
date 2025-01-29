// src/App.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  function updateList(person) {
    setCharacters([...characters, person]);
  }

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:8000/users");
      const data = await response.json();
      setCharacters(data["users_list"]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      await fetchUsers();
    }

    fetchUserData();
  }, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;