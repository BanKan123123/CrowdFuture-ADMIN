// GameGrid.tsx
import { useState, useEffect } from 'react';

const hitSound = new Audio('/sounds/hit.mp3');
const missSound = new Audio('/sounds/miss.mp3');

const gridSize = 25; // 5x5 grid

export default function GameGrid() {
  const [score, setScore] = useState(0);
  const [molePosition, setMolePosition] = useState(-1);
  const [canClick, setCanClick] = useState(true);
  const [speed, setSpeed] = useState(1000);

  useEffect(() => {
    const moveMole = () => {
      const newPosition = Math.floor(Math.random() * gridSize);
      setMolePosition(newPosition);
    };

    moveMole();
    const interval = setInterval(moveMole, speed);
    return () => clearInterval(interval);
  }, [speed]);

  const handleClick = (index: number) => {
    if (index === molePosition && canClick) {
      hitSound.play();
      setScore((prev) => prev + 1);
      setSpeed((prev) => Math.max(400, prev - 50));
      setCanClick(false);
      setTimeout(() => setCanClick(true), 500);
    } else {
      missSound.play();
    }
  };

  const renderGrid = () => {
    return Array(gridSize)
      .fill(null)
      .map((_, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className={`w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center cursor-pointer
            ${index === molePosition ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white hover:bg-gray-50'}`}
        >
          {index === molePosition && (
            <div className="w-6 h-6 rounded-full bg-blue-600 animate-bounce" />
          )}
        </div>
      ));
  };

  return (
    <div>
      <p className="text-xl text-center text-gray-600 mb-2">Mole Game</p>
      <p className="text-sm text-center text-gray-600 mb-2">Điểm: {score}</p>
      <div className="grid grid-cols-5 gap-2 mb-6 p-4 bg-gray-50 rounded-xl shadow-inner">
        {renderGrid()}
      </div>
      <p className="text-sm text-center text-gray-500">Click vào ô xanh để ghi điểm!</p>
    </div>
  );
}
