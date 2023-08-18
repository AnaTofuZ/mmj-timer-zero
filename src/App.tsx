// import mmtimer from './assets/mmtimer.mp3';
// import mmtimer2 from './assets/mmtimer2.mp3';
import mmjcd from './assets/mmjcd.png';
import './App.css';
import { Timer } from './Timer';

function App() {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 180);
    const hoge = 1;

    return (
        <>
            <h1>宝灯桃汁3分タイマー</h1>
            <div>
                <a href="https://houtoumomojiru.info/" target="_blank">
                    <img
                        src={mmjcd}
                        className={`logo momojiru ${hoge > 0 ? 'on-play' : ''}`}
                        alt="宝灯桃汁の顔"
                    />
                </a>
            </div>
            <div className="card">
                <p>
                    うううおおおお Edit <code>src/App.tsx</code> and save to
                    test HMR
                </p>
                <Timer expiryTimestamp={expiryTimestamp} />
                <input type="range" min={0} max={100} />
            </div>
            <footer className="footer">
                つくったひと
                <div>
                    <a href="https://twitter.com/home">八雲アナグラ</a>
                </div>
            </footer>
        </>
    );
}

export default App;
