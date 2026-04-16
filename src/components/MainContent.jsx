import { useState, useEffect, useRef } from "react";
import { generateEmail, improveTone } from "../services/emailApi";

function RefreshIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>;
}
function StarIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
}
function ToneIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>;
}
function EditIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
}
function SaveIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>;
}
function XIcon() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
}
function CheckIcon() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
}
function Spinner() {
  return <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" /></svg>;
}
function SendIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>;
}
function PlayIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>;
}
function StopIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>;
}
function FilterIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>;
}

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function CircleProgress({ sent, total }) {
  const safeSent = sent || 0;
  const safeTotal = total || 0;
  const offset = safeTotal > 0 ? CIRCUMFERENCE * (1 - safeSent / safeTotal) : CIRCUMFERENCE;
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="#e5e7eb" strokeWidth="10" />
      <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="url(#grad)" strokeWidth="10"
        strokeDasharray={CIRCUMFERENCE} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 70 70)"
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>
      <text x="70" y="62" textAnchor="middle" fontSize="26" fontWeight="700" fill="#111827">{safeSent}</text>
      <text x="70" y="80" textAnchor="middle" fontSize="10" fill="#9ca3af" letterSpacing="0.5">
        {safeTotal > 0 ? `OF ${safeTotal} SENT` : "NO LEADS"}
      </text>
    </svg>
  );
}

const STATUS_STYLES = {
  Sent:    { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", icon: "✓" },
  Bounced: { bg: "bg-red-50",   text: "text-red-500",   border: "border-red-200",   icon: "✕" },
  Pending: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", icon: "⏳" },
  Sending: { bg: "bg-blue-50",  text: "text-blue-600",  border: "border-blue-200",  icon: "↑" },
};

function HighlightedBody({ text }) {
  const parts = text.split(/(\{\{[^}]+\}\})/g);
  return (
    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
      {parts.map((part, i) =>
        /^\{\{.*\}\}$/.test(part)
          ? <span key={i} className="text-indigo-500 font-medium">{part}</span>
          : part
      )}
    </p>
  );
}

function ErrorBanner({ message, onDismiss }) {
  return (
    <div className="mx-5 mb-3 flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0 mt-0.5">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <p className="text-xs text-red-500 flex-1">{message}</p>
      <button onClick={onDismiss} className="text-red-300 hover:text-red-500"><XIcon /></button>
    </div>
  );
}

function NoResumeWarning() {
  return (
    <div className="mx-5 mb-3 flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2.5">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <p className="text-xs text-amber-600">Upload your resume on the left to generate a personalized email.</p>
    </div>
  );
}

// Swap {{placeholders}} with real lead data
function personalizeEmail(template, lead) {
  return template
    .replace(/\{\{RecruiterName\}\}/gi, lead.name || "there")
    .replace(/\{\{Company\}\}/gi, lead.company || "your company")
    .replace(/\{\{YourName\}\}/gi, "{{YourName}}"); // keep sender placeholder
}

