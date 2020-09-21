import apiUrl from '../apiConfig'
import axios from 'axios'

export const getUsers = (user) => {
  return axios({
    url: apiUrl + '/users/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const getUser = (id, user) => {
  return axios({
    url: apiUrl + '/users/' + id + '/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const editProfile = (user, editedProfile) => {
  return axios({
    url: apiUrl + '/users/' + user.id + '/',
    method: 'PATCH',
    data: { user: editedProfile },
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const indexWorkouts = user => {
  return axios({
    url: apiUrl + '/workouts/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const getWorkout = (user, workoutId) => {
  return axios({
    url: `${apiUrl}/workouts/${workoutId}/`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const deleteWorkout = (user, workoutId) => {
  return axios({
    url: `${apiUrl}/workouts/${workoutId}/`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const editWorkout = (user, workoutId, editedWorkout) => {
  return axios({
    url: `${apiUrl}/workouts/${workoutId}/`,
    method: 'PATCH',
    data: { workout: editedWorkout },
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
