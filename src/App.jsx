import { useState, useEffect } from 'react'
import data from './data/data.json';
import './App.css'
import SideBar from './components/sideBar/SideBar'
import TrendingCarousel from './components/trendingCarousel/TrendingCarousel'
import { FaPlay } from "react-icons/fa"

const images = import.meta.glob('/src/assets/*.png', { eager: true });

function App() {
  const [sideBarActive, setSideBarActive] = useState(false);
  const [featuredMovie, setFeaturedMovie] = useState(data.Featured);
  const [showVideoBackground, setShowVideoBackground] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const coverImagePath = images[`/src/assets/${featuredMovie.CoverImage}`]?.default;
  const titleImagePath = images[`/src/assets/${featuredMovie.TitleImage}`]?.default;

  useEffect(() => {
    const trending = data.TendingNow || [];

    // Sort by date descending
    trending.sort((a, b) => new Date(b.Date) - new Date(a.Date));

    // Limit to max 50
    let limitedTrending = trending.slice(0, 50);

    // Load clicked IDs array from sessionStorage
    let clickedIds = [];
    try {
      const stored = sessionStorage.getItem('clickedMovies');
      if (stored) clickedIds = JSON.parse(stored);
    } catch {
      console.log('Error getting data from session storage!')
    }

    // Reorder so clicked IDs come first, in order of clicking
    if (clickedIds.length) {
      const clickedSet = new Set(clickedIds);
      const clickedMovies = [];
      const others = [];

      clickedIds.forEach(id => {
        const found = limitedTrending.find(m => m.Id === id);
        if (found) clickedMovies.push(found);
      });

      limitedTrending.forEach(m => {
        if (!clickedSet.has(m.Id)) others.push(m);
      });

      limitedTrending = [...clickedMovies, ...others];
    }

    setTrendingMovies(limitedTrending);
  }, []);

  function onMovieClick(movie) {
    setVideoLoaded(false);
    setFeaturedMovie(movie);
    setShowVideoBackground(false);

    let clickedIds = [];
    try {
      const stored = sessionStorage.getItem('clickedMovies');
      if (stored) clickedIds = JSON.parse(stored);
    } catch {
      console.log('Error getting data from session storage!')
    }
    clickedIds = clickedIds.filter(id => id !== movie.Id);
    clickedIds.unshift(movie.Id);
    sessionStorage.setItem('clickedMovies', JSON.stringify(clickedIds));

    setTimeout(() => {
      setShowVideoBackground(true);
    }, 2000);
  }

  function formatDuration(secString) {
    const sec = Number(secString);
    if (isNaN(sec)) return "";
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h ? h + 'h ' : ''}${m ? m + 'm ' : ''}${s ? s + 's' : ''}`.trim();
  }


  return (
    <div className='hero-page'>
      <SideBar sideBarActive={sideBarActive} setSideBarActive={setSideBarActive}/>
      <main>
        <div className='featured-movie-container'>
          { !showVideoBackground
            ?
            <img
              src={coverImagePath}
              alt={featuredMovie.Title}
              className='featured-bg-image'
            />
            : (
                <>
                  {!videoLoaded && (
                    <img
                      src={coverImagePath}
                      alt={featuredMovie.Title}
                      className='featured-bg-image'
                    />
                  )}
                  <video
                    src={featuredMovie.VideoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onCanPlay={() => setVideoLoaded(true)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: -2,
                    }}
                  />
                </>
              )
          }
          <div className='featured-movie-info'>
            <h3 className='category'>{featuredMovie.Category}</h3>
            <img className='movie-logo' src={titleImagePath} alt={featuredMovie.Title} />
            <div className='general-info'>
              <p>{featuredMovie.ReleaseYear}</p>
              <p>{featuredMovie.MpaRating}</p>
              <p>{formatDuration(featuredMovie.Duration)}</p>
            </div>
            <p className='movie-description'>{featuredMovie.Description}</p>
            <div className='action-buttons'>
              <button className='play-btn'>
                <span className='play-icon'><FaPlay /></span>
                Play
              </button>
              <button className='info-btn'>More Info</button>
            </div>
          </div>
        </div>
        <div className='trending-now-container'>
          <TrendingCarousel movies={trendingMovies} handleMovieClick={onMovieClick}/>
        </div>
      </main>
      <div className={`gradientBG ${sideBarActive ? 'hover' : ''}`}></div>
    </div>
  )
}

export default App
