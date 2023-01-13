const baseUrl = "http://localhost:3001";
const rhymeUrl = "https://api.datamuse.com/words";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
}

const getNote = (id) => {
  return fetch(`${baseUrl}/notes/:_id`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ _id: id }),
  }).then(checkResponse);
};

const createNote = () => {
  return fetch(`${baseUrl}/notes/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
};

const deleteNote = (id) => {
  return fetch(`${baseUrl}/notes:_id`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ _id: id })
  }).then(checkResponse);
}

const getNotes = () => {
  return fetch(`${baseUrl}/notes`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
};

const saveNote = (title, body, id) => {
  return fetch(`${baseUrl}/notes/:_id`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ title, body, _id: id }),
  }).then(checkResponse);
};

const login = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

const checkAuth = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

const createUser = (name, avatar, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
};

const editUser = (name, avatar) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
};

const getRhyme = (word, engine, topic, max) => {
  return fetch(
    `${rhymeUrl}?rel_rhy=${word}&${engine}=${topic}&max=${max}`
  ).then(checkResponse);
};

const getSoundAlike = (word, engine, topic, max) => {
  return fetch(
    `${rhymeUrl}?rel_nry=${word}&${engine}=${topic}&max=${max}`
  ).then(this._checkResponse);
};

const getRelatedAdjectives = (word, engine, topic, max) => {
  return fetch(
    `${rhymeUrl}?rel_jja=${word}&${engine}=${topic}&max=${max}`
  ).then(this._checkResponse);
};

const getRelatedNouns = (word, engine, topic, max) => {
  return fetch(
    `${rhymeUrl}?rel_jjb=${word}&${engine}=${topic}&max=${max}`
  ).then(this._checkResponse);
};

const getRelatedWords = (word, engine, topic, max) => {
  return fetch(
    `${rhymeUrl}?rel_trg=${word}&${engine}=${topic}&max=${max}`
  ).then(this._checkResponse);
};

const getSynonyms = (word, engine, topic, max) => {
  return fetch(
    `${rhymeUrl}?rel_syn=${word}&${engine}=${topic}&max=${max}`
  ).then(this._checkResponse);
};

const getAntonyms = (word, engine, topic, max) => {
  return fetch(
    `${rhymeUrl}?rel_ant=${word}&${engine}=${topic}&max=${max}`
  ).then(this._checkResponse);
};

const getFrequentFollowers = (word, engine, topic, max) => {
  return fetch(
    `${rhymeUrl}?rel_bga=${word}&${engine}=${topic}&max=${max}`
  ).then(this._checkResponse);
};

export {
  getNotes,
  createNote,
  deleteNote,
  saveNote,
  login,
  checkAuth,
  createUser,
  editUser,
  getRhyme,
  getSoundAlike,
  getRelatedAdjectives,
  getRelatedNouns,
  getRelatedWords,
  getAntonyms,
  getFrequentFollowers,
  getSynonyms,
};
