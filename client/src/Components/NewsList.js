import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Filter from './Filter';
import './NewsList.scss';

const NewsList = (props) => {
  const {data} = props;

  const getDate = (date) => {
    let nwDate = new Date(date);
    let day = nwDate.getDate(); 
    let month = nwDate.getMonth();
    let year = nwDate.getFullYear()
    let dateStr = `${year}-${month}-${day}`;
    return dateStr;
  }

  return (
    <>
      <div>
        <div style={{float: 'left'}}>
          <Typography gutterBottom className='world-news'>
            World news
          </Typography>
        </div>
        <div className='filter-wraper' style={{float: 'right'}}>
          <Filter />
        </div>
      </div>
      <div className='article-list'>
        {
          (data && Object.values(data).length === 0) ? (
            <Typography variant="h5" gutterBottom component="div">
              Article not found for the given filter
            </Typography>
          ) : (
            Object.values(data)?.map((article, index) => (
              <div key={index} className='article'>
                <div className='img' style={{backgroundImage: `url(${article?.urlToImage})`}}></div>
                <div className='source_publish_data'>
                  <Typography paragraph className='source'>{`Source: ${article?.source?.name}`}</Typography>
                  <Typography paragraph className='date'>{`Published: ${getDate(article?.publishedAt)}`}</Typography>
                </div>
                <Typography variant="subtitle1" gutterBottom component="div" className='title'>
                  {article?.title}
                </Typography>
                <Typography variant="body1" gutterBottom component="div" className='description'>
                  {article?.description}
                </Typography>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    window.open(`${article?.url}`)
                  }}
                >
                  Read more
                </Link>
              </div>
            ))
          )
        }
        
      </div>
    </>
  );
};

export default NewsList;
