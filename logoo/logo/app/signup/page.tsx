// "use client";

// import { useState } from "react";

// export default function SignupPage() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    

//     const res = await fetch("/api/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     alert(data.message || data.error);
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>Signup</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) =>
//             setForm({ ...form, name: e.target.value })
//           }
//         />
//         <br /><br />

//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//         />
//         <br /><br />

//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//         />
//         <br /><br />

//         <button type="submit">Create Account</button>
//       </form>
//     </div>
//   );
// }