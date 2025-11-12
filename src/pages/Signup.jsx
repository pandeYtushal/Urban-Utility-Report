import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Signup() {
  const { signup } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = signup(form.name, form.email, form.password);
    if (res.success) {
      alert("✅ Signup successful!");
      navigate("/");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgba(19,19,19,0.9)] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-400">Sign Up</h2>
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full mb-3 p-2 rounded-md bg-gray-800 text-white border border-gray-600"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-3 p-2 rounded-md bg-gray-800 text-white border border-gray-600"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-4 p-2 rounded-md bg-gray-800 text-white border border-gray-600"
          required
        />

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 py-2 rounded-md font-semibold"
        >
          Create Account
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-teal-400 hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </form>
    </div>
  );
}
