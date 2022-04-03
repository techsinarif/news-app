import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './ImageCarousel.scss';

const ImageCarousel = (props) => {
  const {data} = props;

  return (
    <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} swipeable={true} stopOnHover={true}>
      {
        Object.values(data)?.map((article, index) => (
          <div key={index}>
            <div className='img-container' style={{backgroundImage: `url(${article?.urlToImage})`}}></div>
            <p className="legend">{article?.title}</p>
          </div>
        ))
      }
    </Carousel>
  )
};

export default ImageCarousel;