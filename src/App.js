import { Fragment, useEffect, useRef, useState } from "react";
import classes from "./App.module.css";

import Tag from "./UI/Tag";
import Search from "./UI/Search";
import News from "./components/News";
import Category from "./components/Category";
import Loader from "./UI/Loader";

import useHttp from "./hooks/use-http";

function App() {
  const searchRef = useRef();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isAddCategory, setIsAddCategory] = useState(false);
  const [allTags, setAllTags] = useState([
    {
      title: "Tech Crunch",
      isSelected: true,
    },
  ]);

  const { sendRequest: fetchNews } = useHttp([]);

  useEffect(() => {
    getNewsHandler();
  }, []);

  const addTagHandler = () => {
    if (allTags.length < 5) {
      setIsAddCategory(true);
    }
  };

  const closeModalHandler = () => {
    setIsAddCategory(false);
  };

  const modifyArticles = (articles) => {
    setArticles(articles);
  };

  const getNewsHandler = (tag = "Tech Crunch") => {
    setIsLoading(true);
    const existingTags = allTags
      .map((el) =>
        Object.values(el).filter((el) => el !== false && el !== true)
      )
      .flat();

    if (
      allTags.length < 5 &&
      !existingTags.includes(tag) &&
      tag !== "Tech Crunch"
    ) {
      setAllTags((prevState) => {
        const modifiedTags = prevState.map((prevTag) => {
          return { title: prevTag.title, isSelected: false };
        });
        return [...modifiedTags, { title: tag, isSelected: true }];
      });
    } else if (existingTags.includes(tag)) {
      setAllTags((prevState) => {
        const modifiedTags = prevState.map((prevTag) => {
          if (prevTag.title !== tag) {
            return { title: prevTag.title, isSelected: false };
          } else {
            return { title: prevTag.title, isSelected: true };
          }
        });
        return [...modifiedTags];
      });
    }

    const newsData = (data) => {
      setArticles(data.articles);
      setFilteredArticles(data.articles);
      setIsLoading(false);
    };

    fetchNews(
      {
        url: "https://newsapi.org/v2/everything",
        sources: tag,
      },
      newsData
    );
  };

  const searchInputHandler = () => {
    const searchTerm = searchRef.current.value;
    const filteredArticles = articles.filter((article) => {
      console.log("....", article);
      if (
        (article.title && article.title.includes(searchTerm)) ||
        (article.author && article.author.includes(searchTerm)) ||
        (article.description && article.description.includes(searchTerm))
      ) {
        return article;
      }
    });
    setFilteredArticles(filteredArticles);
  };

  const TagsList = allTags.map((tag, index) => {
    return (
      <Tag
        title={tag.title}
        isSelected={tag.isSelected}
        key={index}
        onClick={() => getNewsHandler(tag.title)}
      />
    );
  });

  return (
    <div className={classes.main}>
      <h1 className={classes.heading}>News Today</h1>

      <div className={classes.tags}>
        {TagsList}
        <Tag title="+" onClick={addTagHandler} />
      </div>

      <div className={classes.search}>
        <Search
          isIconVisible={true}
          placeholderText="Search for keywords, author"
          ref={searchRef}
          onChange={searchInputHandler}
        />
      </div>

      {!isLoading && <News articles={filteredArticles} />}
      {isLoading && (
        <div className={classes.styleLoader}>
          <Loader />
        </div>
      )}

      {isAddCategory && (
        <Category
          onCloseModalHandler={closeModalHandler}
          onArticleChange={modifyArticles}
          onAddToTagsList={getNewsHandler}
        />
      )}
    </div>
  );
}

export default App;
