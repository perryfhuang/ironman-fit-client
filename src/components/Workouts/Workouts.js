import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Image, Container, Row, Col } from 'react-bootstrap'
import { indexWorkouts } from '../../api/workout'
// import apiUrl from '../../apiConfig'
// import axios from 'axios'

class Workouts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      workouts: [],
      deleted: false,
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

  render () {
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

    // DROPDOWN options if you are owner of the workout
    // { this.props.workout.id === workout.owner._id
    //   ? <div style={{ display: 'inline-block', float: 'right' }}>
    //     <DropdownButton
    //       as={ButtonGroup}
    //       id='posts-dropdown'
    //       size="sm"
    //       variant="secondary"
    //       title=""
    //     >
    //       <Dropdown.Item onClick={handleShow} data-postid={post._id} eventKey="1">Edit</Dropdown.Item>
    //       <Dropdown.Item onClick={onDeletePost} data-postid={post._id} eventKey="2">Delete</Dropdown.Item>
    //     </DropdownButton>
    //   </div>
    //   : null }

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
      </div>
    )
  }
}

export default Workouts
