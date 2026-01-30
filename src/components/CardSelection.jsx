import React, { useState } from 'react';
import cardBack from '../assets/card_back.png';
import btn2 from '../assets/btn2.png';
import btn3 from '../assets/btn3.png';
import { parseFortuneCSV } from '../utils/csvParser';
import musicDbRaw from '../assets/music-db.csv?raw';

const CardSelection = ({ onComplete }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [currentFortunes] = useState(() => {
        const allFortunes = parseFortuneCSV(musicDbRaw);
        // Shuffle and pick 6 fortunes
        const shuffled = [...allFortunes].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 6);
    });

    const cards = Array.from({ length: 6 }, (_, i) => i);

    const handleCardClick = (id) => {
        if (selectedId === id) {
            setSelectedId(null);
        } else {
            setSelectedId(id);
        }
    };

    const handleSubmit = () => {
        if (selectedId !== null) {
            const selectedFortune = currentFortunes[selectedId];
            onComplete(selectedFortune);
        }
    };

    return (
        <div className="selection-container fade-in">
            <div className="selection-main">
                <h2 className="selection-title">
                    네잎클로버 6장을 찾았어요!<br />
                    느낌이 오는 카드를 선택해보세요
                </h2>

                <div className="card-grid">
                    {cards.map((id) => (
                        <div
                            key={id}
                            onClick={() => handleCardClick(id)}
                            className={`card-wrapper ${selectedId === id ? 'selected' : ''} ${selectedId !== null && selectedId !== id ? 'dimmed' : ''}`}
                        >
                            <div className="card-inner">
                                <img
                                    src={cardBack}
                                    alt="Card Back"
                                    className="selection-card-img"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="selection-bottom">
                <button
                    onClick={handleSubmit}
                    disabled={selectedId === null}
                    className="btn-primary"
                >
                    <img src={selectedId === null ? btn2 : btn3} alt="선택 완료" />
                </button>
            </div>
        </div>
    );
};

export default CardSelection;
