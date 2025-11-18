import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);

    const apiUrl = `https://gnews.io/api/v4/top-headlines?country=${props.country}&category=${props.category}&lang=en&max=${props.pageSize}&apikey=70c5d5f0426a737b9316e8df0d22e6a2`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;

    let data = await fetch(proxyUrl);
    props.setProgress(70);
    let response = await data.json();
    let parsedData = JSON.parse(response.contents);

    setArticles(parsedData.articles || []);
    settotalResults(999);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - Shutter`;
    updateNews();
    // eslint-disable-next-line
  }, [])


 const fetchMoreData = async () => {
  const nextPage = page + 1;
  setPage(nextPage);

  // ← YEH LINE FIX KAR DI – &page=${nextPage} add kiya
  const apiUrl = `https://gnews.io/api/v4/top-headlines?country=${props.country}&category=${props.category}&lang=en&max=${props.pageSize}&page=${nextPage}&apikey=70c5d5f0426a737b9316e8df0d22e6a2`;
  
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;

  try {
    let data = await fetch(proxyUrl);
    let response = await data.json();
    let parsedData = JSON.parse(response.contents);

    if (parsedData.articles && parsedData.articles.length > 0) {
      setArticles(articles.concat(parsedData.articles));
    }
  } catch (err) {
    console.log("No more articles or error:", err);
  }
};

  return (
    <>
      {/* <div className='container my-3'> */}
      <h1 style={{ margin: '35px', marginTop: '90px' }}
        className={`text-center text-${props.mode === 'light' ? 'dark' : 'light'}`}>
        ShutterNews - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < 999}   // ← yeh kar de (999 ya 1000)
        loader={<Spinner />}
      >
        <div className='container'>
          <div className='row'>
            {articles.map((element) => {
              return <div className='col-md-4' key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.image}   // ← YE CHANGE KAR DO
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>


    </>
  )
}

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
