import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchNewsData} from '../Redux/reducers/newsSlice';
import {newsArticles} from '../Redux/selectors';
import NewsList from './NewsList';
import ImageCarousel from './ImageCarousel';
import './News.scss';

const News = () => {
  const dispatch = useDispatch();
  const newsArcles = useSelector(newsArticles);

  useEffect(()=>{
    dispatch(fetchNewsData())
  }, []);

  return (
    <div className='news-container'>
      <div className='' style={{marginTop: '10px'}}>
        <ImageCarousel data={newsArcles}/>
      </div>
      <NewsList data={newsArcles}/>
    </div>
  )
};

export default News;