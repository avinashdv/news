import classes from "./ModalOverlay.module.css";
import { useRef, useState } from "react";

import Card from "../UI/Card";
import Search from "../UI/Search";

import useHttp from "../hooks/use-http";

const ModalOverlay = (props) => {
  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredUrlApi, setEnteredUrlApi] = useState("");

  const categoryRef = useRef();
  const apiRef = useRef();

  const { sendRequest: fetchCategoryNews } = useHttp();

  const categoryChangeHandler = () => {
    setEnteredCategory(categoryRef.current.value);
  };

  const apiChangeHandler = () => {
    setEnteredUrlApi(apiRef.current.value);
  };

  const addCategoryHandler = () => {
    if (
      enteredUrlApi.trim().length > 0 &&
      enteredCategory.trim().length > 0 &&
      enteredUrlApi === "https://newsapi.org/v2/everything"
    ) {
      const storeCategoryNews = (data) => {
        props.onArticleChange(data.articles);
      };

      fetchCategoryNews(
        {
          url: enteredUrlApi,
          sources: enteredCategory,
        },
        storeCategoryNews
      );
      props.onAddToTagsList(enteredCategory);
      props.onCloseModal();
    } else {
      alert(
        "Please enter the valid url: \nValid Url: https://newsapi.org/v2/everything"
      );
    }
  };

  return (
    <div className={classes.modal}>
      <Card className={classes.modalContent}>
        <p className={classes.modalHeading}>Add Category</p>

        <Search
          isIconVisible={false}
          placeholderText="Category Name"
          className={classes.categoryInput}
          onChange={categoryChangeHandler}
          ref={categoryRef}
        />
        <br />
        <Search
          isIconVisible={false}
          placeholderText="API URL"
          className={classes.categoryInput}
          onChange={apiChangeHandler}
          ref={apiRef}
        />

        <button className={classes.addBtn} onClick={addCategoryHandler}>
          + Add
        </button>
      </Card>
    </div>
  );
};

export default ModalOverlay;
