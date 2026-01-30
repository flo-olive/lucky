import React from 'react';
import btnSave from '../assets/btn_save.png';
import btnRefresh from '../assets/btn_refresh.png';
import btnShare from '../assets/btn_share.png';
import btnPlay from '../assets/btn_play.png';
import iconNote from '../assets/icon-note.png';
import resultDeco from '../assets/result-deco.png';
import comboTitle from '../assets/combo-title.png';
import comboBadge from '../assets/combo-badge.png';

const Result = ({ fortune, onReset }) => {
    const handleSave = () => {
        // 이미지 저장 로직 (추후 필요시 구현)
        alert('이미지가 저장되었습니다!');
    };

    const handleShare = async () => {
        // 공유할 데이터 설정
        const shareData = {
            title: '오늘의 운세', // 공유 시 제목
            text: '오늘 하루의 운세를 알아보세요', // 공유 시 설명 문구
            url: window.location.href // 현재 페이지 링크
        };

        try {
            // 브라우저가 시스템 공유 기능을 지원하는지 확인
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // 미지원 브라우저(예: 구형 PC 브라우저)일 경우 클립보드 복사로 대응
                await navigator.clipboard.writeText(window.location.href);
                alert('공유 기능이 지원되지 않는 브라우저입니다. 링크가 클립보드에 복사되었습니다!');
            }
        } catch (err) {
            // 사용자가 공유를 취소한 경우 외의 에러 처리
            if (err.name !== 'AbortError') {
                console.error('공유 실패:', err);
            }
        }
    };

    return (
        <div className="result-container fade-in">
            <div className="result-main">
                <div className="flip-card-container">
                    <div className="flip-card revealed">
                        <div className="flip-card-inner">
                            <div className="flip-card-back">
                                <div className="result-header">
                                    <img src={resultDeco} alt="deco" className="result-deco-img" />
                                    <h3 className="result-headline">
                                        {fortune.message}
                                    </h3>
                                </div>

                                <div className="result-content-wrapper">
                                    <div className="result-details-card">
                                        {fortune.luckyItems.map((item, index) => (
                                            <div className="detail-row" key={index}>
                                                <span 
                                                    className="detail-label"
                                                >
                                                    {item.label}
                                                </span>
                                                <span className="detail-value">{item.value}</span>
                                            </div>
                                        ))}
                                        <div className="detail-row music-row">
                                            <span className="detail-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '3px' }}>
                                                오늘의 음악으로 시작해요
                                                <img src={iconNote} alt="note" style={{ width: '15px', height: '15px' }} />
                                            </span>
                                            <div className="music-main-content">
                                                <div className="music-info">
                                                    <span className="detail-value music-title">{fortune.music.title}</span>
                                                    <span className="music-artist">{fortune.music.artist}</span>
                                                </div>
                                                <button className="play-icon-btn">
                                                    <img src={btnPlay} alt="Play" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="result-action-buttons">
                <button onClick={handleSave} className="action-btn">
                    <img src={btnSave} alt="저장하기" />
                </button>
                <button onClick={onReset} className="action-btn">
                    <img src={btnRefresh} alt="다시 뽑기" />
                </button>
                <button onClick={handleShare} className="action-btn">
                    <img src={btnShare} alt="공유하기" />
                </button>
            </div>

            <div 
                className="combo-row" 
                style={{ cursor: 'pointer' }}
                onClick={() => fortune.combo?.link && window.open(fortune.combo.link, '_blank')}
            >
                <div className="combo-image-area">
                    <div 
                        className="combo-img-box" 
                        style={{ 
                            backgroundImage: `url(${fortune.combo?.image})` 
                        }}
                    >
                        <img src={comboBadge} alt="Go" className="combo-badge-icon" />
                    </div>
                </div>
                <div className="combo-info">
                    <img src={comboTitle} alt="LUCKY COMBO ITEM" className="combo-title-img" />
                    <div className="combo-product-name">
                        {fortune.combo?.name}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
