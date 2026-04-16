// utils/parsers.js

import Papa from "papaparse";
import ExcelJS from "exceljs";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;



// ─── PDF Parser ───────────────────────────────────────────────────────────────
export async function parsePDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n";
  }
  return fullText.trim();
}

// ─── Leads Normalizer ─────────────────────────────────────────────────────────
// Accepts rows with any casing: email/Email/EMAIL, name/Name/Recruiter Name etc.
function normalizeRows(rows) {
  return rows
    .map((row) => {
      const keys = Object.keys(row);
      const emailKey = keys.find((k) => k.trim().toLowerCase() === "email");
      const nameKey = keys.find((k) =>
        ["name", "recruiter name", "recruitername", "hr name", "contact"].includes(k.trim().toLowerCase())
      );
      const email = emailKey ? row[emailKey]?.toString().trim() : null;
      const name = nameKey ? row[nameKey]?.toString().trim() : null;
      return { name: name || null, email: email || null };
    })
    .filter((r) => r.email && r.email.includes("@"));
}

// ─── CSV Parser ───────────────────────────────────────────────────────────────
export function parseCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(normalizeRows(results.data)),
      error: (err) => reject(err),
    });
  });
}

// ─── Excel Parser ─────────────────────────────────────────────────────────────

export async function parseExcel(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    const worksheet = workbook.worksheets[0];

    const rows = [];
    let headers = [];

    worksheet.eachRow((row, rowNumber) => {
      const values = row.values;

      // First row = headers
      if (rowNumber === 1) {
        headers = values.slice(1); // remove empty first element
      } else {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index + 1];
        });
        rows.push(obj);
      }
    });

    return normalizeRows(rows);
  } catch (err) {
    throw err;
  }
}

// ─── Auto-detect and parse ────────────────────────────────────────────────────
export async function parseLeadsFile(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  if (ext === "csv") return parseCSV(file);
  if (ext === "xlsx" || ext === "xls") return parseExcel(file);
  throw new Error("Unsupported file type. Please upload a CSV or Excel file.");
}