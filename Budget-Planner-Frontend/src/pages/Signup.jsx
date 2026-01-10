import { useState } from "react";
import { signup } from "../hooks/useAuthService";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
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
      const res = await signup({ email: form.email, password: form.password });
      login({ email: form.email });
      alert("Signup successful");
      navigate("/income"); // redirect after signup
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="p-6 max-w-sm w-full bg-white shadow-md rounded space-y-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

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


