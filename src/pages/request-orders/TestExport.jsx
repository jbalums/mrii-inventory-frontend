import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import FileSaver from "file-saver";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Register fonts for pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Define PDF template
const MyPDFDocument = () => {
	return (
		<Document>
			<Page>
				<View>
					<Text>Hello, world!</Text>
				</View>
			</Page>
		</Document>
	);
};

// Export to PDF function
const exportToPDF = () => {
	const pdfDocGenerator = pdfMake.createPdf(MyPDFDocument);
	pdfDocGenerator.getBlob((blob) => {
		FileSaver.saveAs(blob, "my-document.pdf");
	});
};

// React component
const TestExport = () => {
	return (
		<div>
			<h1>Export to PDF Example</h1>
			<button onClick={exportToPDF}>Export to PDF</button>
		</div>
	);
};

export default TestExport;
