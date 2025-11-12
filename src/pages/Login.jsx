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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url(/hero.png)" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-teal-900/70 backdrop-blur-sm"></div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl 
                   w-full max-w-sm border border-white/20 
                   hover:shadow-[0_0_25px_rgba(45,212,191,0.3)] transition-all duration-300"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-teal-400">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center animate-pulse">{error}</p>
        )}

        {/* Email Field */}
        <div className="relative mb-6">
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full p-3 rounded-md bg-transparent border text-white 
                        focus:outline-none focus:border-teal-400 peer transition
                        ${form.email ? "border-teal-400" : "border-gray-500"}`}
            required
          />
          <label
            htmlFor="email"
            className={`absolute left-3 text-gray-300 transition-all duration-200 pointer-events-none 
              ${form.email
                ? "-top-2 text-xs text-teal-300 bg-[rgba(20,83,45,0.6)] px-1 rounded"
                : "top-3 text-sm text-gray-400"}`}
          >
            Email
          </label>
        </div>

        {/* Password Field */}
        <div className="relative mb-8">
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={`w-full p-3 rounded-md bg-transparent border text-white 
                        focus:outline-none focus:border-teal-400 peer transition
                        ${form.password ? "border-teal-400" : "border-gray-500"}`}
            required
          />
          <label
            htmlFor="password"
            className={`absolute left-3 text-gray-300 transition-all duration-200 pointer-events-none 
              ${form.password
                ? "-top-2 text-xs text-teal-300 bg-[rgba(20,83,45,0.6)] px-1 rounded"
                : "top-3 text-sm text-gray-400"}`}
          >
            Password
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 py-2 rounded-md font-semibold 
                     text-white shadow-lg transition-all duration-200"
        >
          Log In
        </button>

        <p className="text-gray-300 text-sm text-center mt-5">
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
