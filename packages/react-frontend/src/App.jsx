// src/App.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  async function updateList(person) {
    try {
      const response = await postUser(person);
      if (response.status === 201) {
        const newPerson = await response.json();
        setCharacters([...characters, newPerson]);
      } else {
        console.error("Failed to add new user");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function removeOneCharacter(index) {
    const userID = characters[index].id;
    const updated = characters.filter((character, i) => {
      return i !== index;
    });

    try {
      const response = await fetch(`http://localhost:8000/users/${userID}`, {
        method: "DELETE",
      });
      if (response.status === 204) setCharacters(updated);
    } catch (error) {
      console.error(error);
    }
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

  async function postUser(person) {
    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
      });

      return response;
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