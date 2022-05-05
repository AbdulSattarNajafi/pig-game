import classes from "./CurrentScore.module.css";

const CurrentScore = (props) => {
  return (
    <div className={classes.current}>
      <p className={classes["current-label"]}>Current</p>
      <p className={classes["current-score"]}>{props.score}</p>
    </div>
  );
};

export default CurrentScore;
