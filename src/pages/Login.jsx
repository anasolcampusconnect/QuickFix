import React, { useState } from "react";
import { X, Mail, Phone, Eye, EyeOff, User, Lock } from "lucide-react";

const LoginPopup = ({ isOpen, onClose, onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [loginType, setLoginType] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const defaultEmail = "user@gmail.com";
  const defaultMobile = "9876543210";
  const defaultPassword = "user@123";
  const [fullName, setFullName] = useState("");

  const [users, setUsers] = useState([
    {
      name: "QuickFix User",
      email: "user@gmail.com",
      mobile: "9876543210",
      password: "user@123",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      const existingUser = users.find(
        (u) => u.email === email || (mobile && u.mobile === mobile),
      );

      if (existingUser) {
        alert("User already exists");
        return;
      }

      const newUser = {
        name: fullName,
        email,
        mobile,
        password,
      };

      setUsers([...users, newUser]);

      alert("Account Created Successfully 🚀");

      onLogin({
        name: fullName,
        email,
      });

      onClose();

      return;
    }

    const validUser = users.find(
      (u) =>
        ((loginType === "email" && u.email === email) ||
          (loginType === "mobile" && u.mobile === mobile)) &&
        u.password === password,
    );

    if (validUser) {
      onLogin({
        name: validUser.name,
        email: validUser.email,
      });

      onClose();

      alert("Login Successful 🚀");
    } else {
      alert("Invalid Credentials ❌");
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 size-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
          >
            <X className="size-5" />
          </button>

          <h2 className="text-3xl font-bold tracking-tight">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          <p className="text-sm text-white/80 mt-1">
            {isSignup
              ? "Sign up to continue with QuickFix"
              : "Login to continue with QuickFix"}
          </p>
        </div>

        <div className="p-6">
          <div className="flex bg-neutral-100 rounded-2xl p-1 mb-6">
            <button
              onClick={() => setLoginType("email")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition ${
                loginType === "email"
                  ? "bg-white shadow text-indigo-600"
                  : "text-neutral-500"
              }`}
            >
              <Mail className="size-4" />
              Email
            </button>

            <button
              onClick={() => setLoginType("mobile")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition ${
                loginType === "mobile"
                  ? "bg-white shadow text-indigo-600"
                  : "text-neutral-500"
              }`}
            >
              <Phone className="size-4" />
              Mobile
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignup && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-2xl border border-neutral-200 pl-11 pr-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                />
              </div>
            )}

            <div className="relative">
              {loginType === "email" ? (
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
              ) : (
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
              )}

              <input
                type={loginType === "email" ? "email" : "tel"}
                placeholder={
                  loginType === "email"
                    ? "Enter your email"
                    : "Enter mobile number"
                }
                value={loginType === "email" ? email : mobile}
                onChange={(e) =>
                  loginType === "email"
                    ? setEmail(e.target.value)
                    : setMobile(e.target.value)
                }
                className="w-full rounded-2xl border border-neutral-200 pl-11 pr-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-neutral-200 pl-11 pr-12 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            {!isSignup && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold transition shadow-lg shadow-indigo-600/20"
            >
              {isSignup ? "Create Account" : "Login"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-neutral-200 flex-1" />
            <span className="text-xs text-neutral-400">OR</span>
            <div className="h-px bg-neutral-200 flex-1" />
          </div>

          <div className="space-y-3">
            <button className="w-full border border-neutral-200 hover:border-neutral-300 rounded-2xl py-3 text-sm font-medium transition flex items-center justify-center gap-3">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="size-5"
              />
              Continue with Google
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-neutral-500">
            {isSignup ? "Already have an account?" : "Don't have an account?"}

            <button
              onClick={() => setIsSignup(!isSignup)}
              className="ml-1 font-semibold text-indigo-600 hover:text-indigo-700"
            >
              {isSignup ? "Login" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
