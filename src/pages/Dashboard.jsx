import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardNav from '../components/DashboardNav';
import LeftSidebar from '../components/LeftSidebar';
import MainContent from '../components/MainContent';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

function Dashboard() {
  const [resumeText, setResumeText] = useState("");
  const [leads, setLeads] = useState([]);
  const [campaignDetails, setCampaignDetails] = useState({
    targetRole: "",
    tone: "Professional",
    experience: "Senior",
    companyFocus: "",
    extraInstructions: "",
  });
  const [resumeFile, setResumeFile] = useState(null);

  const [gmailConnected, setGmailConnected] = useState(false);
  const [gmailEmail, setGmailEmail] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const gmailParam = searchParams.get("gmail");
    const emailParam = searchParams.get("email");

    if (gmailParam === "connected" && emailParam) {
      // Coming back from Google OAuth redirect
      setGmailConnected(true);
      setGmailEmail(decodeURIComponent(emailParam));
      setSearchParams({});
    } else if (gmailParam === "error") {
      console.error("Gmail connection failed");
      setSearchParams({});
    } else {
      // Check existing session on page load
      checkGmailStatus();
    }
  }, []);

  const checkGmailStatus = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/status`, { credentials: "include" });
      const data = await res.json();
      if (data.connected) {
        setGmailConnected(true);
        setGmailEmail(data.email);
      }
    } catch {
      // Server not running yet — fail silently
    }
  };

  const handleGmailDisconnect = async () => {
    try {
      await fetch(`${API_URL}/auth/disconnect`, {
        method: "POST",
        credentials: "include",
      });
    } catch {}
    setGmailConnected(false);
    setGmailEmail("");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardNav
        gmailConnected={gmailConnected}
        gmailEmail={gmailEmail}
        onGmailDisconnect={handleGmailDisconnect}
      />

      <div className="flex w-full pt-16 h-screen overflow-hidden">
        <div className="w-85 shrink-0 h-full overflow-y-auto overflow-x-hidden border-r border-gray-200">
          <LeftSidebar
            onResumeText={setResumeText}
            onLeads={setLeads}
            onCampaignChange={setCampaignDetails}
            onResumeFile={setResumeFile} 
          />
        </div>

        <div className="flex-1 h-full overflow-y-auto">
          <MainContent
            resumeText={resumeText}
            leads={leads}
            campaignDetails={campaignDetails}
            gmailConnected={gmailConnected}
            resumeFile={resumeFile}   
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
