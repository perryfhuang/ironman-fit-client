import React, { Component } from 'react'
import { getUsers } from '../../api/workout'
import { withRouter, Link } from 'react-router-dom'
import { Image, Container, Row, Col, Button, Spinner } from 'react-bootstrap'
// import UserActivity from '../UserActivity/UserActivity'

class Users extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: [],
      loading: true
    }
  }

  componentDidMount () {
    getUsers(this.props.user)
      .then(res => this.setState({ users: res.data.users }))
      .then(() => this.setState({ loading: false }))
      .catch(console.error)
  }

  render () {
    const { users, loading } = this.state

    const userCardsStyling = {
      border: '2px solid white',
      width: '400px',
      color: 'white'
    }

    const usersCards = users.map(user => (
      <React.Fragment key={user.id}>
        <Container style={userCardsStyling} className='pb-4 pt-2'>
          <Row className='mt-2'>
            <Col xs={4} style={{ textAlign: 'center' }}>
              <div>
                { user.pro_pic
                  ? <Image className='userProfilePic' src={user.pro_pic} alt="proPic"/>
                  : <i className="proPic fas fa-user" style={{ color: 'white', fontSize: '125px', textAlign: 'center' }}></i> }
              </div>
            </Col>
            <Col>
              <Row style={{ marginLeft: '30px' }}>
                <div style={{ display: 'inline-block', color: 'white' }}><span style={{ fontWeight: 'Bold', fontSize: '18px' }} className='name'>{user.name}</span></div>
              </Row>
              { user.city
                ? <Row style={{ marginLeft: '30px' }}>
                  <div style={{ display: 'inline-block', color: 'white' }}><span style={{ fontSize: '12px' }}><i className="fas fa-map-marker-alt" style={{ color: '#d9534f' }}></i>&nbsp;&nbsp;{user.city}, {user.state} {user.country}</span></div>
                </Row>
                : null }

              <Row style={{ marginLeft: '30px', marginTop: '8px' }}>
                <Link to={`/users/${user.id}`}><Button variant="danger" style={{ fontSize: '12px', height: '30px', width: '200px' }}>View Profile</Button></Link>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              { user.bio
                ? <p className='mt-3'>{user.bio}</p>
                : <p className='mt-3' style={{ color: '#696969' }}>Edit profile to add a bio...</p> }
            </Col>
          </Row>
        </Container>
      </React.Fragment>))

    return (
      <div style={{ paddingBottom: '100px' }}>
        { loading ? <Spinner style={{ margin: '0 auto', display: 'block', marginTop: '100px' }} animation="border" variant="danger" />
          : usersCards }
      </div>
    )
  }
}

export default withRouter(Users)
