"use client";

import { useState, useEffect } from "react";
import SignupForm from "./components/SignupForm";

interface User {
  name: string;
  email: string;
}

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  // Récupérer users du localStorage au chargement
  useEffect(() => {
    const stored = localStorage.getItem("users");
    if (stored) setUsers(JSON.parse(stored));
  }, []);

  const handleAddUser = (user: User) => {
    const newUsers = [...users, user];
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers)); // sauvegarde
    setShowForm(false);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Gestion des comptes</h1>
      <button onClick={() => setShowForm(true)}>Ajouter</button>

      {showForm && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "20px" }}>
          <SignupForm onCancel={() => setShowForm(false)} onSave={handleAddUser} />
        </div>
      )}

      <h2>Liste des utilisateurs</h2>
      <table style={{ marginTop: "30px", width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #000", padding: "8px" }}>Nom</th>
            <th style={{ border: "1px solid #000", padding: "8px" }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #000", padding: "8px" }}>{user.name}</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}