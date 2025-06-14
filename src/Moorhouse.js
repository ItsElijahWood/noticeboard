import HeaderMoorhouse from "./components/HeaderMoorhouse.js";
import './style/moorhouse.css';
import favicon from "./static/map_icon.png";
import { useEffect } from "react";

function Moorhouse() {
  useEffect(() => {
    async function fetchDocuments() {
      const response = await fetch('http://localhost:3001/api/documents', {
        method: 'POST',
      });

      const data = await response.json();

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
        num += 1;

        const divdisplay = document.getElementById("documents_container");

        const documents = document.createElement(`img`);
        documents.src = urlFile.url;
        documents.alt = `Document ${num}`;
        const num_for_onclick = num;
        documents.onclick = () => {
          const zoomed_image = document.getElementById(`img-${num_for_onclick}`);
          zoomed_image.style.display = "block";
        };
        documents.width = 570;
        documents.height = 800;
        documents.style.boxShadow = "5px 5px 5px black";

        const zoom_document = document.createElement(`img`);
        zoom_document.src = urlFile.url;
        zoom_document.alt = `Zoomed in document ${num}`;
        zoom_document.id = `img-${num}`;
        zoom_document.style.display = "none";
        zoom_document.style.position = "absolute";
        zoom_document.style.top = "5%";
        zoom_document.style.cursor = "pointer";
        zoom_document.style.left = "31%";
        zoom_document.style.height = "90%";
        zoom_document.onclick = () => {
          zoom_document.style.display = "none";
        }
        zoom_document.style.border = "4px solid black";

        divdisplay.appendChild(documents);
        document.body.appendChild(zoom_document);
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

export default Moorhouse;
