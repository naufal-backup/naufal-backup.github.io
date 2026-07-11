// Client-only PDF viewer for Next.js
"use client";
import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { useState } from 'react';

export default function PDFViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Responsive: fit width to container, max A4
  const A4_WIDTH = 1200;

  return (
    <Document file={file} loading={<span className='text-white'>Loading PDF...</span>} onLoadSuccess={onDocumentLoadSuccess}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {numPages && Array.from({ length: numPages }, (_, i) => (
          <div key={i + 1} style={{ marginBottom: 10, width: '100%', maxWidth: A4_WIDTH, marginLeft: 'auto', marginRight: 'auto' }}>
            <Page pageNumber={i + 1} width={undefined} />
          </div>
        ))}
      </div>
    </Document>
  );
}