import { useTimer } from 'react-timer-hook';

interface Props {
    expiryTimestamp: Date;
}

const numberFormat = (n: number): string => {
    if (n < 9) {
        return `0${n}`;
    }
    return n.toString();
};

export const Timer: React.FC<Props> = ({ expiryTimestamp }) => {
    const { minutes, seconds, start, pause } = useTimer({
        autoStart: false,
        expiryTimestamp,
    });

    return (
        <>
            {numberFormat(minutes)}:{numberFormat(seconds)}
            <button onClick={start}>start</button>
            <button onClick={pause}>pause</button>
            {/* <button onClick={restart}>restart</button> */}
        </>
    );
};
