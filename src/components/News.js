import classes from "./News.module.css";
import Card from "../UI/Card";

const News = (props) => {
  const articlesList = props.articles.map((article, index) => {
    return (
      <Card className={classes.newsCard} key={index}>
        <div className={classes.newsHeadlines}>
          <h4 className={classes.newsTitle}>{article.title}</h4>
          <div className={classes.newsAuthor}>
            <p>{article.author}</p>
            <p>•</p>
            <p>{new Date(article.publishedAt).toLocaleString("en-IN")}</p>
          </div>
          <p>{article.description}</p>
        </div>
        <div
          className={classes.newsImage}
          style={{
            backgroundImage: `url(${article.urlToImage}), url(https://www.mauchampions.com/wp-content/uploads/2017/04/default-image-620x600.jpg)`,
          }}
        ></div>
      </Card>
    );
  });
  return <div className={classes.news}>{articlesList}</div>;
};

export default News;
