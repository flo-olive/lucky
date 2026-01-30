import { useState } from 'react';
import './App.css';
import Intro from './components/Intro';
import Bridge from './components/Bridge';
import CardSelection from './components/CardSelection';
import Result from './components/Result';
import btnX from './assets/btn_x.svg';
import cloverSvg from './assets/clover.svg';
import comboDbRaw from './assets/combo-db.csv?raw';
import { parseComboCSV } from './utils/comboParser';

function App() {
  const [screen, setScreen] = useState('intro'); // intro, bridge, selection, result
  const [fortune, setFortune] = useState(null);

  const handleOverlayClose = () => {
    // Default action: reset to intro
    setScreen('intro');
    setFortune(null);
  };

  const startFortune = () => {
    setScreen('bridge');
  };

  const showSelection = () => {
    setScreen('selection');
  };

  const showResult = (selectedFortune) => {
    // Determine Lucky Combo Item
    const comboData = parseComboCSV(comboDbRaw);
    const targetArtist = selectedFortune.music.artist;
    const targetProductCode = selectedFortune.targetProductCode;

    let matches = [];

    // 1. Priority 1: Match by Target Product Code
    if (targetProductCode) {
      matches = comboData.filter(item => item.id === targetProductCode);
    }

    // 2. Priority 2: Match by Artist (if no product code match)
    if (matches.length === 0) {
      matches = comboData.filter(item => 
        item.artist.toLowerCase().includes(targetArtist.toLowerCase()) || 
        targetArtist.toLowerCase().includes(item.artist.toLowerCase())
      );
    }

    // 3. Priority 3: Match by Keyword
    if (matches.length === 0) {
      matches = comboData.filter(item => 
        item.keywords.toLowerCase().includes(targetArtist.toLowerCase())
      );
    }

    // 4. Default: If still no match, use all items
    if (matches.length === 0) {
      matches = comboData;
    }

    // Randomly select one item from matches
    const randomCombo = matches[Math.floor(Math.random() * matches.length)];
    
    setFortune({ ...selectedFortune, combo: randomCombo });
    setScreen('result');
  };

  const reset = () => {
    setScreen('selection');
    setFortune(null);
  };

  const showClovers = screen === 'intro' || screen === 'result';

  return (
    <div className="app-container">
      <button className="overlay-close-btn" onClick={handleOverlayClose} aria-label="Close">
        <span className="close-icon"></span>
      </button>

      {/* Background Clovers — always rendered, visibility controlled by CSS */}
      <img src={cloverSvg} alt="" className={`bg-clover clover-tl ${!showClovers ? 'hidden' : ''}`} />
      <img src={cloverSvg} alt="" className={`bg-clover clover-mr ${!showClovers ? 'hidden' : ''}`} />
      <img src={cloverSvg} alt="" className={`bg-clover clover-bl ${!showClovers ? 'hidden' : ''}`} />
      
      {screen === 'intro' && <Intro onStart={startFortune} />}
      {screen === 'bridge' && <Bridge onNext={showSelection} />}
      {screen === 'selection' && <CardSelection onComplete={showResult} />}
      {screen === 'result' && <Result fortune={fortune} onReset={reset} />}

      {screen === 'result' && (
        <footer className="app-footer">
          <p>본 서비스에서 제공하는 결과는 오락용이며, 실제 사실이나 과학적 근거와는 무관합니다.</p>
        </footer>
      )}
    </div>
  );
}

export default App;
