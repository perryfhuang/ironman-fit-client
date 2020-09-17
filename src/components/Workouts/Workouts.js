import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Image, Container, Row, Col, Dropdown, DropdownButton, Button, ButtonGroup, Modal } from 'react-bootstrap'
import { indexWorkouts, getWorkout, deleteWorkout, editWorkout } from '../../api/workout'
// import apiUrl from '../../apiConfig'
// import axios from 'axios'

class Workouts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      workouts: [],
      show: false,
      currentWorkoutId: '',
      editedWorkout: ''
    }
  }

  componentDidMount () {
    indexWorkouts(this.props.user)
      .then(res => this.props.setWorkouts(res.data.workouts.reverse()))
      .catch(console.error)
  }

  onDeleteWorkout = event => {
    deleteWorkout(this.props.user, event.target.dataset.workoutid)
    // After successful delete, call another index request to re-render posts
      .then(() => indexWorkouts(this.props.user)
        .then(res => this.props.setWorkouts(res.data.workouts.reverse()))
        .catch(console.error)
      )
      .catch(console.error)
  }

  onEditWorkout = event => {
    editWorkout(this.props.user, this.state.currentWorkoutId, this.state.editedWorkout)
      // After successful update, call another index request to re-render posts
      .then(() => indexWorkouts(this.props.user)
        .then(res => this.props.setWorkouts(res.data.workouts.reverse()))
        .catch(console.error)
      )
      .then(() => this.setState({ show: false }))
      .catch(console.error)
  }

  // Trigger to show modal and autopopulates text field with contents of current post
  handleShow = event => {
    this.setState({ currentWorkoutId: event.target.dataset.workoutid })
    getWorkout(this.props.user, event.target.dataset.workoutid)
    // axios({
    //   url: apiUrl + '/posts/' + event.target.dataset.postid,
    //   method: 'GET',
    //   headers: {
    //     'Authorization': `Token token=${this.props.user.token}`
    //   }
    // })
      // .then(res => console.log(res) && res)
      .then(res => this.setState({ editedWorkout: res.data.workout }))
      .then(() => this.setState({ show: true }))
      .catch(console.error)
  }

  handleClose = () => this.setState({ show: false })

  handleChange = event => {
    event.persist()
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    const { onDeleteWorkout, onEditWorkout, handleShow, handleChange, handleClose } = this
    const { editedWorkout } = this.props
    const workoutsStyling = {
      border: '1px solid rgba(255, 255, 255, 0.5)',
      width: '600px',
      color: 'white'
    }
    const workouts = this.props.workouts.map(workout => (
      <React.Fragment key={workout.id}>
        <Container style={workoutsStyling} className='workout-hover pb-5 pt-2'>
          <Row>
            <Col xs={2}>
              <Link to={`/users/${workout.owner.id}`}>
                <div className='proPicContainer'>
                  <Image className='proPic' height='100' width='100' src={workout.owner.pro_pic} alt="proPic"/>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={`/users/${workout.owner.id}`}>
                <div style={{ display: 'inline-block' }}><span style={{ fontWeight: 'Bold' }} className='name'>{workout.owner.name}</span></div>
              </Link>
              {/* DROPDOWN options if you are owner of the workout */}
              { this.props.user.id === workout.owner.id
                ? <div style={{ display: 'inline-block', float: 'right' }}>
                  <DropdownButton
                    as={ButtonGroup}
                    id='workouts-dropdown'
                    size="sm"
                    variant="secondary"
                    title=""
                  >
                    <Dropdown.Item onClick={handleShow} data-workoutid={workout.id} eventKey="1">Edit</Dropdown.Item>
                    <Dropdown.Item onClick={onDeleteWorkout} data-workoutid={workout.id} eventKey="2">Delete</Dropdown.Item>
                  </DropdownButton>
                </div>
                : null }
            </Col>
          </Row>
          <Row>
            <p>Time</p>
            <p>{workout.time}</p>
          </Row>
          <Row><div>{workout.caption}</div></Row>
        </Container>
      </React.Fragment>
    ))
    // onClick={handleShow}
    // onClick={onDeletePost}

    // <Modal centered show={this.state.show} onHide={handleClose}>
    //   <Modal.Header className='textCenter' closeButton>
    //     <Modal.Title className='textCenter'>Edit Post</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <input type="text" value={editedPost} onChange={handleChange} name='editedPost'></input>
    //   </Modal.Body>
    //   <Modal.Footer>
    //     <Button variant="secondary" onClick={handleClose}>
    //       Close
    //     </Button>
    //     <Button variant="primary" onClick={onEditPost}>
    //       Save Changes
    //     </Button>
    //   </Modal.Footer>
    // </Modal>
    return (
      <div style={{ color: 'white' }}>
        {workouts}
        <Modal centered show={this.state.show} onHide={handleClose}>
          <Modal.Header className='textCenter' closeButton>
            <Modal.Title className='textCenter'>Edit Workout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" value={editedWorkout} onChange={handleChange} name='editedWorkout'></input>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onEditWorkout}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default Workouts
