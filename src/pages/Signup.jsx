import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import logo from "../../images/AutoReachLogo.png";
import { FaGoogle } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { CiUser } from "react-icons/ci";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError(friendlyError(err.code));
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="flex w-full justify-center gap-3">
          <img src={logo} alt="AutoReach AI Logo" className="w-48 object-contain" />
        </div>
        <div className="mt-3 w-full flex justify-center mb-3 text-gray-500">
          Automate your job outreach with AI
        </div>

        {/* Tabs */}
        <div className="flex justify-center mt-3 grid-rows-2 mb-6">
          <div className="w-full">
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2 text-base border-b border-gray-300 font-semibold text-gray-500 hover:text-blue-600"
            >
              Login
            </button>
          </div>
          <div className="w-full">
            <button className="w-full py-2 border-b-2 border-blue-600 text-base font-semibold text-blue-600">
              Sign Up
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-xs text-red-500">{error}</p>
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSignup}>

          {/* Full Name */}
          <div className="space-y-2">
            <div>Full Name</div>
            <div className="relative flex justify-center items-center">
              <CiUser className="absolute top-3.5 left-3 font-extrabold text-gray-400" strokeWidth={1.5} size={18} />
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 h-11 bg-gray-100 border-gray-300 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <div>Email Address</div>
            <div className="relative flex justify-center items-center">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 h-11 bg-gray-100 border-gray-300 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <div>Password</div>
            </div>
            <div className="relative flex justify-center items-center">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 h-11 bg-gray-100 border-gray-300 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2 rounded-lg transition"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-xs mt-2 text-gray-500">
          By signing up, you agree to our{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">Terms</span>{" "}
          and{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">Privacy Policy</span>.
        </p>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-xs text-black-400">OR CONTINUE WITH</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Social Login */}
        <div className="flex gap-3 text-sm">
          <button
            onClick={handleGoogleSignup}
            disabled={googleLoading}
            className="flex border w-1/2 gap-2 justify-center items-center border-gray-300 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-60"
          >
            <FaGoogle size={14} color="red" />
            {googleLoading ? "..." : "Google"}
          </button>
          <button
            disabled
            className="flex border w-1/2 gap-2 justify-center items-center border-gray-300 py-2 rounded-lg opacity-50 cursor-not-allowed relative group"
          >
            <FaLinkedin size={14} color="blue" /> LinkedIn
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Coming soon
            </span>
          </button>
        </div>

      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Need help?{" "}
        <span className="text-blue-600 cursor-pointer hover:underline">Contact Support</span>
      </p>
    </div>
  );
};

export default Signup;

function friendlyError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    default:
      return "Something went wrong. Please try again.";
  }
}