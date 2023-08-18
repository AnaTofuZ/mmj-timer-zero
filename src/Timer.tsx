import React from 'react';
import { useTimer } from 'react-timer-hook';

const numberFormat = (n: number): string => {
    if (n < 10) {
        return `0${n}`;
    }
    return n.toString();
};

interface NProps {
    n: string;
}
const Minutes: React.FC<NProps> = ({ n }) => {
    return <>{n}</>;
};

interface TimerProps {
    onMusicPlay: () => void;
    onMusicPause: () => void;
    onMusicResume: () => void;
    expiryTimestamp: Date;
    isStartDisabled?: boolean;
    shouldReset: boolean;
    reset: () => void;
}
export const Timer: React.FC<TimerProps> = ({
    onMusicPlay,
    expiryTimestamp,
    onMusicPause,
    onMusicResume,
    isStartDisabled,
    shouldReset,
    reset,
}) => {
    const { minutes, seconds, resume, pause, restart } = useTimer({
        autoStart: false,
        expiryTimestamp,
    });

    const onStart = React.useCallback(async () => {
        await Promise.all([resume(), onMusicPlay()]);
    }, [resume, onMusicPlay]);

    const onPause = React.useCallback(async () => {
        await Promise.all([pause(), onMusicPause()]);
    }, [pause, onMusicPause]);

    const onReplay = React.useCallback(() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 180);
        restart(time);
        pause();
        onMusicResume();
    }, [restart, pause, onMusicResume]);

    React.useEffect(() => {
        if (shouldReset) {
            onReplay();
            reset();
        }
    }, [shouldReset, reset, onReplay]);

    return (
        <>
            <div className="counter">
                <Minutes n={numberFormat(minutes)} />:{numberFormat(seconds)}
            </div>
            <div className="card buttonSound">
                <button onClick={onStart} disabled={isStartDisabled}>
                    <span className="material-symbols-outlined">
                        play_circle
                    </span>
                </button>
                <button onClick={onPause}>
                    <span className="material-symbols-outlined">
                        pause_circle
                    </span>
                </button>
                <button onClick={onReplay}>
                    <span className="material-symbols-outlined">replay</span>
                </button>
            </div>
        </>
    );
};
