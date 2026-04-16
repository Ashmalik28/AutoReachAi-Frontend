import { useState } from "react";
import logo from "../../images/AutoReachLogo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const avatar1 = "https://i.pravatar.cc/32?img=1";
const avatar2 = "https://i.pravatar.cc/32?img=2";
const avatar3 = "https://i.pravatar.cc/32?img=3";

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function GmailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" />
      <path d="M2 6l10 7 10-7" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export default function DashboardNav({ gmailConnected = false, gmailEmail = "", onGmailDisconnect }) {
  const [isDark, setIsDark] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleConnectGmail = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-16 border-b border-gray-200 bg-white w-full">

        {/* Left side */}
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-gray-700 p-1 rounded">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <img src={logo} alt="AutoReach AI Logo" className="w-36 object-contain" />
          </div>

          <div className="h-5 w-px bg-gray-200 mx-1" />
          <span className="text-sm text-gray-500">New Campaign Project</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Avatars */}
          <div className="flex -space-x-2">
            {[avatar1, avatar2, avatar3].map((src, i) => (
              <img key={i} src={src} alt={`User ${i + 1}`} className="w-7 h-7 rounded-full border-2 border-white object-cover" />
            ))}
          </div>

          {/* Gmail button */}
          {gmailConnected ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 hover:bg-green-100 transition-colors"
              >
                <CheckCircleIcon />
                <span className="max-w-[140px] truncate">{gmailEmail || "Gmail Connected"}</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 w-52 z-50">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Connected as</p>
                    <p className="text-xs text-gray-700 font-medium truncate mt-0.5">{gmailEmail}</p>
                  </div>
                  <button
                    onClick={() => { setShowDropdown(false); onGmailDisconnect?.(); }}
                    className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Disconnect Gmail
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleConnectGmail}
              className="flex items-center gap-2 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <GmailIcon />
              Connect Gmail
            </button>
          )}

          {/* Theme toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 p-1 rounded-full border border-gray-300 bg-white shadow-sm transition-all duration-200 w-16 relative"
            aria-label="Toggle theme"
          >
            <span className={`absolute top-1 w-6 h-6 rounded-full bg-gray-800 transition-all duration-200 ease-in-out ${isDark ? "left-[calc(100%-1.75rem)]" : "left-1"}`} />
            <span className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full transition-colors duration-200 ${!isDark ? "text-white" : "text-gray-400"}`}>
              <SunIcon />
            </span>
            <span className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full transition-colors duration-200 ${isDark ? "text-white" : "text-gray-400"}`}>
              <MoonIcon />
            </span>
          </button>

      <button
        onClick={handleLogout}
        className="flex items-center gap-1.5 text-xs font-medium text-red-500 border border-red-200 rounded-lg px-3 py-2 hover:bg-red-50 transition-colors"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Logout
      </button>

        </div>
      </nav>

      {/* Close dropdown on outside click */}
      {showDropdown && <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />}

    
      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}