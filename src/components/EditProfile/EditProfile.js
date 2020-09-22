import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { editProfile, getUser } from '../../api/workout'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class EditProfile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      editedProfile: {}
    }
  }

  componentDidMount () {
    getUser(this.props.match.params.id, this.props.user)
      .then(res => this.setState({ editedProfile: res.data.user }))
      .catch(console.error)
  }

  handleChange = event => {
    event.persist()
    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedProfile = Object.assign({}, prevState.editedProfile, updatedField)
      return { editedProfile: editedProfile }
    })
  }

  onSubmit = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    editProfile(user, this.state.editedProfile)
      .then(() => msgAlert({
        heading: 'Successfully updated profile!',
        variant: 'success'
      }))
      .then(() => history.push(`/users/${user.id}`))
      .catch(error => {
        msgAlert({
          heading: 'Update profile failed with error: ' + error.message,
          message: messages.editProfileFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, city, state, country, bio, gender, height, weight } = this.state.editedProfile

    return (
      <div className="row" style={{ color: 'white', paddingBottom: '100px' }}>
        <div className="col-sm-10 col-md-8 mx-auto">
          <h3 className='mt-5' style={{ textAlign: 'center', color: 'white' }}>Edit Profile</h3>
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                name="name"
                value={name}
                type="text"
                placeholder="Enter name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                name="city"
                value={city}
                type="text"
                placeholder="Enter city"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                required
                name="state"
                value={state}
                type="text"
                placeholder="Enter state"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                required
                name="country"
                value={country}
                type="text"
                placeholder="Enter country"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="proPic">
              <Form.Label>Profile Picture (URL)</Form.Label>
              <Form.Control
                required
                name="pro_pic"
                value={this.state.editedProfile.pro_pic}
                type="text"
                placeholder="Enter profile pic URL"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                required
                name="bio"
                value={bio}
                type="text"
                placeholder="Enter bio"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                required
                name="gender"
                value={gender}
                type="text"
                placeholder="Enter gender"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="height">
              <Form.Label>Height (in)</Form.Label>
              <Form.Control
                required
                name="height"
                value={height}
                type="number"
                placeholder="Enter height (in)"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="weight">
              <Form.Label>Weight (lb)</Form.Label>
              <Form.Control
                required
                name="weight"
                value={weight}
                type="number"
                placeholder="Enter weight (lb)"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="danger"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(EditProfile)
