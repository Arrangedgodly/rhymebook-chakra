const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.rhymebook.graydonwasil.com"
    : "http://localhost:3001";
const rhymeUrl = "https://api.datamuse.com/words";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
}

const getNote = (id) => {
  return fetch(`${baseUrl}/notes/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
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
  return fetch(`${baseUrl}/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
};

const getNotes = () => {
  return fetch(`${baseUrl}/notes`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
};

const saveNote = (title, body, id) => {
  return fetch(`${baseUrl}/notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ title, body }),
  }).then(checkResponse);
};

const addNoteTag = (name, color, id) => {
  const tag = { name, color };
  return fetch(`${baseUrl}/notes/${id}/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ tag }),
  }).then(checkResponse);
};

const deleteNoteTag = (noteId, tagId) => {
  return fetch(`${baseUrl}/notes/${noteId}/tags/${tagId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
};

const addNotePin = (id) => {
  return fetch(`${baseUrl}/notes/${id}/pin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
};

const deleteNotePin = (id) => {
  return fetch(`${baseUrl}/notes/${id}/pin`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
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

const createUser = (name, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
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

const updatePref = (rhy, sdl, adj, noun, rlwd, syn, ant, fqfl, engine, max) => {
  return fetch(`${baseUrl}/users/me/pref`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      preferences: {
        rhy,
        sdl,
        adj,
        noun,
        rlwd,
        syn,
        ant,
        fqfl,
        engine,
        max,
      },
    }),
  }).then(checkResponse);
};

const updateInfo = (name, avatar, email) => {
  return fetch(`${baseUrl}/users/me/info`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ name, avatar, email }),
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
  ).then(checkResponse);
};

const getRelatedAdjectives = (word, engine, topic, max) => {
  return fetch(
    `${rhymeUrl}?rel_jja=${word}&${engine}=${topic}&max=${max}`
  ).then(checkResponse);
};

const getRelatedNouns = (word, engine, topic, max) => {
  return fetch(
    `${rhymeUrl}?rel_jjb=${word}&${engine}=${topic}&max=${max}`
  ).then(checkResponse);
};

const getRelatedWords = (word, engine, topic, max) => {
  return fetch(
    `${rhymeUrl}?rel_trg=${word}&${engine}=${topic}&max=${max}`
  ).then(checkResponse);
};

const getSynonyms = (word, engine, topic, max) => {
  return fetch(
    `${rhymeUrl}?rel_syn=${word}&${engine}=${topic}&max=${max}`
  ).then(checkResponse);
};

const getAntonyms = (word, engine, topic, max) => {
  return fetch(
    `${rhymeUrl}?rel_ant=${word}&${engine}=${topic}&max=${max}`
  ).then(checkResponse);
};

const getFrequentFollowers = (word, engine, topic, max) => {
  return fetch(
    `${rhymeUrl}?rel_bga=${word}&${engine}=${topic}&max=${max}`
  ).then(checkResponse);
};

export {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  saveNote,
  addNoteTag,
  deleteNoteTag,
  addNotePin,
  deleteNotePin,
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
  updatePref,
  updateInfo,
};
