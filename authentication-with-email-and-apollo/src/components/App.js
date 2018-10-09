import React from 'react'
import { withRouter } from 'react-router-dom'
import ListPage from './ListPage'
import NewPostLink from './NewPostLink'

class App extends React.Component {

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    localStorage.removeItem('graphcoolToken')
    window.location.reload()
  }

  _showLogin = () => {
    this.props.history.replace('/login')
  }

  _showSignup = () => {
    this.props.history.replace('/signup')
  }

  _isLoggedIn = () => {
    return localStorage.getItem('graphcoolToken') != null
  }

  render () {

    if (this._isLoggedIn()) {
      return this.renderLoggedIn()
    } else {
      return this.renderLoggedOut()
    }
  }

  renderLoggedIn() {
    return (
      <div>
        <span>
          User ID: {localStorage.getItem('graphcoolToken')}
        </span>
        <div className='pv3'>
          <span
            className='dib bg-red white pa3 pointer dim'
            onClick={this._logout}
          >
            Logout
          </span>
        </div>
        <ListPage />
        <NewPostLink />
      </div>
    )
  }

  renderLoggedOut() {
    return (
      <div>
        <div className='pv3'>
          <div className='w-100 pa4 flex justify-center'>
            <span
              onClick={this._showLogin}
              className='dib pa3 white bg-blue dim pointer'
            >
              Log in with Email
            </span>
          </div>
          <div className='w-100 flex justify-center'>
            <span
              onClick={this._showSignup}
              className='dib pa3 white bg-blue dim pointer'
            >
              Sign up with Email
            </span>
          </div>
        </div>
        <ListPage />
      </div>
    )
  }
}

export default withRouter(App)
