import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [connected, setConnected] = useState(false);
  const [lightMode, setLightMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("light-mode", lightMode);
  }, [lightMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setConnected(true);
        setTimeout(() => navigate("/todos"), 1000);
      } else {
        alert(data.msg || "Email ou mot de passe incorrect.");
      }
    } catch (error) {
      alert("Erreur avec le serveur.");
    }
  };

  return (
    <div>
      
      <button
        className="mode-btn"
        onClick={() => setLightMode(!lightMode)}
      >
        {lightMode ? "Dark Mode" : "Light Mode"}
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Entrez votre mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Se connecter" />
      </form>

      <div className="link">
        <p>
          Pas encore de compte ? <a href="/register">Inscription</a>
        </p>
      </div>

      {connected && (
        <div className="success-msg">Connecté !</div>
      )}
    </div>
  );
}
