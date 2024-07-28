import React, {useState, useEffect} from "react";
import Container from "@/Container.tsx";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const ComingSoon: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date("2024-12-31T00:00:00").getTime(); // Set your target date here

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({days, hours, minutes, seconds});
            } else {
                clearInterval(interval);
                setTimeLeft({days: 0, hours: 0, minutes: 0, seconds: 0});
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Container>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mb-8">Coming <span className="text-[#e0551b]">Soon!</span></h1>
                <div className="flex space-x-4">
                    <TimeBlock value={timeLeft.days} label="Days"/>
                    <TimeBlock value={timeLeft.hours} label="Hours"/>
                    <TimeBlock value={timeLeft.minutes} label="Minutes"/>
                    <TimeBlock value={timeLeft.seconds} label="Seconds"/>
                </div>
                <p className="mt-8 text-sm text-[#e0551b] font-bold">Stay tuned for something amazing!</p>
            </div>
        </Container>
    );
};

interface TimeBlockProps {
    value: number;
    label: string;
}

const TimeBlock: React.FC<TimeBlockProps> = ({value, label}) => (
    <div className="flex flex-col items-center">
        <div className="text-4xl font-bold bg-white p-4 rounded-lg shadow">
            {value.toString().padStart(2, "0")}
        </div>
        <span className="mt-2 text-sm">{label}</span>
    </div>
);

export default ComingSoon;
