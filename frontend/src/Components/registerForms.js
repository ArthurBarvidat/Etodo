import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [firstname, setFirstname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lightMode, setLightMode] = useState(false);

  const navigate = useNavigate();

  
  useEffect(() => {
    document.body.classList.toggle("light-mode", lightMode);
  }, [lightMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const res = await fetch("http://localhost:8081/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, name, email, password }),
      });

      if (res.ok) {
        navigate("/login");
      } else {
        alert("Erreur lors de l'inscription");
      }
    } catch (err) {
      alert("Erreur serveur");
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
          type="text"
          placeholder="Entrez votre prénom"
          required
          value={firstname}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[A-Za-zÀ-ÿ\s-]*$/.test(value)) {
              setFirstname(value);
            }
          }}
        />

        <input
          type="text"
          placeholder="Entrez votre nom"
          required
          value={name}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[A-Za-zÀ-ÿ\s-]*$/.test(value)) {
              setName(value);
            }
          }}
        />

        <input
          type="email"
          placeholder="Adresse email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Entrez un mot de passe"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmer votre mot de passe"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <input type="submit" value="S'inscrire" />
      </form>

      <div className="link">
        <p>Déjà un compte ? <a href="/login">Connexion</a></p>
      </div>
    </div>
  );
}
