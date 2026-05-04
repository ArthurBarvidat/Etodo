import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';


export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const token = localStorage.getItem("token");

  const changeStatus = async (id, newStatus) => {
  try {
    const todoToUpdate = todos.find((t) => t.id === id);
    if (!todoToUpdate) return;

    const res = await fetch(`http://localhost:8081/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: todoToUpdate.title,
        description: todoToUpdate.description,
        due_time: todoToUpdate.due_time,
        user_id: todoToUpdate.user_id,
        status: newStatus }),
    });

    if (!res.ok) {
      console.error("Erreur mise à jour status");
      return;
    }

    const data = await res.json();

    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: data.status } : t))
    );

  } catch (error) {
    console.error("Erreur fetch PUT :", error);
  }
  };


  

  const navigate = useNavigate();
  useEffect(() => {
      document.body.classList.toggle("light-mode", lightMode);
    }, [lightMode]);

  useEffect(() => {
    if (!token) return;

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (e) {
      console.error("Token invalide");
      return;
    }

    const id = decoded.id;

    fetch(`http://localhost:8081/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {

        if (!data || data.length === 0) return setTodos([]);
      if (Array.isArray(data)) {
        setTodos(data);
      } else if (typeof data === "object") {
        setTodos([data]);
      } else {
        setTodos([]);
      }
      })
      .catch((err) => {
        console.error("Erreur fetch :", err);
        setTodos([]);
      });
  }, [token]);
  const deletetodo = async (id)=>{
    
    try{
      const res = await fetch(`http://localhost:8081/todos/${id}`,{
        method:"DELETE",
        headers:{
          Authorization: `Bearer ${token}`,
        },
      });
    
    const data = await res.json();
    if (!res.ok) {
      console.error("Erreur suppression :", data);
      return;
    }
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
     catch (error) {
    console.error("Erreur DELETE :", error);
  }
  };
  const addTodo = async (e) => {
    e.preventDefault();

    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const newTodo = {
      title,
      description,
      due_time: dueTime,
      user_id: userId,
      status: "not started",
    };
    console.log("NEW TODO ENVOYÉ :", newTodo);
    try {
      const res = await fetch("http://localhost:8081/todos", {     
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTodo),
      });

      const data = await res.json();
      console.log("Réponse POST :", data);

      if (!res.ok) {
        console.error("Erreur backend :", {
    id: data.id,
    description: data.description,
    due_time: data.due_time,
    status: data.status
  });
      return;
      }

      setTodos((prev) => [
      ...prev,
      {
        id: data.id,
        title: data.title,
        description: data.description,
        due_time: data.due_time,
        status: data.status
      }
    ]);
      setTitle("");
      setDescription("");
      setDueTime("");
      setShowForm(false)
    } catch (error) {
      console.error("Erreur fetch :", error);
    }
  };
  const deco = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

return (
  <div>
    <button
      className="mode-btn"
      onClick={() => setLightMode(!lightMode)}
    >
      {lightMode ? "Dark Mode" : "Light Mode"}
    </button>
    <button className="deconnect" onClick={deco}>LOGOUT</button>

    <div className="petitebox1">
      <button className="btn-create" onClick={() => setShowForm(!showForm)}>
        {showForm ? "CLOSE" : "CREATE TODO"}
      </button>

      {showForm && (
        <div className="petitebox">
          <div className="Todos">Create new todo</div>

          <form onSubmit={addTodo}>
            <input
              className="text"
              type="text"
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              className="text"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <input
              className="date"
              type="datetime-local"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              required
            />

            <button className="btn-submit" type="submit">
              Ajouter
            </button>
          </form>
        </div>
      )}

      <div className="grossebox">
        {(!todos || todos.length === 0) ? (
          <p className="no-todos">Aucun todo</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="todo-card">
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p className="due-time">
                À faire avant : {new Date(todo.due_time).toLocaleString()}
              </p>
              <p className={`status ${todo.status?.replace(" ", "-")}`}>
                {todo.status}
              </p>

              <select
                value={todo.status}
                onChange={(e) => changeStatus(todo.id, e.target.value)}
              >
                <option value="not started">Not Started</option>
                <option value="in progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <button className="btndelete" onClick={() => deletetodo(todo.id)}>DELETE</button>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);


}
