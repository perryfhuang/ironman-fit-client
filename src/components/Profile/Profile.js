import React, { Component } from 'react'
import { getUser } from '../../api/workout'
import { withRouter } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
// import styles from './user.css.js'

const profile = {
  border: styles.profile.border,
  margin: styles.profile.margin,
  padding: styles.profile.padding
}

// const link = {
//   margin: styles.link.margin
// }

const userInfo = {
  color: styles.userInfo.color
}

// const newsFeed = {
//   margin: styles.newsFeed.margin
// }

class User extends Component {
  constructor (props) {
    super(props)

    console.log('these are the props ', props)

    this.state = {
      user: ''
    }
  }

  componentDidMount () {
    getUser(this.props.match.params.id)
      .then(res => this.setState({ user: res.data.user }))
      .catch(console.error)
  }

  render () {
    const { user } = this.state

    return (
      <div className="container mt-5" style={profile}>
        <div className="row">
          <div className="col-1">
            <Image src={user.pro_pic} width="100" height="100" roundedCircle/>
          </div>
        </div>
        <div className="row">
          <div className="col-9" style={userInfo}>
            <h4>{user.name}</h4>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(User)
