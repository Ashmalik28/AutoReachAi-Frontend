import { useState, useRef, useCallback, useEffect } from "react";
import { parsePDF, parseLeadsFile } from "../utils/parsers";

function PdfIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
    </svg>
  );
}

function TableIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 17.41a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

function Spinner({ color = "text-indigo-400" }) {
  return (
    <svg className={`animate-spin ${color}`} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
    </svg>
  );
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

// ─── Upload Zone ──────────────────────────────────────────────────────────────
function UploadZone({ accept, icon, iconBg, iconColor, title, subtitle, file, onFile, onRemove, badgeLabel, badgeBg, badgeText, progressColor, parsing }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const triggerUpload = (f) => {
    setUploading(true);
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 28;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setUploading(false);
        onFile(f);
      }
      setProgress(Math.min(p, 100));
    }, 100);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) triggerUpload(dropped);
  }, []);

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);
  const handleChange = (e) => {
    const picked = e.target.files[0];
    if (picked) triggerUpload(picked);
    e.target.value = "";
  };
  const handleRemove = (e) => {
    e.stopPropagation();
    setProgress(0);
    setUploading(false);
    onRemove();
  };

  return (
    <div
      onClick={() => !file && !uploading && inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`border border-dashed rounded-lg p-4 flex flex-col items-center text-center transition-all duration-200
        ${!file && !uploading ? "cursor-pointer" : "cursor-default"}
        ${dragging ? "border-indigo-400 bg-indigo-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"}`}
    >
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleChange} />
      <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-2 ${iconBg} ${iconColor}`}>{icon}</div>
      <p className="text-sm font-medium text-gray-700">{title}</p>
      <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>

      {uploading && (
        <div className="mt-3 w-full">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Uploading...</span>
            <span className="text-xs text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-100 ${progressColor}`} style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {file && !uploading && (
        <div className="mt-3 w-full" onClick={e => e.stopPropagation()}>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
            <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${badgeBg}`}>
              <span className={`text-[9px] font-bold ${badgeText}`}>{badgeLabel}</span>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-medium text-gray-700 truncate">{file.name}</p>
              <p className="text-[10px] text-gray-400">{formatSize(file.size)}</p>
            </div>
            <button onClick={handleRemove} className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="w-full mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full w-full rounded-full ${progressColor}`} />
          </div>
          {parsing && (
            <div className="mt-1.5 flex items-center gap-1.5">
              <Spinner />
              <span className="text-[10px] text-indigo-400">Parsing file...</span>
            </div>
          )}
        </div>
      )}

      {!file && !uploading && (
        <p className={`text-[10px] mt-1.5 ${dragging ? "text-indigo-400" : "text-gray-300"}`}>
          {dragging ? "Drop to upload" : "or drag & drop here"}
        </p>
      )}
    </div>
  );
}

// ─── Resume Preview ───────────────────────────────────────────────────────────
function ResumePreview({ text }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mt-2 bg-indigo-50 border border-indigo-100 rounded-lg p-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wider">Resume extracted</span>
        <button onClick={() => setExpanded(!expanded)} className="text-[10px] text-indigo-400 hover:text-indigo-600 transition-colors">
          {expanded ? "Show less" : "Show more"}
        </button>
      </div>
      <p className="text-[11px] text-indigo-700 leading-relaxed whitespace-pre-wrap break-words">
        {expanded ? text : text.slice(0, 200) + (text.length > 200 ? "..." : "")}
      </p>
      <p className="text-[10px] text-indigo-300 mt-1.5">{text.length.toLocaleString()} characters extracted</p>
    </div>
  );
}

