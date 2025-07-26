import Slider from 'react-slick';
const images = import.meta.glob('/src/assets/*.png', { eager: true });

export default function TrendingCarousel({ movies, handleMovieClick }) { 
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 6 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div>
      <Slider {...settings}>
        {movies.map((movie) => {
          const imagePath = images[`/src/assets/${movie.CoverImage}`]?.default;
          return (
            <div key={movie.Id} className='slider-item' onClick={() => handleMovieClick(movie)}>
              <img src={imagePath} alt={movie.Title} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
