import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Image, Container, Row, Col, Dropdown, DropdownButton, Button, ButtonGroup, Modal, Form, ToggleButton, Spinner } from 'react-bootstrap'
import { indexWorkouts, getWorkout, deleteWorkout, editWorkout } from '../../api/workout'
import moment from 'moment'
moment().format()
// import apiUrl from '../../apiConfig'
// import axios from 'axios'

class Workouts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      workouts: [],
      loading: true,
      show: false,
      currentWorkoutId: '',
      radioValue: '',
      editedWorkout: {
        type: null,
        distance: null,
        time_hours: null,
        time_minutes: null,
        time_seconds: null,
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
      .then(() => this.setState({ loading: false }))
      .catch(console.error)
  }

  handleLiftClick = event => {
    event.persist()
    this.setState(prevState => {
      const updatedWorkoutType = { type: 'Lift' }
      const editedWorkout = Object.assign({}, prevState.editedWorkout, updatedWorkoutType)
      return { radioValue: event.target.value, editedWorkout: editedWorkout }
    })
  }
  handleRunClick = event => {
    event.persist()
    this.setState(prevState => {
      const updatedWorkoutType = { type: 'Run' }
      const editedWorkout = Object.assign({}, prevState.editedWorkout, updatedWorkoutType)
      // return the state change, of setting the `post` state to its new value of
      // `editedpost`
      return { radioValue: event.target.value, editedWorkout: editedWorkout }
    })
  }
  handleBikeClick = event => {
    event.persist()
    this.setState(prevState => {
      const updatedWorkoutType = { type: 'Bike' }
      const editedWorkout = Object.assign({}, prevState.editedWorkout, updatedWorkoutType)
      // return the state change, of setting the `post` state to its new value of
      // `editedpost`
      return { radioValue: event.target.value, editedWorkout: editedWorkout }
    })
  }
  handleSwimClick = event => {
    event.persist()
    this.setState(prevState => {
      const updatedWorkoutType = { type: 'Swim' }
      const editedWorkout = Object.assign({}, prevState.editedWorkout, updatedWorkoutType)
      // return the state change, of setting the `post` state to its new value of
      // `editedpost`
      return { radioValue: event.target.value, editedWorkout: editedWorkout }
    })
  }

  onDeleteWorkout = event => {
    const { msgAlert } = this.props

    deleteWorkout(this.props.user, event.target.dataset.workoutid)
      .then(() => msgAlert({
        heading: 'Successfully deleted workout!',
        variant: 'success'
      }))
    // After successful delete, call another index request to re-render posts
      .then(() => indexWorkouts(this.props.user)
        .then(res => this.props.setWorkouts(res.data.workouts.reverse()))
        .catch(console.error)
      )
      .catch(error => {
        msgAlert({
          heading: 'Failed to edit workout with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  onEditWorkout = event => {
    const { msgAlert } = this.props
    editWorkout(this.props.user, this.state.currentWorkoutId, this.state.editedWorkout)
      .then(() => msgAlert({
        heading: 'Successfully edited workout!',
        variant: 'success'
      }))
      // After successful update, call another index request to re-render posts
      .then(() => indexWorkouts(this.props.user)
        .then(res => this.props.setWorkouts(res.data.workouts.reverse()))
        .catch(console.error)
      )
      .then(() => this.setState({ show: false }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to edit workout with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  // Trigger to show modal and autopopulates text field with contents of current post
  handleShow = event => {
    // Determine what the workout type is to determine what radioValue is activated
    let radioValue = ''
    switch (event.target.dataset.type) {
    case 'Lift':
      radioValue = '1'
      break
    case 'Run':
      radioValue = '2'
      break
    case 'Bike':
      radioValue = '3'
      break
    case 'Swim':
      radioValue = '4'
      break
    }
    this.setState({ currentWorkoutId: event.target.dataset.workoutid, radioValue: radioValue })
    getWorkout(this.props.user, event.target.dataset.workoutid)
      .then(res => this.setState({ editedWorkout: res.data.workout }))
      .then(() => this.setState({ show: true }))
      .catch(console.error)
  }

  handleClose = () => this.setState({ show: false, radioValue: '' })

  // Use previous state to dynamically update state object while editing workout fields with every keystroke
  handleChange = event => {
    event.persist()
    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedWorkout = Object.assign({}, prevState.editedWorkout, updatedField)
      return { editedWorkout: editedWorkout }
    })
  }

  render () {
    const { onDeleteWorkout, onEditWorkout, handleShow, handleChange, handleClose, handleRunClick, handleLiftClick, handleBikeClick, handleSwimClick } = this
    const { type, distance, caption } = this.state.editedWorkout
    const { editedWorkout, loading } = this.state
    // alt border color: rgba(255, 255, 255, 0.5)
    const workoutsStyling = {
      border: '2px solid white',
      width: '400px',
      color: 'white'
    }
    const workouts = this.props.workouts.map(workout => (
      <React.Fragment key={workout.id}>
        <Container style={workoutsStyling} className='workout-hover pb-4 pt-2'>
          <Row className='mt-2'>
            <Col xs={2}>
              <Link to={`/users/${workout.owner.id}`}>
                <div>
                  { workout.owner.pro_pic
                    ? <Image className='proPic' src={workout.owner.pro_pic} alt="proPic"/>
                    : <i className="proPic fas fa-user" style={{ color: 'white', fontSize: '50px', textAlign: 'center' }}></i>}
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={`/users/${workout.owner.id}`}>
                <div style={{ display: 'inline-block', color: 'white' }}><span style={{ fontWeight: 'Bold' }} className='name'>{workout.owner.name}</span></div>
              </Link>
              {/* DROPDOWN options if you are owner of the workout */}
              { this.props.user.id === workout.owner.id
                ? <div style={{ display: 'inline-block', float: 'right' }}>
                  <DropdownButton
                    as={ButtonGroup}
                    id='workouts-dropdown'
                    size="sm"
                    variant="danger"
                    title=""
                  >
                    <Dropdown.Item onClick={handleShow} data-type={workout.type} data-workoutid={workout.id} eventKey="1">Edit</Dropdown.Item>
                    <Dropdown.Item onClick={onDeleteWorkout} data-workoutid={workout.id} eventKey="2">Delete</Dropdown.Item>
                  </DropdownButton>
                </div>
                : null }
              <br />
              <p style={{ fontSize: '12px', color: '#d9534f' }}>{moment(workout.created_at).fromNow()}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              { workout.type === 'Lift'
                ? <i className="fas fa-dumbbell fa-lg"></i>
                : null}
              { workout.type === 'Run'
                ? <i className="fas fa-running fa-lg"></i>
                : null}
              { workout.type === 'Bike'
                ? <i className="fas fa-bicycle fa-lg"></i>
                : null}
              { workout.type === 'Swim'
                ? <i className="fas fa-swimmer fa-lg"></i>
                : null} <span style={{ fontSize: '24px', fontWeight: 'Bold', color: 'white' }}>&nbsp;{workout.type}</span>
            </Col>
          </Row>
          { workout.type !== 'Lift'
            ? <Row>
              <Col xs={3} style={{ borderRight: '0.75px solid #d9534f', height: '50px' }}>
                <span style={{ fontSize: '12px' }}>Distance</span>
                <p style={{ fontSize: '20px' }}>{workout.distance} mi</p>
              </Col>
              <Col xs={8}>
                <span style={{ fontSize: '12px' }}>Time</span>
                <p style={{ fontSize: '20px' }}>{workout.time_hours ? `${workout.time_hours}h` : ''} {workout.time_minutes ? `${workout.time_minutes}m` : ''} {workout.time_seconds ? `${workout.time_seconds}s` : ''}</p>
              </Col>
            </Row>
            : <React.Fragment>
              <Row>
                <Col xs={6}>
                  <span style={{ fontSize: '12px' }}>{workout.exercise_1}</span>
                  <p style={{ fontSize: '20px' }}>{workout.exercise_1_weight}lbs |  {workout.exercise_1_sets}x{workout.exercise_1_reps}</p>
                </Col>
                { workout.exercise_2
                  ? <Col xs={6} style={{ borderLeft: '0.75px solid #d9534f', height: '50px' }}>
                    <span style={{ fontSize: '12px' }}>{workout.exercise_2}</span>
                    <p style={{ fontSize: '20px' }}>{workout.exercise_2_weight}lbs |   {workout.exercise_2_sets}x{workout.exercise_2_reps}</p>
                  </Col>
                  : null}
              </Row>
              <Row>
                { workout.exercise_3
                  ? <Col xs={6}>
                    <span style={{ fontSize: '12px' }}>{workout.exercise_3}</span>
                    <p style={{ fontSize: '20px' }}>{workout.exercise_3_weight}lbs |  {workout.exercise_3_sets}x{workout.exercise_3_reps}</p>
                  </Col>
                  : null }
                { workout.exercise_4
                  ? <Col xs={6} style={{ borderLeft: '0.75px solid #d9534f', height: '50px' }}>
                    <span style={{ fontSize: '12px' }}>{workout.exercise_4}</span>
                    <p style={{ fontSize: '20px' }}>{workout.exercise_4_weight}lbs |   {workout.exercise_4_sets}x{workout.exercise_4_reps}</p>
                  </Col>
                  : null}
              </Row>
              <Row>
                { workout.exercise_5
                  ? <Col xs={6}>
                    <span style={{ fontSize: '12px' }}>{workout.exercise_5}</span>
                    <p style={{ fontSize: '20px' }}>{workout.exercise_5_weight}lbs |  {workout.exercise_5_sets}x{workout.exercise_5_reps}</p>
                  </Col>
                  : null }
                { workout.exercise_6
                  ? <Col xs={6} style={{ borderLeft: '0.75px solid #d9534f', height: '50px' }}>
                    <span style={{ fontSize: '12px' }}>{workout.exercise_6}</span>
                    <p style={{ fontSize: '20px' }}>{workout.exercise_6_weight}lbs |   {workout.exercise_6_sets}x{workout.exercise_6_reps}</p>
                  </Col>
                  : null}
              </Row>
              <Row>
                { workout.exercise_7
                  ? <Col xs={6}>
                    <span style={{ fontSize: '12px' }}>{workout.exercise_7}</span>
                    <p style={{ fontSize: '20px' }}>{workout.exercise_7_weight}lbs |  {workout.exercise_7_sets}x{workout.exercise_7_reps}</p>
                  </Col>
                  : null }
                { workout.exercise_8
                  ? <Col xs={8} style={{ borderLeft: '0.75px solid #d9534f', height: '50px' }}>
                    <span style={{ fontSize: '12px' }}>{workout.exercise_8}</span>
                    <p style={{ fontSize: '20px' }}>{workout.exercise_8_weight}lbs |   {workout.exercise_8_sets}x{workout.exercise_8_reps}</p>
                  </Col>
                  : null}
              </Row>
              <Row>
                { workout.exercise_9
                  ? <Col xs={6}>
                    <span style={{ fontSize: '12px' }}>{workout.exercise_9}</span>
                    <p style={{ fontSize: '20px' }}>{workout.exercise_9_weight}lbs |  {workout.exercise_9_sets}x{workout.exercise_9_reps}</p>
                  </Col>
                  : null }
                { workout.exercise_10
                  ? <Col xs={10} style={{ borderLeft: '0.75px solid #d9534f', height: '50px' }}>
                    <span style={{ fontSize: '12px' }}>{workout.exercise_10}</span>
                    <p style={{ fontSize: '20px' }}>{workout.exercise_10_weight}lbs |   {workout.exercise_10_sets}x{workout.exercise_10_reps}</p>
                  </Col>
                  : null}
              </Row>
              <Row>
                <Col xs={6}>
                  <span style={{ fontSize: '12px' }}>Time</span>
                  <p style={{ fontSize: '20px' }}>{workout.time_hours ? `${workout.time_hours}h` : ''} {workout.time_minutes ? `${workout.time_minutes}m` : ''} {workout.time_seconds ? `${workout.time_seconds}s` : ''}</p>
                </Col>
              </Row>
            </React.Fragment>
          }
          <Row><Col style={{ borderTop: '0.5px solid white', color: '#F53630' }}><p className='mt-3' >{workout.caption}</p></Col></Row>
        </Container>
      </React.Fragment>
    ))

    return (
      <div style={{ color: 'white', paddingBottom: '100px' }}>
        { loading ? <Spinner style={{ margin: '0 auto', display: 'block', marginTop: '100px' }} animation="border" variant="danger" />
          : workouts }
        <Modal centered show={this.state.show} onHide={handleClose}>
          <Modal.Header className='textCenter' closeButton>
            <Modal.Title className='textCenter'>Edit Workout</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <Row className='mt-2 mb-4' style={{ margin: '0 auto', display: 'block' }}>
              <ButtonGroup className='mr-2' toggle>
                <ToggleButton
                  key={1}
                  type="radio"
                  variant="danger"
                  name="type"
                  value="1"
                  checked={this.state.radioValue === '1'}
                  onChange={handleLiftClick}
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
                  checked={this.state.radioValue === '2'}
                  onChange={handleRunClick}
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
                  checked={this.state.radioValue === '3'}
                  onChange={handleBikeClick}
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
                  checked={this.state.radioValue === '4'}
                  onChange={handleSwimClick}
                  data-type='Swim'
                >
                  <i name='type' data-type='Swim' className="fas fa-swimmer fa-lg"></i>
                </ToggleButton>
              </ButtonGroup>
            </Row>
            { type === 'Lift'
              ? <h4>Lift</h4>
              : null}
            { type === 'Run'
              ? <h4>Run</h4>
              : null}
            { type === 'Bike'
              ? <h4>Bike</h4>
              : null}
            { type === 'Swim'
              ? <h4>Swim</h4>
              : null}
            { type === 'Lift'
              ? <React.Fragment>
                <Row>
                  <Col>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-1">
                        <Form.Label>Exercise 1</Form.Label>
                        <Form.Control
                          required
                          name="exercise_1"
                          value={editedWorkout.exercise_1}
                          type="text"
                          placeholder="Name of exercise"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-1-Weight">
                        <Form.Control
                          required
                          name="exercise_1_weight"
                          value={editedWorkout.exercise_1_weight}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Weight (lbs)"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-1-Sets">
                        <Form.Control
                          required
                          name="exercise_1_sets"
                          value={editedWorkout.exercise_1_sets}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Sets"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-1-Reps">
                        <Form.Control
                          required
                          name="exercise_1_reps"
                          value={editedWorkout.exercise_1_reps}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Reps"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                  <Col>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-2">
                        <Form.Label>Exercise 2</Form.Label>
                        <Form.Control
                          name="exercise_2"
                          value={editedWorkout.exercise_2}
                          type="text"
                          placeholder="Name of exercise"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-2-Weight">
                        <Form.Control
                          name="exercise_2_weight"
                          value={editedWorkout.exercise_2_weight}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Weight (lbs)"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-2-Sets">
                        <Form.Control
                          name="exercise_2_sets"
                          value={editedWorkout.exercise_2_sets}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Sets"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-2-Reps">
                        <Form.Control
                          name="exercise_2_reps"
                          value={editedWorkout.exercise_2_reps}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Reps"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-3">
                        <Form.Label>Exercise 3</Form.Label>
                        <Form.Control
                          name="exercise_3"
                          value={editedWorkout.exercise_3}
                          type="text"
                          placeholder="Name of exercise"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-3-Weight">
                        <Form.Control
                          name="exercise_3_weight"
                          value={editedWorkout.exercise_3_weight}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Weight (lbs)"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-3-Sets">
                        <Form.Control
                          name="exercise_3_sets"
                          value={editedWorkout.exercise_3_sets}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Sets"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-3-Reps">
                        <Form.Control
                          name="exercise_3_reps"
                          value={editedWorkout.exercise_3_reps}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Reps"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                  <Col>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-4">
                        <Form.Label>Exercise 4</Form.Label>
                        <Form.Control
                          name="exercise_4"
                          value={editedWorkout.exercise_4}
                          type="text"
                          placeholder="Name of exercise"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-4-Weight">
                        <Form.Control
                          name="exercise_4_weight"
                          value={editedWorkout.exercise_4_weight}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Weight (lbs)"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-4-Sets">
                        <Form.Control
                          name="exercise_4_sets"
                          value={editedWorkout.exercise_4_sets}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Sets"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-4-Reps">
                        <Form.Control
                          name="exercise_4_reps"
                          value={editedWorkout.exercise_4_reps}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Reps"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-5">
                        <Form.Label>Exercise 5</Form.Label>
                        <Form.Control
                          name="exercise_5"
                          value={editedWorkout.exercise_5}
                          type="text"
                          placeholder="Name of exercise"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-5-Weight">
                        <Form.Control
                          name="exercise_5_weight"
                          value={editedWorkout.exercise_5_weight}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Weight (lbs)"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-5-Sets">
                        <Form.Control
                          name="exercise_5_sets"
                          value={editedWorkout.exercise_5_sets}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Sets"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-5-Reps">
                        <Form.Control
                          name="exercise_5_reps"
                          value={editedWorkout.exercise_5_reps}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Reps"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                  <Col>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-6">
                        <Form.Label>Exercise 6</Form.Label>
                        <Form.Control
                          name="exercise_6"
                          value={editedWorkout.exercise_6}
                          type="text"
                          placeholder="Name of exercise"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-6-Weight">
                        <Form.Control
                          name="exercise_6_weight"
                          value={editedWorkout.exercise_6_weight}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Weight (lbs)"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-6-Sets">
                        <Form.Control
                          name="exercise_6_sets"
                          value={editedWorkout.exercise_6_sets}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Sets"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-6-Reps">
                        <Form.Control
                          name="exercise_6_reps"
                          value={editedWorkout.exercise_6_reps}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Reps"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-7">
                        <Form.Label>Exercise 7</Form.Label>
                        <Form.Control
                          name="exercise_7"
                          value={editedWorkout.exercise_7}
                          type="text"
                          placeholder="Name of exercise"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-7-Weight">
                        <Form.Control
                          name="exercise_7_weight"
                          value={editedWorkout.exercise_7_weight}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Weight (lbs)"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-7-Sets">
                        <Form.Control
                          name="exercise_7_sets"
                          value={editedWorkout.exercise_7_sets}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Sets"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-7-Reps">
                        <Form.Control
                          name="exercise_7_reps"
                          value={editedWorkout.exercise_7_reps}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Reps"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                  <Col>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-8">
                        <Form.Label>Exercise 8</Form.Label>
                        <Form.Control
                          name="exercise_8"
                          value={editedWorkout.exercise_8}
                          type="text"
                          placeholder="Name of exercise"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-8-Weight">
                        <Form.Control
                          name="exercise_8_weight"
                          value={editedWorkout.exercise_8_weight}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Weight (lbs)"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-8-Sets">
                        <Form.Control
                          name="exercise_8_sets"
                          value={editedWorkout.exercise_8_sets}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Sets"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-8-Reps">
                        <Form.Control
                          name="exercise_8_reps"
                          value={editedWorkout.exercise_8_reps}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Reps"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-9">
                        <Form.Label>Exercise 9</Form.Label>
                        <Form.Control
                          name="exercise_9"
                          value={editedWorkout.exercise_9}
                          type="text"
                          placeholder="Name of exercise"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-9-Weight">
                        <Form.Control
                          name="exercise_9_weight"
                          value={editedWorkout.exercise_9_weight}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Weight (lbs)"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-9-Sets">
                        <Form.Control
                          name="exercise_9_sets"
                          value={editedWorkout.exercise_9_sets}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Sets"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-9-Reps">
                        <Form.Control
                          name="exercise_9_reps"
                          value={editedWorkout.exercise_9_reps}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Reps"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                  <Col>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-10">
                        <Form.Label>Exercise 10</Form.Label>
                        <Form.Control
                          name="exercise_10"
                          value={editedWorkout.exercise_10}
                          type="text"
                          placeholder="Name of exercise"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-10-Weight">
                        <Form.Control
                          name="exercise_10_weight"
                          value={editedWorkout.exercise_10_weight}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Weight (lbs)"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-10-Sets">
                        <Form.Control
                          name="exercise_10_sets"
                          value={editedWorkout.exercise_10_sets}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Sets"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', display: 'block', width: '150px' }}>
                      <Form.Group controlId="Exercise-10-Reps">
                        <Form.Control
                          name="exercise_10_reps"
                          value={editedWorkout.exercise_10_reps}
                          type="number"
                          min="0"
                          max="999"
                          placeholder="Reps"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                </Row>
                <p>Time (hr : min : sec)</p>
                <Row style={{ margin: '0 auto', width: '193px' }}>
                  <Col xs={4} className='pl-0' style={{ paddingRight: '2px' }}>
                    <Form.Group controlId="Time-Hours">
                      <Form.Control
                        required
                        name="time_hours"
                        value={this.state.editedWorkout.time_hours}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="0"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={4} style={{ padding: '0 2px' }}>
                    <Form.Group controlId="Time-Mins">
                      <Form.Control
                        required
                        name="time_minutes"
                        value={this.state.editedWorkout.time_minutes}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="0"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={4} className='pr-0' style={{ paddingLeft: '2px' }}>
                    <Form.Group controlId="Time-Secs">
                      <Form.Control
                        required
                        name="time_seconds"
                        value={this.state.editedWorkout.time_seconds}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="0"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
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
              </React.Fragment>
              : <React.Fragment>
                <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                  <Form.Group controlId="Distance">
                    <Form.Label>Distance (mi)</Form.Label>
                    <Form.Control
                      required
                      name="distance"
                      value={distance}
                      type="number"
                      min="0"
                      max="99"
                      placeholder="Enter distance"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                <p>Time (hr : min : sec)</p>
                <Row style={{ margin: '0 auto', width: '193px' }}>
                  <Col xs={4} className='pl-0' style={{ paddingRight: '2px' }}>
                    <Form.Group controlId="Time-Hours">
                      <Form.Control
                        required
                        name="time_hours"
                        value={this.state.editedWorkout.time_hours}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="0"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={4} style={{ padding: '0 2px' }}>
                    <Form.Group controlId="Time-Mins">
                      <Form.Control
                        required
                        name="time_minutes"
                        value={this.state.editedWorkout.time_minutes}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="0"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={4} className='pr-0' style={{ paddingLeft: '2px' }}>
                    <Form.Group controlId="Time-Secs">
                      <Form.Control
                        required
                        name="time_seconds"
                        value={this.state.editedWorkout.time_seconds}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="0"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
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
              </React.Fragment>
            }

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={onEditWorkout}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default Workouts
