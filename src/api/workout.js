import apiUrl from '../apiConfig'
import axios from 'axios'

export const getUsers = () => {
  return axios(apiUrl + '/users')
}

export const getUser = (id) => {
  return axios(apiUrl + '/users/' + id)
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

export const deleteWorkout = (user, workoutId) => {
  return axios({
    url: `${apiUrl}/workouts/${workoutId}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const editWorkout = (user, workoutId, editedWorkout) => {
  return axios({
    url: `${apiUrl}/workout/${workoutId}`,
    method: 'PATCH',
    data: { post: {
      body: editedWorkout
    }
    },
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}