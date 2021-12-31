import classes from "./Tag.module.css";

const Tags = (props) => {
  return (
    <a
      href="#"
      className={classes.key}
      onClick={props.onClick}
      style={{
        backgroundColor: `${props.isSelected ? "#00f0c2" : "#eaeaea"}`,
        color: `${props.isSelected ? "#000000" : "#7e7e7e"}`,
        fontWeight: `${props.isSelected ? "bold" : "normal"}`,
      }}
    >
      {props.title}
    </a>
  );
};

export default Tags;
