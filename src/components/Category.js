import ReactDOM from "react-dom";

import { Fragment } from "react";
import classes from "./Category.module.css";

import ModalOverlay from "./ModalOverlay";

const Backdrop = (props) => {
  return <div className={classes.overlay} onClick={props.onClick}></div>;
};

const Category = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onCloseModalHandler} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onArticleChange={props.onArticleChange}
          onCloseModal={props.onCloseModalHandler}
          onAddToTagsList={props.onAddToTagsList}
        />,
        document.getElementById("overlay")
      )}
    </Fragment>
  );
};

export default Category;
