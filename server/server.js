const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const { convertWordFiles } = require("convert-multiple-files-ul");
const path = require("path");
// const { spawn } = require("child_process");

// Convert docx to pdf format
async function docx2pdf(filePath) {
  if (!fs.existsSync("./output")) {
    fs.mkdirSync("./output");
  }
  if (!fs.existsSync("./output/pdf_single")) {
    fs.mkdirSync("./output/pdf_single");
  }
  const pathOutput = await convertWordFiles(
    path.resolve(__dirname, filePath),
    "pdf",
    path.resolve(__dirname, "./output/pdf_single/")
  );
  console.log(pathOutput);
}

// Split single pdf to seperate pdf
async function splitPDF(inputPath) {
  const pdfBuffer = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(pdfBuffer);

  if (!fs.existsSync("./output/pdf_split")) {
    fs.mkdirSync("./output/pdf_split");
  }

  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const newPdfDoc = await PDFDocument.create();
    const [page] = await newPdfDoc.copyPages(pdfDoc, [i]);
    newPdfDoc.addPage(page);

    const outputPath = `./output/pdf_split/page_${i + 1}.pdf`;
    const newPdfBytes = await newPdfDoc.save();
    fs.writeFileSync(outputPath, newPdfBytes);
    console.log(`Page ${i + 1} saved as ${outputPath}`);
  }
}

// Convert all seperated pdf to docx format
// async function pdf2docx() {
//   const pythonScript = "convert_pdf_to_docx.py";
//   const pythonArgs = [];

//   const pythonProcess = spawn("python", [pythonScript, ...pythonArgs]);

//   pythonProcess.stdout.on("data", (data) => {
//     console.log(`Python stdout: ${data}`);
//   });

//   pythonProcess.stderr.on("data", (data) => {
//     console.error(`Python stderr: ${data}`);
//   });

//   pythonProcess.on("close", (code) => {
//     console.log(`Python process exited with code ${code}`);
//   });
// }

docx2pdf("./input/test.docx").then(splitPDF("./output/pdf_single/test.pdf"));
