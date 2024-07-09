import './App.css';

function App() {
  return (
    <div className="container">
      <div className="header">
        <div className='nama-tim'>Nama Tim: SAFINAH-ONE PT: GAMANTARAY</div>
        <div className='lintasan'>Lintasan: .... ( A / B )</div>
      </div>
      <div className="content">
        <div className="position-log">
          <div className='log-tittle'>Position-Log</div>
          <ol>
            <li>Preparation</li>
            <li>Start</li>
            <li>Floating ball set 1-10</li>
            <li>Mission Surface Imaging </li>
            <li>Mission Underwater Imaging </li>
            <li>Finish</li>
          </ol>
        </div>
        <div className="scores">
          <div className="score">4</div>
          <div className="score">5</div>
        </div>
      </div>
      <div className="attitudes">
        <div className="attitudeinfo">
          <div className='attitude-tittle'>Attitude Information</div>
          <ul>
            <li>Trajectory graph (mapping)</li>
            <li>SOG</li>
            <li>COG</li>
          </ul>
        </div>
        <div className="attitude">Attitude</div>
      </div>
      <div className="other-indicators">
        <div>Indikator Lain (bebas):</div>
        <ul>
          <li>Battery Level</li>
          <li>Visual Video</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
