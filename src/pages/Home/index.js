import React, { Component, Fragment } from 'react'
import Header from '../../components/Header'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'

class Home extends Component {

  constructor() {
    super()
    this.state = {
      newTweet: '',
      tweets: []
    }
  }

  addNewTweet = (e) => {
    e.preventDefault()
    if (this.state.newTweet.length > 0) {
      this.setState({
        tweets: [this.state.newTweet, ...this.state.tweets],
        newTweet: ""
      });
    }
  }

  render () {
    return (
      <Fragment>
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
                          text={tweet}
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
