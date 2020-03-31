import React, { Component, Fragment } from 'react'
import Header from './components/Header'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {

  constructor() {
    super()
    this.state = {
      newTweet: ''
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
              <form className="novoTweet">
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
                <Tweet />
              </div>
            </Widget>
          </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default App;
