import HeaderScotbyMap from "./components/HeaderScotbyMap";
import './style/scotby_map.css';
import { useEffect } from "react";

function ScotbyMap() {
  useEffect(() => {
    async function fetchDocuments() {
      const response = await fetch('http://localhost:3001/api/documents', {
        method: 'POST',
      });

      const data = await response.json();

      let num = 0;
      for (const file of data[7]) {
        const response_fetch = await fetch('http://localhost:3001/api/contents/scotby_map', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ file_name: file })
        });

        const urlFile = await response_fetch.json();
        num += 1;

        const divdisplay = document.getElementById("documents_container");

        const documents = document.createElement(`img`);
        documents.src = urlFile.url;
        documents.alt = `Document ${num}`;
        documents.style.width = "95%";
        documents.style.height = "100%";

        divdisplay.appendChild(documents);
      };
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
      <HeaderScotbyMap />
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
            height: '1900px',
            scrollbarWidth: 'none'
          }}
        ></div>
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
          <a style={{ color: 'black', fontSize: '60px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', height: '200px', border: '4px solid black', cursor: 'pointer', justifyContent: 'center', textDecoration: 'none' }} href="/scotby">BACK</a>
        </div>
      </div>
    </>
  );
}

export default ScotbyMap;