function personalizeSubject(subject, lead) {
  return subject
    .replace(/\{\{RecruiterName\}\}/gi, lead.name || "there")
    .replace(/\{\{Company\}\}/gi, lead.company || "your company");
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function MainContent({ resumeText = "", campaignDetails = {}, leads = [] , resumeFile = null}) {
  const [delay, setDelay] = useState(45);
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editDraft, setEditDraft] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  // Campaign state
  const [isSending, setIsSending] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [activityLog, setActivityLog] = useState([]);
  const stopRef = useRef(false);
  const currentIndexRef = useRef(0);

  const isFirstRender = useRef(true);
  const hasEmail = !!emailBody;
  const hasResume = resumeText.trim().length > 50;
  const hasLeads = leads.length > 0;
  const { targetRole = "", tone = "Professional", experience = "Senior", companyFocus = "", extraInstructions = "" } = campaignDetails;


  const callGenerate = async (action , overrideDetails = {}) => {
    if (!hasResume) return;
    setIsEditing(false);
    setLoading(true);
    setActiveAction(action);
    setError(null);
    try {
      const result = await generateEmail({
      resumeText,
      targetRole:        overrideDetails.targetRole        ?? targetRole,
      tone:              overrideDetails.tone              ?? tone,
      experience:        overrideDetails.experience        ?? experience,
      companyFocus:      overrideDetails.companyFocus      ?? companyFocus,
      extraInstructions: overrideDetails.extraInstructions ?? extraInstructions,
      });
      setSubject(result.subject);
      setEmailBody(result.body);
      setSaved(false);
    } catch (err) {
      setError(err.message || "Failed to generate email. Please try again.");
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };

  const getResumeBase64 = (file) => new Promise((resolve) => {
  if (!file) return resolve(null);
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result.split(",")[1]);
  reader.readAsDataURL(file);
  });

  const callImproveTone = async () => {
    if (!emailBody) return;
    setLoading(true);
    setActiveAction("tone");
    setError(null);
    try {
      const result = await improveTone({ body: emailBody, tone });
      setEmailBody(result.body);
      setSaved(false);
    } catch (err) {
      setError(err.message || "Failed to improve tone.");
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    if (hasEmail && hasResume) callGenerate("regenerate" , campaignDetails);
  }, [campaignDetails]);

  const startEditing = () => { setEditDraft(emailBody); setIsEditing(true); setSaved(false); };
  const handleSave = () => { setEmailBody(editDraft); setIsEditing(false); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const handleCancel = () => { setEditDraft(""); setIsEditing(false); };

  // ─── Send Test Email ──────────────────────────────────────────────────────
  const handleTestEmail = async () => {
    const resumeBase64 = await getResumeBase64(resumeFile);
    if (!hasEmail) return setError("Generate an email template first.");
    try {
      const res = await fetch(`${API_URL}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          to: "test@example.com", // will use logged-in user's email
          subject: subject || "Test Email",
          body: emailBody,
          isTest: true,
          resumeBase64, 
          resumeFileName: resumeFile?.name || "Resume.pdf", 
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setError(null);
      alert("Test email sent to your Gmail inbox!");
    } catch (err) {
      setError(err.message || "Failed to send test email.");
    }
  };

  // ─── Start Campaign ───────────────────────────────────────────────────────
  const handleStartSending = async () => {
  if (!hasEmail) return setError("Generate an email template first.");
  if (!hasLeads) return setError("Upload a leads CSV file first.");

  const resumeBase64 = await getResumeBase64(resumeFile);

  stopRef.current = false;
  setIsSending(true);

  const isResuming = currentIndexRef.current > 0 && currentIndexRef.current < leads.length;

  if (!isResuming) {
    setSentCount(0);
    currentIndexRef.current = 0;
    setActivityLog(leads.map(lead => ({ ...lead, status: "Pending", time: "-" })));
  }

  const startFrom = currentIndexRef.current;

  for (let i = startFrom; i < leads.length; i++) {
  if (stopRef.current) {
    currentIndexRef.current = i;
    break;
  }

  const lead = leads[i];

  setActivityLog(prev => prev.map((l, idx) =>
    idx === i ? { ...l, status: "Sending" } : l
  ));

  const personalizedSubject = personalizeSubject(subject, lead);
  const personalizedBody = personalizeEmail(emailBody, lead);

  try {
    const res = await fetch(`${API_URL}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        to: lead.email,
        subject: personalizedSubject,
        body: personalizedBody,
        resumeBase64,
        resumeFileName: resumeFile?.name || "Resume.pdf",
      }),
    });

    const data = await res.json();
    const status = res.ok ? "Sent" : "Bounced";

    setActivityLog(prev => prev.map((l, idx) =>
      idx === i ? { ...l, status, time: "Just now" } : l
    ));

    if (res.ok) {
      setSentCount(c => c + 1);
      currentIndexRef.current = i + 1; 
    }

  } catch {
    setActivityLog(prev => prev.map((l, idx) =>
      idx === i ? { ...l, status: "Bounced", time: "Just now" } : l
    ));
    currentIndexRef.current = i + 1; 
  }

  if (i < leads.length - 1 && !stopRef.current) {
    await new Promise(r => setTimeout(r, delay * 1000));
  }
  }
  setIsSending(false);
 };

  const handleStop = () => {
    stopRef.current = true;
    setIsSending(false);
  };

  // Color for initials avatar
  const avatarColor = (name = "") => {
    const colors = [
      "bg-indigo-100 text-indigo-600",
      "bg-blue-100 text-blue-600",
      "bg-green-100 text-green-600",
      "bg-amber-100 text-amber-600",
      "bg-red-100 text-red-500",
      "bg-purple-100 text-purple-600",
    ];
    return colors[name.charCodeAt(0) % colors.length];
  };

  const displayActivity = activityLog.length > 0 ? activityLog.slice(0, 5) : [];

  return (
    <div className="flex-1 flex flex-col gap-4 p-3 bg-gray-50 overflow-y-auto">

      {/* Generated Template */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-start justify-between px-5 pt-5 pb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Generated Template</h2>
            <p className="text-xs text-gray-400 mt-0.5">Review and tweak the AI-generated email before sending.</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button onClick={() => callGenerate("regenerate")} disabled={loading || !hasEmail || !hasResume}
              className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 disabled:opacity-40 transition-colors">
              {loading && activeAction === "regenerate" ? <Spinner /> : <RefreshIcon />} Regenerate
            </button>
            <button onClick={() => callGenerate("generate")} disabled={loading || !hasResume}
              className="flex items-center gap-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 rounded-lg px-4 py-2 transition-colors">
              {loading && activeAction === "generate" ? <Spinner /> : <StarIcon />} Generate New
            </button>
            {hasEmail && (
              <button onClick={callImproveTone} disabled={loading}
                className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 disabled:opacity-40 transition-colors">
                {loading && activeAction === "tone" ? <Spinner /> : <ToneIcon />} Improve Tone
              </button>
            )}
          </div>
        </div>

        {!hasResume && <NoResumeWarning />}
        {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

        <div className="mx-5 mb-4 border border-gray-100 rounded-lg px-4 py-3 bg-gray-50">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Subject Line</p>
          <input type="text" value={subject} onChange={e => setSubject(e.target.value)}
            className="w-full text-sm font-semibold text-gray-900 bg-transparent focus:outline-none placeholder-gray-300"
            placeholder="Subject line will appear after generating..." />
        </div>

        {loading && (
          <div className="mx-5 mb-5 h-28 flex flex-col items-center justify-center gap-2 rounded-lg bg-indigo-50 border border-dashed border-indigo-200">
            <svg className="animate-spin text-indigo-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
            </svg>
            <p className="text-xs text-indigo-400 font-medium">
              {activeAction === "tone" ? "Improving tone..." : "Regenerating with new settings..."}
            </p>
          </div>
        )}

        {!loading && hasEmail && (
          <div className="mx-5 mb-5 border border-gray-100 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Email Body</p>
              <div className="flex items-center gap-2">
                {saved && <span className="flex items-center gap-1 text-[11px] text-green-500 font-medium"><CheckIcon /> Saved</span>}
                {isEditing ? (
                  <>
                    <button onClick={handleCancel} className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 border border-gray-200 rounded px-2 py-1 transition-colors"><XIcon /> Cancel</button>
                    <button onClick={handleSave} className="flex items-center gap-1 text-[11px] font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded px-2 py-1 transition-colors"><SaveIcon /> Save</button>
                  </>
                ) : (
                  <button onClick={startEditing} className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-700 border border-gray-200 rounded px-2 py-1 hover:bg-white transition-colors"><EditIcon /> Edit</button>
                )}
              </div>
            </div>
            <div className="px-4 py-3">
              {isEditing ? (
                <>
                  <textarea value={editDraft} onChange={e => setEditDraft(e.target.value)} rows={12} autoFocus
                    className="w-full text-sm text-gray-700 leading-relaxed resize-none focus:outline-none bg-transparent" />
                  <p className="text-[11px] text-gray-300 text-right mt-1">{editDraft.length} characters</p>
                </>
              ) : (
                <HighlightedBody text={emailBody} />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom row */}
      <div className="flex gap-4">

        {/* Launch Campaign */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 w-[320px] flex-shrink-0 justify-center flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Launch Campaign</h3>
            {hasLeads && (
              <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                {leads.length} leads
              </span>
            )}
          </div>

          {/* Circle progress with real data */}
          <div className="flex justify-center">
            <CircleProgress sent={sentCount} total={leads.length} />
          </div>

          {/* No leads warning */}
          {!hasLeads && (
            <p className="text-xs text-center text-gray-400">Upload a CSV file to load your leads</p>
          )}

          {/* Sending delay */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Sending Delay</span>
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{delay} seconds</span>
            </div>
            <input type="range" min="10" max="120" step="5" value={delay}
              onChange={e => setDelay(Number(e.target.value))}
              disabled={isSending}
              className="w-full accent-indigo-600 disabled:opacity-40" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Fast (10s)</span><span>Safe (120s)</span>
            </div>
          </div>

          {/* Send Test Email */}
          <button
            onClick={handleTestEmail}
            disabled={isSending || !hasEmail}
            className="w-full flex items-center justify-center gap-2 text-sm text-gray-700 border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            <SendIcon /> Send Test Email
          </button>

          {/* Start / Stop Sending */}
          {isSending ? (
            <button
              onClick={handleStop}
              className="w-full flex items-center justify-center gap-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg py-2.5 font-medium transition-colors"
            >
              <StopIcon /> Stop Sending
            </button>
          ) : (
            <button
              onClick={handleStartSending}
              disabled={!hasEmail || !hasLeads || loading}
              className="w-full flex items-center justify-center gap-2 text-sm text-white bg-gray-900 hover:bg-gray-700 disabled:opacity-40 rounded-lg py-2.5 font-medium transition-colors"
            >
              <PlayIcon />
              {sentCount > 0 && sentCount < leads.length ? "Resume Sending" : "Start Sending"}
            </button>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">Recent Activity</h3>
              {isSending && (
                <p className="text-[11px] text-indigo-500 mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse inline-block" />
                  Sending in progress...
                </p>
              )}
            </div>
            <button className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
              <FilterIcon /> Filter
            </button>
          </div>

          {displayActivity.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center py-8">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              <p className="text-sm text-gray-400">No activity yet</p>
              <p className="text-xs text-gray-300">Start sending to see results here</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-[1fr_120px_100px] text-xs font-medium text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-100 px-1">
                <span>Recipient</span><span className="text-center">Status</span><span className="text-right">Time</span>
              </div>
              <div className="flex flex-col divide-y divide-gray-50">
                {displayActivity.map((row, i) => {
                  const s = STATUS_STYLES[row.status] || STATUS_STYLES.Pending;
                  const initial = (row.name || row.email || "?")[0].toUpperCase();
                  return (
                    <div key={i} className="grid grid-cols-[1fr_120px_100px] items-center py-3 px-1">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${avatarColor(row.name || row.email)}`}>
                          {initial}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{row.name || "—"}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[140px]">{row.email}</p>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${s.bg} ${s.text} ${s.border}`}>
                          {row.status === "Sending" ? <Spinner /> : s.icon} {row.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 text-right">{row.time}</p>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {activityLog.length > 5 && (
            <div className="mt-auto pt-4 border-t border-gray-100">
              <button className="text-sm text-indigo-500 hover:text-indigo-700 font-medium transition-colors">
                View All Logs ({activityLog.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}