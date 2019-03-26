import React, { Component } from 'react';
import './App.css';

// npm packages
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom'


// REACT COMPONENTS
// AUTH/SPLASH
import Signup from './Signup';
import Login from './Login';
import PropsLogo from './PropsLogo';

// HOMEPAGE
import ProfilePage from './UserProfile';
import MyPropsShort from './MyPropsShort';
import PropsFeed from './PropsFeed';

// GIVE PROPS FORM

// HOME PAGE
import HomePage from './HomePage';

// PROFILE PAGE
// import ProfilePage from './ProfilePage';

// COMMUNITY
import CommunityPage from './CommunityPage';

// TOWN SQUARE
import TownSquare from './TownSquare';

// SET-UP PAGE
import SetUpPage from './SetUpPage';

// MATERIAL-UI IMPORTS
import { Typography, Grid, Paper} from '@material-ui/core';

import PropsAppBar from './PropsAppBar';


const styles = {
  Paper: { padding: 20, marginTop: 10, marginBottom: 10}
}



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: null,
      message: '',
      lockedResult: '',
    }
    this.liftTokenToState = this.liftTokenToState.bind(this)
    this.liftMessageToState = this.liftMessageToState.bind(this)
    this.checkForLocalToken = this.checkForLocalToken.bind(this)
    this.logout = this.logout.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  liftTokenToState({token, user, message}) {
    console.log('[App.jsx]: lifting token to state', {token, user, message})
    this.setState({token, user, message})
  }
  liftMessageToState({ message }) {
    console.log('[App.jsx]: lifting error to state', { message })
    this.setState({ message })
  }

  logout() {
    console.log('[App.jsx] logout(): logging out', {localStorage: localStorage})
    // Remove the token from localStorage
    localStorage.removeItem('jwtToken')
    // Remove the user and token from state
    this.setState({
      token: '',
      user: null
    })
  }

  handleClick(e) {
    console.log('[App.jsx]: handleClick(), event', {e})
    console.log('[App.jsx]: handleClick(), this.state', this.state)
    e.preventDefault()
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`
    axios.get('/locked/test').then( res => {
      console.log('this is the locked response', res)
      this.setState({
        lockedResult: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  checkForLocalToken() {
    console.log('[App.jsx]: checkForLocalToken(), localStorage["jwtToken"]', localStorage["jwtToken"])
    let token = localStorage.getItem('jwtToken')
    if (!token || token === 'undefined') {
      // If there is no token, remove the entry in localStorage
      localStorage.removeItem('jwtToken')
      this.setState({
        token: '',
        user: null
      })
    } else {
      // If found, send token to be verified
      axios.post('/auth/me/from/token', { token })
      .then( res => {
        if (res.data.type === 'error') {
          console.log('it was an older token sir, and it didn\'t check out', res.data)
          // if error, remove the bad token and display an error
          localStorage.removeItem('jwtToken')
          this.setState({
            errorMessage: res.data.message
          })
        } else {
          // Upon receipt, store token 
          localStorage.setItem('jwtToken', res.data.token)
          // Put token in state
          this.setState({
            token: res.data.token,
            user: res.data.user
          })
        }
        console.log(res)
      }).catch( err => {
        console.log(err)
      })
    }
  }

  componentDidMount() {
    console.log('[App.jsx]: componentDidMount(), this.state', JSON.stringify(this.state) )
    this.checkForLocalToken()
  }

  render() {
    let user = this.state.user
    let content
    if (user) {

      content = ( 
          <BrowserRouter>
          <PropsAppBar />
               <Route 
                path="/home"
                render={ () => <HomePage user={ user } logout={ this.logout }/> }/>
             
              <Route 
                path="/profile"
                render={ () => <ProfilePage user={ user } /> } />

              <Route 
                path="/community" 
                render={ () => <CommunityPage user={ user } /> } />

              <Route 
                path="/square" 
                component={ TownSquare } /> 

              <Route 
                path="/setup" 
                component={ SetUpPage } />

              <p><button onClick={ this.handleClick } >Test the protected route...</button></p>
              <p>{ this.state.lockedResult }</p>
          </BrowserRouter>


      )
    } else {
      content = (
        // <div className="authenticate">
        <React.Fragment>
            <div className="LoginDiv">
            <Login styles={styles} liftToken={this.liftTokenToState} liftMessage={this.liftMessageToState} />
            </div>
            <div className="PropsLogoDiv">
            <PropsLogo />
            </div>
            <div className="SignupDiv">
            <Signup styles={styles} liftToken={this.liftTokenToState} liftMessage={this.liftMessageToState} />
            <h3>{ this.state.message }</h3> 
            </div>
            </React.Fragment>
        // </div>
      )
    }
    return (
      <div className="App">
        {content}
      </div>
    )
  }
}

export default App;
