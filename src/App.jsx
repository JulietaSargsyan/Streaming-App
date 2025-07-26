import { useState } from 'react'
import './App.css'
import SideBar from './components/sideBar/SideBar'
import TrendingCarousel from './components/trendingCarousel/TrendingCarousel'
import title from './assets/FeaturedTitleImage.png'
import { FaPlay } from "react-icons/fa"

function App() {
  const [sideBarActive, setSideBarActive] = useState(true);

  return (
    <div className='hero-page'>
      <SideBar sideBarActive={sideBarActive} setSideBarActive={setSideBarActive}/>
      <main className={`${sideBarActive ? 'gradientBG' : ''}`}>
        <div className='featured-movie-container'>
          <div className='featured-movie-info'>
            <h3 className='category'>movie</h3>
            <img className='movie-logo' src={title} alt="the irishman" />
            <div className='general-info'>
              <p>2025</p>
              <p>18+</p>
              <p>1h 48m</p>
            </div>
            <p className='movie-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
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
          <TrendingCarousel/>
        </div>
      </main>
      <div className={`${sideBarActive ? 'gradientBG' : ''}`}></div>
    </div>
  )
}

export default App
