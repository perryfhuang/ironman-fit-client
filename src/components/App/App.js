import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

import Workouts from '../Workouts/Workouts'
import LogWorkout from '../LogWorkout/LogWorkout.js'
import Profile from '../Profile/Profile.js'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: [],
      workouts: []
    }
  }

  setWorkouts = workouts => {
    this.setState({
      workouts: workouts
    })
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user, workouts } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          <AuthenticatedRoute exact path='/workouts' user={user} render={() => (
            <React.Fragment>
              <h3 className='mt-5' style={{ textAlign: 'center', color: 'white' }}>Feed</h3>
              <Workouts workouts={workouts} setWorkouts={this.setWorkouts} user={user}/>
            </React.Fragment>
          )}/>

          <AuthenticatedRoute exact path='/log-workout' user={user} render={() => (
            <React.Fragment>
              <h3 className='mt-5' style={{ textAlign: 'center', color: 'white' }}>Log Workout</h3>
              <LogWorkout user={user}/>
            </React.Fragment>
          )}/>

          <AuthenticatedRoute exact path='/profile' user={user} render={() => (
            <React.Fragment>
              <h3 className='mt-5' style={{ textAlign: 'center', color: 'white' }}>Profile</h3>
              <Profile user={user}/>
            </React.Fragment>
          )}/>

        </main>
      </Fragment>
    )
  }
}

export default App
