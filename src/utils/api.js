const baseUrl = 'http://localhost:3001';

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
}

const getNotes = (user) => {
  return fetch(`${baseUrl}/notes`, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8', 
    }
  })
    .then(checkResponse)
}

const login = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      },
    body: JSON.stringify({ email, password }) 
  })
    .then(checkResponse)
}

const checkAuth = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    }
  })
    .then(checkResponse)
}

const createUser = (name, avatar, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }) 
  })
    .then(checkResponse)
}

const editUser = (name, avatar) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ name, avatar })
  })
    .then(checkResponse)
}

export { getNotes, login, checkAuth, createUser, editUser };