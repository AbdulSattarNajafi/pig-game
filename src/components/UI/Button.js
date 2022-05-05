import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={classes.button}
      disabled={props.disabled}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
