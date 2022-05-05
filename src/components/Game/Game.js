import React, { useState, useReducer } from "react";

import classes from "./Game.module.css";
import Player from "../Player/Player";
import Dice from "../Dice/Dice";
import Modal from "./../UI/Modal";
import Button from "../UI/Button";

// First Player Reducer function
const player1Reducer = (state, action) => {
  switch (action.type) {
    case "PLAYING":
      return {
        score: state.score + action.payload + 1,
        totalScore: state.totalScore,
      };

    case "SWITCH_PLAYER":
      return { score: -1, totalScore: state.totalScore };

    case "HOLD_SCORE":
      return { score: 0, totalScore: state.totalScore + state.score };

    case "NEW_GAME":
      return { score: 0, totalScore: 0 };

    default:
      return { score: 0, totalScore: 0 };
  }
};

// Second Player Reducer function
const player2Reducer = (state, action) => {
  switch (action.type) {
    case "PLAYING":
      return {
        score: state.score + action.payload + 1,
        totalScore: state.totalScore,
      };

    case "SWITCH_PLAYER":
      return { score: -1, totalScore: state.totalScore };

    case "HOLD_SCORE":
      return { score: 0, totalScore: state.totalScore + state.score };

    case "NEW_GAME":
      return { score: 0, totalScore: 0 };

    default:
      return { score: 0, totalScore: 0 };
  }
};

const Game = () => {
  const [playing, setPlaying] = useState(true);
  const [diceNumb, setDiceNumb] = useState(0);

  const [showModal, setShowModal] = useState(true);

  const [player1, dispatchPlayer1] = useReducer(player1Reducer, {
    score: 0,
    totalScore: 0,
  });

  const [player2, dispatchPlayer2] = useReducer(player2Reducer, {
    score: 0,
    totalScore: 0,
  });

  // Roll Dice Function
  const diceHandler = () => {
    const randomNumb = Math.trunc(Math.random() * 6);
    setDiceNumb(randomNumb);
    if (playing) {
      if (randomNumb === 0) {
        dispatchPlayer1({ type: "SWITCH_PLAYER" });
        setPlaying(false);
      }
      dispatchPlayer1({ type: "PLAYING", payload: randomNumb });
    } else {
      if (randomNumb === 0) {
        dispatchPlayer2({ type: "SWITCH_PLAYER" });
        setPlaying(true);
      }
      dispatchPlayer2({ type: "PLAYING", payload: randomNumb });
    }
  };

  // Hold Score Function
  const holdHandler = () => {
    if (playing) {
      dispatchPlayer1({ type: "HOLD_SCORE" });
      setPlaying(false);
    } else {
      dispatchPlayer2({ type: "HOLD_SCORE" });
      setPlaying(true);
    }
  };

  // New Game Function
  const newGameHandler = () => {
    dispatchPlayer1({ type: "NEW_GAME" });
    dispatchPlayer2({ type: "NEW_GAME" });
    setDiceNumb(0);
    setPlaying(true);
    setShowModal(false);
  };

  // Hide Modal Handler
  const modalHandler = () => {
    setShowModal(false);
  };

  const players = [
    {
      id: "pl1",
      name: "Player 1",
      totalScore: player1.totalScore,
      currentScore: player1.score,
      isPlaying: playing ? "inactive" : "",
    },
    {
      id: "pl2",
      name: "Player 2",
      totalScore: player2.totalScore,
      currentScore: player2.score,
      isPlaying: !playing ? "inactive" : "",
    },
  ];

  const winner = players[0].totalScore >= 100;
  const winner2 = players[1].totalScore >= 100;

  const winnerTitle = winner
    ? "Player 1 won the game👏🏼"
    : "Player 2 won the game👏🏼";

  return (
    <section className={classes["game-section"]}>
      {showModal && (
        <Modal onClose={modalHandler}>
          <div className={classes["modal-header"]}>
            <h2>How to play the game?</h2>
          </div>
          <div className={classes["modal-content"]}>
            <p>&bull; Roll the dice.</p>
            <p>
              &bull; If the dice is one the game switches to the next player.
            </p>
            <p>&bull; To hold your scores click on the Hold button.</p>
            <p>&bull; To win the game you should earn a total of 100 scores.</p>
          </div>
          <div className={classes["modal-footer"]}>
            <Button onClick={modalHandler}>Ok</Button>
          </div>
        </Modal>
      )}
      {winner && (
        <Modal>
          <div className={classes["winner-modal"]}>
            <h1>{winnerTitle}</h1>
            <Button onClick={newGameHandler}>New Game</Button>
          </div>
        </Modal>
      )}
      {winner2 && (
        <Modal>
          <div className={classes["winner-modal"]}>
            <h1>{winnerTitle}</h1>
            <Button onClick={newGameHandler}>New Game</Button>
          </div>
        </Modal>
      )}
      {players.map((player) => (
        <Player
          key={player.id}
          playerName={player.name}
          totalScore={player.totalScore}
          currentScore={player.currentScore}
          className={player.isPlaying}
        />
      ))}
      <Dice
        onRollDice={diceHandler}
        onNewGame={newGameHandler}
        onHold={holdHandler}
        diceNumb={diceNumb}
      />
    </section>
  );
};

export default Game;
