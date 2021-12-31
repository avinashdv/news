import React from "react";

import { Fragment } from "react";
import classes from "./Search.module.css";
import SearchIcon from "../assets/SearchIcon";

const Search = React.forwardRef((props, ref) => {
  return (
    <Fragment>
      {props.isIconVisible && (
        <span className={classes["search-span"]}>
          <SearchIcon className={classes["i-search"]} />
        </span>
      )}
      <input
        type="search"
        placeholder={props.placeholderText}
        className={props.className}
        onChange={props.onChange}
        ref={ref}
      />
    </Fragment>
  );
});

export default Search;
