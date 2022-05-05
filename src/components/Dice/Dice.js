import Button from "../UI/Button";
import classes from "./Dice.module.css";
import DiceData from "./DiceData";

const Dice = (props) => {
  const { diceNumb, onNewGame, onHold, onRollDice } = props;

  return (
    <div className={classes.dice}>
      <div className={classes.centered}>
        <Button onClick={onNewGame}>🆕 New Game</Button>
        <img
          src={DiceData[diceNumb]}
          className={classes["dice-img"]}
          alt="dice"
        />
      </div>
      <div className={classes.centered}>
        <Button onClick={onRollDice}>🎲 Roll Dice</Button>
        <Button onClick={onHold}>📥 Hold</Button>
      </div>
    </div>
  );
};

export default Dice;
