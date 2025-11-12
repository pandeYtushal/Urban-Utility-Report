import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(form.email, form.password);
    if (res.success) {
      alert("✅ Login successful!");
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
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-400">Login</h2>
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

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
          Log In
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-teal-400 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
