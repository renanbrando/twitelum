import React, { Component, Fragment } from 'react'
import Header from '../../components/Header'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import api from '../../api'
import Helmet from 'react-helmet'

class Home extends Component {

  constructor() {
    super()
    this.state = {
      newTweet: '',
      tweets: []
    }
  }

  componentDidMount () {
    fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`).then(response =>
      response.json()
    ).then(tweets => 
      this.setState({tweets})
    );
  }

  addNewTweet = (e) => {
    e.preventDefault()
    if (this.state.newTweet.length > 0) {
      /*api.post('/tweets', {
        conteudo: this.state.newTweet
      }).then(res => {
        this.setState({
          tweets: [res.data, ...this.state.tweets],
          newTweet: ""
        })
      })*/
      fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {
        method: 'POST',
        headers: {},
        'Content-type': 'application/json',
        body: JSON.stringify({
          conteudo: this.state.newTweet
        })
      }).then(respostaDoServer => {
        return respostaDoServer.json();
      }).then(tweetVindoDoServidor => {
        console.log(tweetVindoDoServidor);
        this.setState({
          tweets: [tweetVindoDoServidor, ...this.state.tweets]
        });
      });
    }
  }

  render () {
    return (
      <Fragment>
        <Helmet>
          <title>Twitelum - ({`${this.state.tweets.length}`})</title>
        </Helmet>
        <Header>
          <NavMenu user="@renabrando" />
        </Header>
        <div className="container">
          <Dashboard>
            <Widget>
              <form className="novoTweet" onSubmit={ this.addNewTweet }>
                <div className="novoTweet__editorArea">
                  <span
                    className={
                      `novoTweet__status
                      ${
                        this.state.newTweet.length > 140 ?
                        'novoTweet__status--invalido'
                        : ''
                      }`
                    }>
                      { this.state.newTweet.length }/140
                  </span>
                  <textarea
                    className="novoTweet__editor"
                    placeholder="O que está acontecendo?"
                    value={this.state.newTweet}
                    onChange={ (event) => this.setState({newTweet: event.target.value})}
                  >
                  </textarea>
                </div>
                <button
                  type="submit"
                  className="novoTweet__envia"
                  disabled={ this.state.newTweet.length > 140 || this.state.newTweet.length === 0 }
                >
                  Tweetar
                </button>
              </form>
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <div className="tweetsArea">
                { this.state.tweets.length > 0  ?
                  (
                    this.state.tweets.map(
                      (tweet, index) => {
                        return <Tweet 
                          key={index}
                          tweet={tweet}
                        />
                      }
                    )
                  )
                  : 
                  (
                    <p className="tweetsArea--text">Acione um tweet para começar :)</p>
                  )
                }
              </div>
            </Widget>
          </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default Home;
