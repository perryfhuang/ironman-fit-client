import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Button, Form, ButtonGroup, ToggleButton } from 'react-bootstrap'
// import { indexWorkouts } from '../../api/workout'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class LogWorkout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      radioValue: '1',
      workout: {
        type: 'Lift',
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

  handleLiftClick = event => {
    event.persist()
    console.log('This is value of clicked radio button', event.target.value)
    this.setState(prevState => {
      const updatedWorkoutType = { type: 'Lift' }
      const editedWorkout = Object.assign({}, prevState.workout, updatedWorkoutType)
      return { radioValue: event.target.value, workout: editedWorkout }
    })
    console.log(this.state)
  }
  handleRunClick = event => {
    event.persist()
    console.log('This is value of clicked radio button', event.target.value)
    this.setState(prevState => {
      const updatedWorkoutType = { type: 'Run' }
      const editedWorkout = Object.assign({}, prevState.workout, updatedWorkoutType)
      // return the state change, of setting the `post` state to its new value of
      // `editedpost`
      return { radioValue: event.target.value, workout: editedWorkout }
    })
  }
  handleBikeClick = event => {
    event.persist()
    this.setState(prevState => {
      const updatedWorkoutType = { type: 'Bike' }
      const editedWorkout = Object.assign({}, prevState.workout, updatedWorkoutType)
      // return the state change, of setting the `post` state to its new value of
      // `editedpost`
      return { radioValue: event.target.value, workout: editedWorkout }
    })
  }
  handleSwimClick = event => {
    event.persist()
    this.setState(prevState => {
      const updatedWorkoutType = { type: 'Swim' }
      const editedWorkout = Object.assign({}, prevState.workout, updatedWorkoutType)
      // return the state change, of setting the `post` state to its new value of
      // `editedpost`
      return { radioValue: event.target.value, workout: editedWorkout }
    })
  }

  handleChange = event => {
    event.persist()
    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedWorkout = Object.assign({}, prevState.workout, updatedField)
      return { workout: editedWorkout }
    })
  }

  handleSubmit = event => {
  // prevent the page from refreshing
    event.preventDefault()
    axios({
      url: `${apiUrl}/workouts/`,
      method: 'POST',
      // send the new value for the workout, which comes from `this.state`
      data: { workout: this.state.workout },
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(res => console.log(res))
      // after successful post request, redirect to Feed
      .then(() => this.props.history.push('/workouts'))
      // clear all forms after successful POST
      .catch(console.error)
  }

  render () {
    const { handleLiftClick, handleRunClick, handleBikeClick, handleSwimClick, handleChange, handleSubmit } = this
    const { distance, time, caption, type } = this.state.workout

    // alt border color: rgba(255, 255, 255, 0.5)
    const logWorkoutStyling = {
      border: '1px solid white',
      width: '600px',
      color: 'white'
    }

    const logWorkoutForm = (
      <Container style={logWorkoutStyling} className="text-center">
        <Form onSubmit={handleSubmit} className="text-center">
          <Row className='mt-4 mb-4' style={{ margin: '0 auto', display: 'block' }}>
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
            ? <h4 className='mb-4'>Lift</h4>
            : null}
          { type === 'Run'
            ? <h4 className='mb-4'>Run</h4>
            : null}
          { type === 'Bike'
            ? <h4 className='mb-4'>Bike</h4>
            : null}
          { type === 'Swim'
            ? <h4 className='mb-4'>Swim</h4>
            : null}
          { type === 'Lift'
            ? <React.Fragment>
              <Row>
                <Col>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-1">
                      <Form.Label>Exercise 1</Form.Label>
                      <Form.Control
                        required
                        name="exercise_1"
                        value={this.state.workout.exercise_1}
                        type="text"
                        placeholder="Name of exercise"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-1-Weight">
                      <Form.Control
                        required
                        name="exercise_1_weight"
                        value={this.state.workout.exercise_1_weight}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Weight (lbs)"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-1-Sets">
                      <Form.Control
                        required
                        name="exercise_1_sets"
                        value={this.state.workout.exercise_1_sets}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Sets"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-1-Reps">
                      <Form.Control
                        required
                        name="exercise_1_reps"
                        value={this.state.workout.exercise_1_reps}
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
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-2">
                      <Form.Label>Exercise 2</Form.Label>
                      <Form.Control
                        name="exercise_2"
                        value={this.state.workout.exercise_2}
                        type="text"
                        placeholder="Name of exercise"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-2-Weight">
                      <Form.Control
                        name="exercise_2_weight"
                        value={this.state.workout.exercise_2_weight}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Weight (lbs)"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-2-Sets">
                      <Form.Control
                        name="exercise_2_sets"
                        value={this.state.workout.exercise_2_sets}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Sets"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-2-Reps">
                      <Form.Control
                        name="exercise_2_reps"
                        value={this.state.workout.exercise_2_reps}
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
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-3">
                      <Form.Label>Exercise 3</Form.Label>
                      <Form.Control
                        name="exercise_3"
                        value={this.state.workout.exercise_3}
                        type="text"
                        placeholder="Name of exercise"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-3-Weight">
                      <Form.Control
                        name="exercise_3_weight"
                        value={this.state.workout.exercise_3_weight}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Weight (lbs)"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-3-Sets">
                      <Form.Control
                        name="exercise_3_sets"
                        value={this.state.workout.exercise_3_sets}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Sets"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-3-Reps">
                      <Form.Control
                        name="exercise_3_reps"
                        value={this.state.workout.exercise_3_reps}
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
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-4">
                      <Form.Label>Exercise 4</Form.Label>
                      <Form.Control
                        name="exercise_4"
                        value={this.state.workout.exercise_4}
                        type="text"
                        placeholder="Name of exercise"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-4-Weight">
                      <Form.Control
                        name="exercise_4_weight"
                        value={this.state.workout.exercise_4_weight}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Weight (lbs)"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-4-Sets">
                      <Form.Control
                        name="exercise_4_sets"
                        value={this.state.workout.exercise_4_sets}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Sets"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-4-Reps">
                      <Form.Control
                        name="exercise_4_reps"
                        value={this.state.workout.exercise_4_reps}
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
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-5">
                      <Form.Label>Exercise 5</Form.Label>
                      <Form.Control
                        name="exercise_5"
                        value={this.state.workout.exercise_5}
                        type="text"
                        placeholder="Name of exercise"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-5-Weight">
                      <Form.Control
                        name="exercise_5_weight"
                        value={this.state.workout.exercise_5_weight}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Weight (lbs)"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-5-Sets">
                      <Form.Control
                        name="exercise_5_sets"
                        value={this.state.workout.exercise_5_sets}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Sets"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-5-Reps">
                      <Form.Control
                        name="exercise_5_reps"
                        value={this.state.workout.exercise_5_reps}
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
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-6">
                      <Form.Label>Exercise 6</Form.Label>
                      <Form.Control
                        name="exercise_6"
                        value={this.state.workout.exercise_6}
                        type="text"
                        placeholder="Name of exercise"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-6-Weight">
                      <Form.Control
                        name="exercise_6_weight"
                        value={this.state.workout.exercise_6_weight}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Weight (lbs)"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-6-Sets">
                      <Form.Control
                        name="exercise_6_sets"
                        value={this.state.workout.exercise_6_sets}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Sets"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-6-Reps">
                      <Form.Control
                        name="exercise_6_reps"
                        value={this.state.workout.exercise_6_reps}
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
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-7">
                      <Form.Label>Exercise 7</Form.Label>
                      <Form.Control
                        name="exercise_7"
                        value={this.state.workout.exercise_7}
                        type="text"
                        placeholder="Name of exercise"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-7-Weight">
                      <Form.Control
                        name="exercise_7_weight"
                        value={this.state.workout.exercise_7_weight}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Weight (lbs)"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-7-Sets">
                      <Form.Control
                        name="exercise_7_sets"
                        value={this.state.workout.exercise_7_sets}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Sets"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-7-Reps">
                      <Form.Control
                        name="exercise_7_reps"
                        value={this.state.workout.exercise_7_reps}
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
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-8">
                      <Form.Label>Exercise 8</Form.Label>
                      <Form.Control
                        name="exercise_8"
                        value={this.state.workout.exercise_8}
                        type="text"
                        placeholder="Name of exercise"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-8-Weight">
                      <Form.Control
                        name="exercise_8_weight"
                        value={this.state.workout.exercise_8_weight}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Weight (lbs)"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-8-Sets">
                      <Form.Control
                        name="exercise_8_sets"
                        value={this.state.workout.exercise_8_sets}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Sets"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-8-Reps">
                      <Form.Control
                        name="exercise_8_reps"
                        value={this.state.workout.exercise_8_reps}
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
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-9">
                      <Form.Label>Exercise 9</Form.Label>
                      <Form.Control
                        name="exercise_9"
                        value={this.state.workout.exercise_9}
                        type="text"
                        placeholder="Name of exercise"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-9-Weight">
                      <Form.Control
                        name="exercise_9_weight"
                        value={this.state.workout.exercise_9_weight}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Weight (lbs)"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-9-Sets">
                      <Form.Control
                        name="exercise_9_sets"
                        value={this.state.workout.exercise_9_sets}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Sets"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-9-Reps">
                      <Form.Control
                        name="exercise_9_reps"
                        value={this.state.workout.exercise_9_reps}
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
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-10">
                      <Form.Label>Exercise 10</Form.Label>
                      <Form.Control
                        name="exercise_10"
                        value={this.state.workout.exercise_10}
                        type="text"
                        placeholder="Name of exercise"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-10-Weight">
                      <Form.Control
                        name="exercise_10_weight"
                        value={this.state.workout.exercise_10_weight}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Weight (lbs)"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-10-Sets">
                      <Form.Control
                        name="exercise_10_sets"
                        value={this.state.workout.exercise_10_sets}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Sets"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                    <Form.Group controlId="Exercise-10-Reps">
                      <Form.Control
                        name="exercise_10_reps"
                        value={this.state.workout.exercise_10_reps}
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
              <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                <Form.Group controlId="Total-Time">
                  <Form.Label>Total Time (sec)</Form.Label>
                  <Form.Control
                    required
                    name="time"
                    value={time}
                    type="number"
                    min="0"
                    max="99999"
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
              <Row style={{ margin: '0 auto', display: 'block', width: '193px' }}>
                <Form.Group controlId="Time">
                  <Form.Label>Time (sec)</Form.Label>
                  <Form.Control
                    required
                    name="time"
                    value={time}
                    type="number"
                    min="0"
                    max="99999"
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
            </React.Fragment>
          }
          <Button className='mt-4 mb-5' variant="primary" type='submit'>Submit</Button>
        </Form>
      </Container>
    )

    return (
      <div>
        {logWorkoutForm}
      </div>
    )
  }
}

export default withRouter(LogWorkout)
