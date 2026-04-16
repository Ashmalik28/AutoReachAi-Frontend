// src/services/emailApi.js

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}

// Generate a fresh email from resume + campaign settings
export async function generateEmail({ resumeText, targetRole, tone, experience, companyFocus, extraInstructions }) {
  const res = await fetch(`${BASE}/api/generate-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeText, targetRole, tone, experience, companyFocus, extraInstructions }),
  });
  return handleResponse(res); // returns { subject, body }
}

// Generate a personalized email for one specific lead
export async function generateEmailForLead({ resumeText, targetRole, tone, experience, companyFocus, extraInstructions, recruiterName, company }) {
  const res = await fetch(`${BASE}/api/generate-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeText, targetRole, tone, experience, companyFocus, extraInstructions, recruiterName, company }),
  });
  return handleResponse(res); // returns { subject, body }
}

// Rewrite existing email body with a different tone
export async function improveTone({ body, tone }) {
  const res = await fetch(`${BASE}/api/improve-tone`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body, tone }),
  });
  return handleResponse(res); // returns { body }
}