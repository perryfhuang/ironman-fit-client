import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Image, Container, Row, Col, Dropdown, DropdownButton, Button, ButtonGroup, Modal, Form } from 'react-bootstrap'
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
      editedWorkout: {
        type: null,
        distance: null,
        time: null,
        exercise_1: null,
        exercise_1_weight: null,
        exercise_1_sets: null,
        exercise_1_reps: null,
        exercise_2: null,
        exercise_2_weight: null,
        exercise_2_sets: null,
        exercise_2_reps: null,
        exercise_3: null,
        exercise_3_weight: null,
        exercise_3_sets: null,
        exercise_3_reps: null,
        exercise_4: null,
        exercise_4_weight: null,
        exercise_4_sets: null,
        exercise_4_reps: null,
        exercise_5: null,
        exercise_5_weight: null,
        exercise_5_sets: null,
        exercise_5_reps: null,
        exercise_6: null,
        exercise_6_weight: null,
        exercise_6_sets: null,
        exercise_6_reps: null,
        exercise_7: null,
        exercise_7_weight: null,
        exercise_7_sets: null,
        exercise_7_reps: null,
        exercise_8: null,
        exercise_8_weight: null,
        exercise_8_sets: null,
        exercise_8_reps: null,
        exercise_9: null,
        exercise_9_weight: null,
        exercise_9_sets: null,
        exercise_9_reps: null,
        exercise_10: null,
        exercise_10_weight: null,
        exercise_10_sets: null,
        exercise_10_reps: null,
        caption: null,
        feeling: null
      }
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
    console.log('Workout ID', this.state.currentWorkoutId)
    console.log('Edited workout object', this.state.editedWorkout)
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
    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedWorkout = Object.assign({}, prevState.editedWorkout, updatedField)
      // return the state change, of setting the `post` state to its new value of
      // `editedpost`
      console.log('State as it is being updated:', editedWorkout)
      return { editedWorkout: editedWorkout }
    })
  }

  render () {
    const { onDeleteWorkout, onEditWorkout, handleShow, handleChange, handleClose } = this
    // const { editedWorkout } = this.state
    const { type, distance, time, caption } = this.state.editedWorkout
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

    return (
      <div style={{ color: 'white' }}>
        {workouts}
        <Modal centered show={this.state.show} onHide={handleClose}>
          <Modal.Header className='textCenter' closeButton>
            <Modal.Title className='textCenter'>Edit Workout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" value={type} onChange={handleChange} name='type'></input>

            <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
              <Form.Group controlId="Distance">
                <Form.Label>Distance (mi)</Form.Label>
                <Form.Control
                  required
                  name="distance"
                  value={distance}
                  type="number"
                  min="0"
                  placeholder="Enter distance"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
              <Form.Group controlId="Time">
                <Form.Label>Time (sec)</Form.Label>
                <Form.Control
                  required
                  name="time"
                  value={time}
                  type="number"
                  min="0"
                  placeholder="Enter time"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
              <Form.Group controlId="Caption">
                <Form.Label>Caption</Form.Label>
                <Form.Control
                  required
                  name="caption"
                  value={caption}
                  type="text"
                  placeholder="Write a caption..."
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

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
