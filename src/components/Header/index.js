import React, { Component } from 'react'
import headerStyles from "./header.module.scss"
 

export default class Header extends Component {
  render() {
    return (
      <header className={headerStyles.cabecalho}>
        <div className={[headerStyles.cabecalho__container]}>
          <h1 className={headerStyles.cabecalho__logo}>
            <a href="/">Twitelum</a>
          </h1>
          { this.props.children }
        </div>
      </header>
    )
  }
}
