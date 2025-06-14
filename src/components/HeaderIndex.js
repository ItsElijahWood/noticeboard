import './style/header_index.css';

function HeaderIndex() {
  function refreshScreen() {
    window.location.reload();
  }

  return (
    <div className="header">
      &nbsp;&nbsp;Shared Noticeboard
    </div>
  );
}

export default HeaderIndex;
