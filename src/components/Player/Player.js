import classes from "./Player.module.css";
import Card from "../UI/Card";
import CurrentScore from "../UI/CurrentScore";

const Player = (props) => {
  return (
    <Card className={props.className}>
      <h2 className={classes.name}>{props.playerName}</h2>
      <p className={classes.score}>{props.totalScore}</p>
      <CurrentScore score={props.currentScore} />
    </Card>
  );
};

export default Player;
