import { signup, login as loginApi } from "../hooks/useAuthService";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Signup() {
  const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
;
  const { login } = useAuth();
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  
  if (!form.name) {
    alert("Name is required");
    return;
  }
  if (!form.email) {
    alert("Email is required");
    return;
  }
  if (form.password.length < 8) {
    alert("Password must be at least 8 characters long");
    return;
  }
  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    // 1) create account
    await signup({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    
    const res = await loginApi({ email: form.email, password: form.password });

    
    localStorage.setItem("token", res.data.token);
    
    login(res.data.user);

    alert("Signup and login successful");
    navigate("/dashboard"); 
  } catch (err) {
    
    const msg = err.response?.data?.message || err.message || "Signup failed";
    alert(msg);
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="p-6 max-w-sm w-full bg-white shadow-md rounded space-y-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          className="border p-2 w-full rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          className="border p-2 w-full rounded"
          placeholder="Password (min 8 characters)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <input
          type="password"
          className="border p-2 w-full rounded"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          required
        />

        <button type="submit" className="bg-black text-white p-2 w-full rounded">
          Sign Up
        </button>

        <p className="text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}


