import { useState, useEffect } from 'react'
import style from './style.module.css'
import NavBarItem from './NavBarItem'
import avatar from '../../assets/Gi-hun.png'
import searchIcon from '../../assets/icons/search.png'
import home from '../../assets/icons/home.png'
import TVshows from '../../assets/icons/shows.png'
import movies from '../../assets/icons/movies.png'
import genres from '../../assets/icons/genres.png'
import watchLater from '../../assets/icons/watchLater.png'

function SideBar({ sideBarActive, setSideBarActive }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 890);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 890;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileMenuOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleClick() {
    setSideBarActive(!sideBarActive);
    setMobileMenuOpen(prev => !prev)
  }




  return (
    <>
      {isMobile && (
        <div
          className={`${style.burgerMenu} ${mobileMenuOpen ? style.open : ''}`}
          onClick={handleClick}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      <aside
        className={`${style.sidebar} ${sideBarActive ? style.hovered : ''}`}
        onMouseEnter={() => !isMobile && setSideBarActive(true)}
        onMouseLeave={() => !isMobile && setSideBarActive(false)}
      >
        <div className={style.userInfo}>
          <img className={style.userImage} src={avatar} alt='user image' />
          <p className={style.userName}>Daniel</p>
        </div>
        <nav>
          <NavBarItem src={searchIcon} text='Search' />
          <NavBarItem src={home} text='Home' isActive={true} />
          <NavBarItem src={TVshows} text='TV Shows' />
          <NavBarItem src={movies} text='Movies' />
          <NavBarItem src={genres} text='Genres' />
          <NavBarItem src={watchLater} text='Watch Later' />
        </nav>
        <div className={style.settings}>
          <a href="#">language</a>
          <a href="#">get help</a>
          <a href="#">exit</a>
        </div>
      </aside>
    </>
  );
}


export default SideBar