import classes from "./Card.module.css";

const Card = (props) => {
  const cardClass = `${classes.card}  ${classes[props.className]}`;
  return <div className={cardClass}>{props.children}</div>;
};

export default Card;
