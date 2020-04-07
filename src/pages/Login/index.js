import React, { Component, Fragment } from 'react'
import Header from '../../components/Header'
import Widget from '../../components/Widget'
import FormManager from '../../components/FormManager'
import { NotificationContext } from '../../contexts/NotificationContext'
import api from '../../api'

import './loginPage.scss'

const InputFormField = ({ id, label, errors, touched, value, onChange, onBlur }) => {
    const isTouched = Boolean(touched[id]);
    const hasErrors = Boolean(errors[id]);
    return (
        <div className="loginPage__inputWrap">
            <label className="loginPage__label" htmlFor={id}>
                { label }
            </label>
            <input
                className="loginPage__input"
                type="text"
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            <p style={{ color: "red", marginTop: "8px" }}>{isTouched && hasErrors && errors[id]}</p>
        </div>
    )
}

class LoginPage extends Component {
    static contextType = NotificationContext

    constructor(){
        super()
        this.state = {
            values: {
                inputLogin: '',
                inputPassword: '',
            },
            errors: {}
        }
    }

    login = (e, values) => {
        e.preventDefault()
        const data = {
            login: values.inputLogin,
            senha: values.inputPassword
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

    validateForm = () => {
        const { inputLogin, inputPassword } = this.state.values
        const errors = {}

        if (!inputLogin) errors.inputLogin = 'Esse campo é obrigatório'
        if (!inputPassword) errors.inputPassword = 'Esse campo é obrigatório'

        this.setState({errors})

        return inputLogin && inputPassword
    }

    onFormFieldChange = ({ target }) => {
        const value = target.value
        const name = target.name
        const values = { ...this.state.values, [name]: value }
        this.setState({ values }, () => {
            this.validateForm()
        })
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className="loginPage">
                    <div className="container__login">
                        <Widget>
                            <h2 className="loginPage__title">Seja bem vindo!</h2>
                            <FormManager
                                initialValues={{ inputLogin: "", inputPassword: "" }}
                                onFormValidation={(values) => {
                                    const errors = {};
                                    if (!values.inputLogin) errors.inputLogin = "Esse campo é obrigatório";
                                    if (!values.inputPassword) errors.inputPassword = "Esse campo é obrigatório";
                                    return errors;
                                }}
                                >
                                {({ values, errors, touched, onFormFieldChange, onFormFieldBlur }) => (
                                    <form
                                            className="loginPage__form"
                                            action="/"
                                            onSubmit={(event) => this.login(event, values)}
                                    >
                                        <InputFormField
                                            id="inputLogin"
                                            label="Login: "
                                            onChange={onFormFieldChange}
                                            onBlur={onFormFieldBlur}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                        />
                                        <InputFormField
                                            id="inputPassword"
                                            label="Senha: "
                                            onChange={onFormFieldChange}
                                            onBlur={onFormFieldBlur}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                        />
                                        {/* <div className="loginPage__errorBox">Mensagem de erro!</div> */}
                                        <div className="loginPage__inputWrap">
                                            <button
                                                className="loginPage__btnLogin"
                                                type="submit"
                                                disabled={!values.inputLogin || !values.inputPassword}>
                                                Logar
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </FormManager>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default LoginPage