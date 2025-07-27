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
      { breakpoint: 1700, settings: { slidesToShow: 7 } },
      { breakpoint: 1600, settings: { slidesToShow: 6 } },
      { breakpoint: 1400, settings: { slidesToShow: 5 } },
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 980, settings: { slidesToShow: 4 } },
      { breakpoint: 760, settings: { slidesToShow: 3 } },
      { breakpoint: 560, settings: { slidesToShow: 2 } }
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
