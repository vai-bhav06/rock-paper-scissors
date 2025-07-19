import React, { useState } from 'react';
import winSound from './sounds/win.mp3';
import loseSound from './sounds/lose.mp3';
import tieSound from './sounds/tie.mp3';

const choices = [
  { name: 'rock', emoji: '🪨' },
  { name: 'paper', emoji: '📄' },
  { name: 'scissor', emoji: '✂️' }
];

const Game = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const playSound = (type) => {
    const sounds = {
      win: new Audio(winSound),
      lose: new Audio(loseSound),
      tie: new Audio(tieSound),
    };
    sounds[type]?.play();
  };

  const playGame = (player) => {
    setIsLoading(true);
    const computer = choices[Math.floor(Math.random() * choices.length)].name;

    setTimeout(() => {
      setPlayerChoice(player);
      setComputerChoice(computer);

      const outcome = getResult(player, computer);
      setResult(outcome);

      if (outcome === 'You Win!') {
        setScore({ ...score, player: score.player + 1 });
        playSound('win');
      } else if (outcome === 'Computer Wins!') {
        setScore({ ...score, computer: score.computer + 1 });
        playSound('lose');
      } else {
        playSound('tie');
      }

      setIsLoading(false);
    }, 1000); // Delay to simulate "thinking"
  };

  const getResult = (player, computer) => {
    if (player === computer) return "It's a Tie!";
    if (
      (player === 'rock' && computer === 'scissor') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissor' && computer === 'paper')
    ) return 'You Win!';
    return 'Computer Wins!';
  };

  const getEmoji = (choice) => {
    return choices.find((c) => c.name === choice)?.emoji || '';
  };

  const resetGame = () => {
    setPlayerChoice('');
    setComputerChoice('');
    setResult('');
    setIsLoading(false);
  };

  return (
    <div className="game">
      <div className="choices">
        {choices.map((choice) => (
          <button key={choice.name} onClick={() => playGame(choice.name)} disabled={isLoading}>
            {choice.emoji} {choice.name.toUpperCase()}
          </button>
        ))}
      </div>

      {isLoading && <p className="loading">🤖 Computer is thinking...</p>}

      {!isLoading && result && (
        <div className="results animate">
          <p className="highlight">
          🧑 You chose: <span className="emoji">{getEmoji(playerChoice)} {playerChoice}</span>
          </p>
          <p className="highlight">
            🤖 Computer chose: <span className="emoji">{getEmoji(computerChoice)} {computerChoice}</span>
          </p>
          <h2>{result}</h2>
          <button onClick={resetGame}>🔁 Play Again</button>
        </div>
      )}

      <div className="scoreboard">
        <h3>📊 Scoreboard</h3>
        <p>You: {score.player} | Computer: {score.computer}</p>
      </div>
    </div>
  );
};

export default Game;
