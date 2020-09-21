import React, { Component } from 'react'
import { getUser } from '../../api/workout'
import { withRouter, Link } from 'react-router-dom'
import { Image, Container, Row, Col, Button, ButtonGroup, ToggleButton } from 'react-bootstrap'
import UserActivity from '../UserActivity/UserActivity'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filterValue: '0',
      user: ''
    }
  }

  componentDidMount () {
    getUser(this.props.match.params.id, this.props.user)
      .then(res => this.setState({ user: res.data.user }))
      .catch(console.error)
  }

  handleClick = event => {
    event.persist()
    console.log('This is value of clicked radio button', event.target.value)
    this.setState({ filterValue: event.target.value })
    console.log(this.state)
  }

  render () {
    const { user, filterValue } = this.state
    const { handleClick } = this

    const profileStyling = {
      border: '2px solid white',
      width: '400px',
      color: 'white'
    }

    const filterWorkouts = (
      <React.Fragment>
        <Row className='mt-4 mb-4' style={{ margin: '0 auto', display: 'block' }}>
          <ButtonGroup className='mr-2' toggle>
            <ToggleButton
              key={0}
              type="radio"
              variant="danger"
              name="type"
              value="0"
              checked={filterValue === '0'}
              onChange={handleClick}
            >All
            </ToggleButton>
          </ButtonGroup>
          <ButtonGroup className='mr-2' toggle>
            <ToggleButton
              key={1}
              type="radio"
              variant="danger"
              name="type"
              value="1"
              checked={filterValue === '1'}
              onChange={handleClick}
            >
              <i name='type' data-type='Lift' className="fas fa-dumbbell fa-lg"></i>
            </ToggleButton>
          </ButtonGroup>
          <ButtonGroup className='mr-2' toggle>
            <ToggleButton
              key={2}
              type="radio"
              variant="danger"
              name="type"
              value="2"
              checked={filterValue === '2'}
              onChange={handleClick}
              data-type='Run'
            >
              <i name='type' data-type='Run' className="fas fa-running fa-lg"></i>
            </ToggleButton>
          </ButtonGroup>
          <ButtonGroup className='mr-2' toggle>
            <ToggleButton
              key={3}
              type="radio"
              variant="danger"
              name="type"
              value="3"
              checked={filterValue === '3'}
              onChange={handleClick}
              data-type='Bike'
            >
              <i name='type' data-type='Bike' className="fas fa-bicycle fa-lg"></i>
            </ToggleButton>
          </ButtonGroup>
          <ButtonGroup toggle>
            <ToggleButton
              key={4}
              type="radio"
              variant="danger"
              name="type"
              value="4"
              checked={filterValue === '4'}
              onChange={handleClick}
              data-type='Swim'
            >
              <i name='type' data-type='Swim' className="fas fa-swimmer fa-lg"></i>
            </ToggleButton>
          </ButtonGroup>
        </Row>
        { filterValue === '0'
          ? <h4 className='mb-4'>All Workouts</h4>
          : null}
        { filterValue === '1'
          ? <h4 className='mb-4'>Lifts</h4>
          : null}
        { filterValue === '2'
          ? <h4 className='mb-4'>Runs</h4>
          : null}
        { filterValue === '3'
          ? <h4 className='mb-4'>Bikes</h4>
          : null}
        { filterValue === '4'
          ? <h4 className='mb-4'>Swims</h4>
          : null}
      </React.Fragment>
    )

    return (
      <React.Fragment>
        <Container style={profileStyling} className='workout-hover pb-4 pt-2'>
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

              { user.id === this.props.user.id
                ? <Row style={{ marginLeft: '30px', marginTop: '8px' }}>
                  <Link to={`/edit-profile/${this.props.user.id}`}><Button variant="danger" style={{ fontSize: '12px', height: '30px', width: '200px' }}>Edit Profile</Button></Link>
                </Row>
                : null}
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

        <Container style={profileStyling} className="text-center">
          {filterWorkouts}
        </Container>
        <UserActivity msgAlert={this.props.msgAlert} user={user} authUser={this.props.user} filterValue={filterValue}/>
      </React.Fragment>
    )
  }
}

export default withRouter(Profile)
