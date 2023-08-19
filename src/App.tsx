import mmtimer from './assets/mmtimer.mp3';
import mmtimer2 from './assets/mmtimer2.mp3';
import mmjcd from './assets/mmjcd.png';
import './App.css';
import React from 'react';
import { Timer } from './Timer';
import { useAudioPlayer } from 'react-use-audio-player';

function App() {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 180);

    const { play, pause, load, stop, paused, stopped, playing, setVolume } =
        useAudioPlayer();

    React.useEffect(() => {
        load(mmtimer, {
            autoplay: false,
        });
    }, [load]);

    const [inputVolume, setInputVolume] = React.useState(100);
    React.useEffect(() => {
        setVolume(inputVolume / 100);
    }, [setVolume, inputVolume]);

    const [isPlayCD, setIsPlayCD] = React.useState(false);

    React.useEffect(() => {
        if (stopped) {
            setIsPlayCD(false);
        }
    }, [stopped]);

    const onMusicPlay = React.useCallback(() => {
        play();
        setIsPlayCD(true);
    }, [play, setIsPlayCD]);

    const onMusicResume = React.useCallback(() => {
        stop();
        setIsPlayCD(false);
    }, [stop, setIsPlayCD]);

    const [isDefaultMusic, setIsDefaultMusic] = React.useState(true);

    const [shouldReset, setShouldReset] = React.useState(false);
    const reset = React.useCallback(() => {
        setShouldReset(false);
    }, [setShouldReset]);

    const onChangeMusic = React.useCallback(() => {
        load(mmtimer, {
            autoplay: false,
        });
        setVolume(inputVolume / 100);
        setIsDefaultMusic(true);
        setShouldReset(true);
    }, [load, setVolume, inputVolume]);

    const onChangeMusic2 = React.useCallback(() => {
        load(mmtimer2, {
            autoplay: false,
        });
        setVolume(inputVolume / 100);
        setIsDefaultMusic(false);
        setShouldReset(true);
    }, [load, setVolume, inputVolume]);

    return (
        <>
            <h1>宝灯桃汁<br className='br-sp'/>3分タイマー</h1>
            <div>
                <a href="https://houtoumomojiru.info/" target="_blank">
                    <img
                        src={mmjcd}
                        className={`logo momojiru 
                        ${isPlayCD ? 'on-play' : ''} 
                        ${paused ? 'on-pause' : ''}`}
                        alt="宝灯桃汁の顔"
                    />
                </a>
            </div>
            <Timer
                expiryTimestamp={expiryTimestamp}
                onMusicPlay={onMusicPlay}
                onMusicPause={pause}
                onMusicResume={onMusicResume}
                isStartDisabled={playing}
                shouldReset={shouldReset}
                reset={reset}
            />
            <div className="card">
                <div>音量</div>
                <input
                    type="range"
                    min={0}
                    max={100}
                    onChange={e =>
                        setInputVolume(Number(e.currentTarget.value))
                    }
                    defaultValue={inputVolume}
                />
                <div>音楽</div>
                <label htmlFor="m1">通常待機BGM</label>
                <input
                    id="m1"
                    type="radio"
                    name="music"
                    value={'m1'}
                    checked={isDefaultMusic}
                    onChange={onChangeMusic}
                />
                <label htmlFor="m2">プレ配信待機BGM</label>
                <input
                    id="m2"
                    type="radio"
                    name="music"
                    value={'m2'}
                    checked={!isDefaultMusic}
                    onChange={onChangeMusic2}
                />
            </div>
            <footer className="footer">
                つくったひと
                <div>
                    <a href="https://twitter.com/AnaTofuZ">八雲アナグラ</a>
                </div>
            </footer>
        </>
    );
}

export default App;
