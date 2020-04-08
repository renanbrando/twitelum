import React, { Component, Fragment } from 'react'
import Header from '../../components/Header'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
//import api from '../../api'
import Helmet from 'react-helmet'
import { ReactReduxContext } from "react-redux"
import { TweetsThunkActions } from "../../store/ducks/tweets"

class Home extends Component {
  constructor() {
    super()
    this.state = {
      newTweet: '',
      tweets: []
    }
  }

  static contextType = ReactReduxContext;

  componentDidMount () {
    /*window.store.subscribe(() => {
      this.setState({
        tweets: window.store.getState()
      })
    })*/
    const store = this.context.store
    store.subscribe(() => {
      this.setState({
        tweets: store.getState().tweets.data
      })
    })


    store.dispatch(TweetsThunkActions.carregaTweets());

    /*fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`).then(response =>
      response.json()
    ).then(tweets => 
      //this.setState({tweets})
      //window.store.dispatch({type: 'CARREGA_TWEETS', tweets})
      store.dispatch({ type: "CARREGA_TWEETS", tweets })
    );*/
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

  removeTweet = (idTweetQueVaiSerRemovido) => {
    console.log(idTweetQueVaiSerRemovido);
    fetch(`https://twitelum-api.herokuapp.com/tweets/${idTweetQueVaiSerRemovido}?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {
      method: 'DELETE'
    }).then(data => data.json()).then(response => {
      const listaDeTweetsAtualizada = this.state.tweets.filter(tweet => tweet._id !== idTweetQueVaiSerRemovido);
      this.setState({
        tweets: listaDeTweetsAtualizada
      });
    });
  };

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
                      (tweetInfo, index) => {
                        return <Tweet 
                          key={tweetInfo._id}
                          id={tweetInfo._id}
                          texto={tweetInfo.conteudo}
                          usuario={tweetInfo.usuario}
                          likeado={tweetInfo.likeado}
                          totalLikes={tweetInfo.totalLikes}
                          removivel={tweetInfo.removivel}
                          removeHandler={(event) => this.removeTweet(tweetInfo._id)} 
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