// ─── Leads Preview ────────────────────────────────────────────────────────────
function LeadsPreview({ leads }) {
  const preview = leads.slice(0, 4);
  return (
    <div className="mt-2 bg-green-50 border border-green-100 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold text-green-600 uppercase tracking-wider">
          {leads.length} lead{leads.length !== 1 ? "s" : ""} found
        </span>
        {leads.length > 4 && <span className="text-[10px] text-green-400">+{leads.length - 4} more</span>}
      </div>
      <div className="flex flex-col gap-1.5">
        {preview.map((lead, i) => (
          <div key={i} className="flex items-center gap-2 bg-white rounded-md px-2.5 py-1.5 border border-green-100">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <span className="text-[9px] font-semibold text-green-600">
                {(lead.name || lead.email)[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              {lead.name && <p className="text-[11px] font-medium text-gray-700 truncate">{lead.name}</p>}
              <p className="text-[10px] text-gray-400 truncate">{lead.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Error Banner ─────────────────────────────────────────────────────────────
function ErrorBanner({ message, onDismiss }) {
  return (
    <div className="mt-2 flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0 mt-0.5">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <p className="text-[11px] text-red-500 flex-1">{message}</p>
      <button onClick={onDismiss} className="text-red-300 hover:text-red-500 flex-shrink-0">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────
export default function LeftSidebar({ onResumeText, onLeads, onCampaignChange, onResumeFile }) {
  const [pdfFile, setPdfFile] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [leads, setLeads] = useState([]);
  const [parsingPdf, setParsingPdf] = useState(false);
  const [parsingCsv, setParsingCsv] = useState(false);
  const [pdfError, setPdfError] = useState(null);
  const [csvError, setCsvError] = useState(null);

  const [targetRole, setTargetRole] = useState("");
  const [companyFocus, setCompanyFocus] = useState("");
  const [tone, setTone] = useState("Professional");
  const [experience, setExperience] = useState("Senior");
  const [instructions, setInstructions] = useState("");
  const [detailsSaved, setDetailsSaved] = useState(false);
  const [detailsSaved1, setDetailsSaved1] = useState(false);

  // Track if details have unsaved changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [hasUnsavedChangesforInstruction , setHasUnsavedChangesforInstruction] = useState(false);

  const markUnsaved1 = () => {
    setHasUnsavedChangesforInstruction(true);
    setDetailsSaved1(false);
  }

  const markUnsaved = () => {
    setHasUnsavedChanges(true);
    setDetailsSaved(false);
  };

  const handleSaveCampaign = () => {
    onCampaignChange?.({ targetRole, tone, experience, companyFocus, extraInstructions: instructions });
    setDetailsSaved(true);
    setHasUnsavedChanges(false);
    setTimeout(() => setDetailsSaved(false), 3000);
  };

  const handleSaveCampaign1 = () => {
    onCampaignChange?.({ targetRole, tone, experience, companyFocus, extraInstructions: instructions });
    setHasUnsavedChangesforInstruction(false);
    setDetailsSaved1(true);
    setTimeout(() => setDetailsSaved1(false), 3000);
  };

  const handlePdfFile = async (file) => {
    setPdfFile(file);
    setPdfError(null);
    setResumeText("");
    setParsingPdf(true);
    try {
      const text = await parsePDF(file);
      setResumeText(text);
      onResumeFile?.(file);
      onResumeText?.(text);
    } catch {
      setPdfError("Failed to parse PDF. Make sure it's a valid, text-based PDF.");
    } finally {
      setParsingPdf(false);
    }
  };

  const handleCsvFile = async (file) => {
    setCsvFile(file);
    setCsvError(null);
    setLeads([]);
    setParsingCsv(true);
    try {
      const parsed = await parseLeadsFile(file);
      if (parsed.length === 0) {
        setCsvError('No valid leads found. Make sure your file has an "email" column.');
      } else {
        setLeads(parsed);
        onLeads?.(parsed);
      }
    } catch (err) {
      setCsvError(err.message || "Failed to parse file.");
    } finally {
      setParsingCsv(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-85 bg-gray-50 p-3">

      {/* Data Sources */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-900 text-sm">Data Sources</span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">Required</span>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <UploadZone
              accept=".pdf" icon={<PdfIcon />} iconBg="bg-indigo-50" iconColor="text-indigo-400"
              title="Upload Resume (PDF)" subtitle="Drag & drop or click to browse"
              file={pdfFile} onFile={handlePdfFile}
              onRemove={() => { setPdfFile(null); setResumeText(""); setPdfError(null); onResumeText?.(""); }}
              badgeLabel="PDF" badgeBg="bg-red-100" badgeText="text-red-500"
              progressColor="bg-green-400" parsing={parsingPdf}
            />
            {pdfError && <ErrorBanner message={pdfError} onDismiss={() => setPdfError(null)} />}
            {resumeText && !parsingPdf && <ResumePreview text={resumeText} />}
          </div>
          <div>
            <UploadZone
              accept=".csv,.xlsx,.xls" icon={<TableIcon />} iconBg="bg-green-50" iconColor="text-green-500"
              title="Upload Leads (CSV/Excel)" subtitle='Needs "email" column · Max 5,000 rows'
              file={csvFile} onFile={handleCsvFile}
              onRemove={() => { setCsvFile(null); setLeads([]); setCsvError(null); onLeads?.([]); }}
              badgeLabel="CSV" badgeBg="bg-green-100" badgeText="text-green-600"
              progressColor="bg-green-400" parsing={parsingCsv}
            />
            {csvError && <ErrorBanner message={csvError} onDismiss={() => setCsvError(null)} />}
            {leads.length > 0 && !parsingCsv && <LeadsPreview leads={leads} />}
          </div>
        </div>
      </div>

      {/* Campaign Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <p className="font-semibold text-gray-900 text-sm mb-3">Campaign Details</p>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Target Role</label>
            <input type="text" placeholder="e.g. Senior Frontend Developer" value={targetRole}
              onChange={e => { setTargetRole(e.target.value); markUnsaved(); }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-300" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Company Focus (Optional)</label>
            <input type="text" placeholder="e.g. Tech Startups, Fintech" value={companyFocus}
              onChange={e => { setCompanyFocus(e.target.value); markUnsaved(); }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-300" />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Tone</label>
              <div className="relative">
                <select value={tone} onChange={e => { setTone(e.target.value); markUnsaved(); }}
                  className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300 pr-8">
                  <option>Professional</option><option>Casual</option><option>Formal</option><option>Friendly</option>
                </select>
                <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"><ChevronDown /></div>
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Experience</label>
              <div className="relative">
                <select value={experience} onChange={e => { setExperience(e.target.value); markUnsaved(); }}
                  className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300 pr-8">
                  <option>Senior</option><option>Mid-level</option><option>Junior</option><option>Lead</option>
                </select>
                <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"><ChevronDown /></div>
              </div>
            </div>
          </div>

          {/* Save button */}
          <div className="flex items-center justify-between pt-1">
            {detailsSaved && (
              <span className="text-[11px] text-green-500 flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                Saved — email will regenerate
              </span>
            )}
            {hasUnsavedChanges && !detailsSaved && (
              <span className="text-[11px] text-amber-500">Unsaved changes</span>
            )}
            {!hasUnsavedChanges && !detailsSaved && <span />}
            <button
              onClick={handleSaveCampaign}
              className={`ml-auto text-xs font-medium text-white rounded-lg px-4 py-2 transition-colors
                ${hasUnsavedChanges ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-300 cursor-default"}`}
            >
              Save & Apply
            </button>
          </div>
        </div>
      </div>

      {/* AI Instructions */}
      <div className="bg-white rounded-xl border border-gray-200 p-3 flex flex-col gap-2">
        <textarea placeholder="Add specific instructions for the AI to regenerate mail" value={instructions}
          onChange={e => { setInstructions(e.target.value); markUnsaved1(); }} rows={4}
          className="w-full text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none" />
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
            <PaperclipIcon /> Attach
          </button>
          {hasUnsavedChangesforInstruction && !detailsSaved1 && (
              <span className="text-[11px] text-amber-500">Unsaved changes</span>
          )}
          {detailsSaved1 && (
              <span className="text-xs text-green-500 flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                Saved — email will regenerate
              </span>
            )}
          <button
          onClick={() => {
            handleSaveCampaign1();
            setInstructions(""); 
          }}
          disabled={!instructions.trim()}
          className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white hover:bg-gray-700 disabled:opacity-40 transition-colors"
        >
          <ArrowUpIcon />
        </button>

        </div>
      </div>

    </div>
  );
}