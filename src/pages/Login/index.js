import React, { Component, Fragment } from 'react'
import Header from '../../components/Header'
import Widget from '../../components/Widget'
import { NotificationContext } from '../../contexts/NotificationContext'
import api from '../../api'

import './loginPage.scss'

class LoginPage extends Component {
    static contextType = NotificationContext

    login = (e) => {
        e.preventDefault()
        const data = {
            login: this.refs.inputLogin.value,
            senha: this.refs.inputPassword.value
        }

        api.post('login', data).then(res => {
            const token = res.data.token
            localStorage.setItem('token', token)
            this.props.history.push('/')
            this.context.setMsg("Bem vindo ao Twitelum, login foi um sucesso!");
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className="loginPage">
                    <div className="container">
                        <Widget>
                            <h2 className="loginPage__title">Seja bem vindo!</h2>
                            <form className="loginPage__form" onSubmit={this.login}>
                                <div className="loginPage__inputWrap">
                                    <label className="loginPage__label" htmlFor="login">Login</label> 
                                    <input ref="inputLogin" className="loginPage__input" type="text" id="login" name="login"/>
                                </div>
                                <div className="loginPage__inputWrap">
                                    <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                    <input ref="inputPassword"  className="loginPage__input" type="password" id="senha" name="senha"/>
                                </div>
                                {/* <div className="loginPage__errorBox">
                                    Mensagem de erro!
                                </div> */}
                                <div className="loginPage__inputWrap">
                                    <button className="loginPage__btnLogin" type="submit">
                                        Logar
                                    </button>
                                </div>
                            </form>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default LoginPage