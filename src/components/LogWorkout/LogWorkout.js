import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Button, Form, ButtonGroup, ToggleButton } from 'react-bootstrap'
// import { indexWorkouts } from '../../api/workout'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class LogWorkout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      radioValue: 1,
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
    this.setState(prevState => {
      const updatedWorkoutType = { type: 'Bike' }
      const editedWorkout = Object.assign({}, prevState.workout, updatedWorkoutType)
      // return the state change, of setting the `post` state to its new value of
      // `editedpost`
      return { workout: editedWorkout }
    })
  }
  handleSwimClick = event => {
    this.setState(prevState => {
      const updatedWorkoutType = { type: 'Swim' }
      const editedWorkout = Object.assign({}, prevState.workout, updatedWorkoutType)
      // return the state change, of setting the `post` state to its new value of
      // `editedpost`
      return { workout: editedWorkout }
    })
  }

  handleChange = event => {
    event.persist()
    // Updating our state will depend on the previous state, so we use the `updater`
    // callback, to get access to our previous state
    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedWorkout = Object.assign({}, prevState.workout, updatedField)
      // return the state change, of setting the `post` state to its new value of
      // `editedpost`
      return { workout: editedWorkout }
    })
  }

  handleSubmit = event => {
  // prevent the page from refreshing
    console.log(this.state)
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
      // after successful post request, redirect to Feed
      .then(() => history.push('/workouts'))
      // clear all forms after successful POST
      .catch(console.error)

    // .then(() => this.setState({ post: {
    //   body: ''
    // } }))
    // .then(() => {
    //   document.querySelector('.tweetBox').value = ''
    // })
    // .then(() => indexPosts(this.props.user)
    //   .then(res => this.props.setPosts(res.data.posts.reverse()))
    //   .catch(console.error)
    // )
    // .catch(console.error)
  }

  render () {
    const { handleLiftClick, handleRunClick, handleChange, handleSubmit } = this
    const { distance, time, caption } = this.state.workout

    const logWorkoutStyling = {
      border: '1px solid rgba(255, 255, 255, 0.5)',
      width: '600px',
      color: 'white',
      margin: '0 auto'
    }

    // const [radioValue, setRadioValue] = useState('1')
    //
    // const radios = [
    //   { name: 'Active', value: '1' },
    //   { name: 'Radio', value: '2' },
    //   { name: 'Radio', value: '3' },
    // ]

    const logWorkoutForm = (
      <Container style={logWorkoutStyling} className="text-center">
        <Form onSubmit={handleSubmit}>
          <Row>
            <ButtonGroup toggle>
              <ToggleButton
                key={1}
                type="radio"
                variant="primary"
                name="type"
                value="1"
                checked={this.state.radioValue === 1}
                onChange={handleLiftClick}
              >
                <i name='type' data-type='Lift' className="fas fa-dumbbell"></i>
              </ToggleButton>
            </ButtonGroup>
            <ButtonGroup toggle>
              <ToggleButton
                key={2}
                type="radio"
                variant="primary"
                name="type"
                value="2"
                checked={this.state.radioValue === 2}
                onChange={handleRunClick}
              >
                <i name='type' data-type='Lift' className="fas fa-running"></i>
              </ToggleButton>
            </ButtonGroup>
            {/* <Col><Button name='type' data-type='Lift' onClick={handleLiftClick}><i name='type' data-type='Lift' className="fas fa-dumbbell"></i></Button></Col>
            <Col><Button name='type' data-type='Run' onClick={handleRunClick}><i name='type' data-type='Run' className="fas fa-running"></i></Button></Col>
            <Col><Button name='type' data-type='Bike' onClick={handleBikeClick}><i name='type' data-type='Bike' className="fas fa-bicycle"></i></Button></Col>
            <Col><Button name='type' data-type='Swim' onClick={handleSwimClick}><i name='type' data-type='Swim' className="fas fa-swimmer"></i></Button></Col> */}
          </Row>
          { this.state.workout.type === 'Lift'
            ? <React.Fragment>
              <Row>
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
              <Row>
                <Form.Group controlId="Exercise-1-Weight">
                  <Form.Control
                    required
                    name="exercise_1_weight"
                    value={this.state.workout.exercise_1_weight}
                    type="number"
                    min="0"
                    placeholder="Weight"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group controlId="Exercise-1-Sets">
                  <Form.Control
                    required
                    name="exercise_1_sets"
                    value={this.state.workout.exercise_1_sets}
                    type="number"
                    min="0"
                    placeholder="Sets"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group controlId="Exercise-1-Reps">
                  <Form.Control
                    required
                    name="exercise_1_reps"
                    value={this.state.workout.exercise_1_reps}
                    type="number"
                    min="0"
                    placeholder="Reps"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
            </React.Fragment>
            : <React.Fragment>
              <Row>
                <Form.Group controlId="Distance">
                  <Form.Label>Distance</Form.Label>
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
              <Row>
                <Form.Group controlId="Time">
                  <Form.Label>Time (seconds)</Form.Label>
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
              <Row>
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
          <Button variant="primary" type='submit'>Submit</Button>
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
