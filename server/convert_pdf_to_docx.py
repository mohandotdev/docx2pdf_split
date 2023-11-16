import os
from pdf2docx import Converter

# Input folder
input_folder = './output/pdf_split'

# Output folder
output_folder = './output/docx_split'

# Ensure the output folder exists
os.makedirs(output_folder, exist_ok=True)

# Iterate through PDF files in the input folder
for filename in os.listdir(input_folder):
    if filename.endswith(".pdf"):
        pdf_file = os.path.join(input_folder, filename)
        # Generate the corresponding output DOCX file path
        docx_file = os.path.join(output_folder, os.path.splitext(filename)[0] + ".docx")

        # Convert each PDF to DOCX
        cv = Converter(pdf_file)
        cv.convert(docx_file)
        cv.close()
        print(f"Converted {pdf_file} to {docx_file}")
