import style from './style.module.css'

function NavBarItem({ src, text, isActive }) {
  return (
    <div className={`${style.navBarItem } ${isActive ? style.isActive : ''}`}>
      <div className={style.icon}>
        <img  src={src} alt='icon' />
      </div>
      <p className={style.iconText}>{text}</p>
    </div>
  )
}

export default NavBarItem