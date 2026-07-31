// Xuất docs/TAI-LIEU-DU-AN.md → PDF (A4), dùng Chromium của Playwright.
//
// Chạy:  npm run docs:pdf
//
// Cần `marked` (không nằm trong dependencies để khỏi nặng dự án) — lệnh npm script
// đã kèm `npx --yes marked` nên không phải cài sẵn. Playwright đã có trong devDeps;
// nếu chưa tải Chromium thì chạy `npx playwright install chromium` một lần.
// LƯU Ý: sửa nội dung ở file .md rồi chạy lệnh này để PDF khớp lại — đừng sửa PDF tay.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { marked } from "marked";
import { chromium } from "playwright";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "docs/TAI-LIEU-DU-AN.md");
const OUT = join(ROOT, "docs/TAI-LIEU-DU-AN.pdf");

const md = readFileSync(SRC, "utf8");

// Số phiên bản lấy thẳng từ bảng đầu tài liệu để chân trang không bị lệch.
const version = (md.match(/\*\*Phiên bản tài liệu\*\*\s*\|\s*([^|\s]+)/) || [])[1] ?? "";

// Mỗi "# " (heading cấp 1) là một chương → ngắt sang trang mới cho dễ đọc bản in.
marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const id = text
        .toLowerCase()
        .replace(/<[^>]+>/g, "")
        .replace(/[^\p{L}\p{N}]+/gu, "-")
        .replace(/^-|-$/g, "");
      return `<h${depth} id="${id}">${text}</h${depth}>\n`;
    },
  },
});

const body = marked.parse(md, { gfm: true, breaks: false });

const html = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8">
<title>Tài liệu dự án — MTTQ xã Phong Hải</title>
<style>
  @page { size: A4; margin: 18mm 16mm 20mm; }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
    font-size: 10.5pt; line-height: 1.6; color: #1a1a1a; margin: 0;
  }
  h1, h2, h3, h4 { line-height: 1.3; color: #7f1d1d; page-break-after: avoid; }
  /* Chương mới sang trang mới; chương đầu tiên thì không. */
  h1 { font-size: 19pt; margin: 0 0 14px; padding-bottom: 6px;
       border-bottom: 2.5px solid #991b1b; page-break-before: always; }
  h1:first-of-type { page-break-before: avoid; }
  h2 { font-size: 14pt; margin: 22px 0 8px; }
  h3 { font-size: 11.5pt; margin: 18px 0 6px; color: #9a3412; }
  p, li { orphans: 3; widows: 3; }
  p { margin: 0 0 9px; }
  ul, ol { margin: 0 0 10px; padding-left: 20px; }
  li { margin-bottom: 4px; }
  strong { color: #111; }
  code {
    font-family: "SF Mono", Menlo, Consolas, monospace; font-size: 9pt;
    background: #f3f4f6; padding: 1.5px 4px; border-radius: 3px; color: #9d174d;
  }
  pre {
    background: #f8f8f8; border: 1px solid #e5e7eb; border-left: 3px solid #991b1b;
    padding: 10px 12px; border-radius: 3px; overflow-x: auto;
    page-break-inside: avoid; margin: 0 0 12px;
  }
  pre code { background: none; padding: 0; color: #1f2937; font-size: 8.5pt; line-height: 1.45; }
  table {
    border-collapse: collapse; width: 100%; margin: 0 0 14px;
    font-size: 9.5pt; page-break-inside: avoid;
  }
  th, td { border: 1px solid #d1d5db; padding: 6px 9px; text-align: left; vertical-align: top; }
  th { background: #fef2f2; color: #7f1d1d; font-weight: 600; }
  tr:nth-child(even) td { background: #fafafa; }
  blockquote {
    margin: 0 0 12px; padding: 8px 14px; background: #fffbeb;
    border-left: 4px solid #f59e0b; page-break-inside: avoid;
  }
  blockquote p { margin: 0 0 6px; }
  blockquote p:last-child { margin-bottom: 0; }
  hr { border: none; border-top: 1px solid #e5e7eb; margin: 18px 0; }
  a { color: #1d4ed8; text-decoration: none; }
</style></head><body>${body}</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle" });
await page.pdf({
  path: OUT,
  format: "A4",
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: `<div style="font-family:-apple-system,'Helvetica Neue',Arial,sans-serif;font-size:7pt;color:#9ca3af;width:100%;padding:0 16mm;">
    <span style="float:right">Tài liệu dự án — MTTQ xã Phong Hải</span></div>`,
  footerTemplate: `<div style="font-family:-apple-system,'Helvetica Neue',Arial,sans-serif;font-size:7.5pt;color:#6b7280;width:100%;padding:0 16mm;">
    <span>Phiên bản ${version}</span>
    <span style="float:right">Trang <span class="pageNumber"></span>/<span class="totalPages"></span></span>
    </div>`,
  margin: { top: "18mm", bottom: "20mm", left: "16mm", right: "16mm" },
});
await browser.close();
console.log("Đã xuất:", OUT);
