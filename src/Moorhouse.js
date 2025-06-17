import HeaderMoorhouse from "./components/HeaderMoorhouse.js";
import './style/moorhouse.css';
import favicon from "./static/map_icon.png";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";

function Moorhouse() {
  const [pdfUrls, setPdfUrls] = useState([]);

  useEffect(() => {
    async function fetchDocuments() {
      const response = await fetch('http://localhost:3001/api/documents', {
        method: 'POST',
      });

      const data = await response.json();

      const urls = [];
      let num = 0;
      for (const file of data[2]) {
        const response_fetch = await fetch('http://localhost:3001/api/contents/moorhouse_noticeboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ file_name: file })
        });

        const urlFile = await response_fetch.json();
        urls.push(urlFile.url);
      };
      setPdfUrls(urls);
    }

    fetchDocuments();
  }, []);

  useEffect(() => {
    async function refreshNoticeBoard() {
      const response = await fetch('http://localhost:3001/api/refresh', {
        method: 'GET',
      });

      if (!response.ok) {
        alert("Error getting response from /api/refresh");
      }
    }

    setTimeout(async () => {
      await refreshNoticeBoard();

      window.location.reload();
    }, 60000);
  }, []);
  
  return (
    <>
      <HeaderMoorhouse />
      <div style={{ display: 'flex' }}>
        <div
          id="documents_container"
          style={{
            padding: '100px',
            width: '90%',
            paddingTop: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            overflowY: 'auto',
            height: '1600px',
            scrollbarWidth: 'none'
          }}
        >
          {pdfUrls.map((url, index) => (
            <div key={index}>
              <PDFCanvas url={url} />
            </div>
          ))}
        </div>
        <div
          style={{
            width: '200px',
            position: 'absolute',
            right: 0,
            display: 'flex',
            alignContent: 'center',
            paddingRight: '40px',
            textAlign: 'center',
            gap: '40px',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '70%'
          }}
        >
          <a style={{ color: 'black', fontSize: '60px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', height: '200px', width: "200px", border: '4px solid black', cursor: 'pointer', justifyContent: 'center', textDecoration: 'none' }} href="/">BACK</a>
          <img
            src={favicon}
            style={{ border: '4px solid black', textDecoration: 'none', cursor: 'pointer', backgroundColor: 'black' }}
            width="200"
            height="200"
            onClick={() => (window.location.href = '/moorhouse_map')}
            alt="Map Icon"
          />
        </div>
      </div>
    </>
  );
}

function PDFCanvas({ url }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadingTask = getDocument(url);
    loadingTask.promise.then(pdf => {
      pdf.getPage(1).then(page => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const scale = 0.98;
        const viewport = page.getViewport({ scale });

        const outputScale = window.devicePixelRatio || 1;

        canvas.width = viewport.width * outputScale;
        canvas.height = viewport.height * outputScale;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        canvas.style.boxShadow = "5px 5px 5px black";

        context.setTransform(outputScale, 0, 0, outputScale, 0, 0);

        page.render({
          canvasContext: context,
          viewport: viewport
        });
      });
    }).catch(err => {
      console.error("Failed to render PDF:", err);
    });
  }, [url]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        userSelect: 'none',
        pointerEvents: 'none',
        border: '1px solid #ccc'
      }}
    />
  );
}

export default Moorhouse;
