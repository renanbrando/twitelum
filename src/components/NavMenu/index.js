import React from 'react'
import { useHistory } from "react-router-dom";
import navMenuStyles from "./navMenu.module.scss"

export default ({user}) => {
  const history = useHistory()

  const logout = () => {
    localStorage.clear()
    history.push('/login')
  }

  return (
    <nav className={navMenuStyles.navMenu}>
      <ul className={navMenuStyles.navMenu__lista}>
        <li className={navMenuStyles.navMenu__item}>
          <a className={navMenuStyles.navMenu__link} href="/">
            Bem vindo(a): <br />
            <strong>{user}</strong>
          </a>
        </li>
        <li className={navMenuStyles.navMenu__item}>
          <a className={navMenuStyles.navMenu__link} href="/">
            Página Inicial
          </a>
        </li>
        <li className={navMenuStyles.navMenu__item}>
          <a className={navMenuStyles.navMenu__link} href="/hashtags">
            Hashtags
          </a>
        </li>
        <li className={navMenuStyles.navMenu__item}>
          {/* eslint-disable-next-line */}
          <a className={navMenuStyles.navMenu__link} onClick={logout}>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  )
}
