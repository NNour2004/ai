"use client";

import { useState } from "react";

interface Props {
  onCancel: () => void;
  onSave: (user: { name: string; email: string }) => void;
}

export default function SignupForm({ onCancel, onSave }: Props) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Envoi vers l'API
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Utilisateur ajouté !");
      onSave({ name: form.name, email: form.email });
      setForm({ name: "", email: "", password: "" });
    } else {
      alert(data.error || "Erreur serveur");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <br /><br />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <br /><br />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <br /><br />
      <button type="submit">Enregistrer</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
        Annuler
      </button>
    </form>
  );
}