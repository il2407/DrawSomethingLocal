import axios from "axios";

const getSession = (url) => axios.get(url);

const createSession = (url, score, time) =>
  axios.post(url, {
    score: score,
    time: time,
  });

const updateSession = (url, newScore, newTime) =>
  axios.put(url, {
    newScore: newScore,
    newTime: newTime,
  });

export { getSession, createSession, updateSession };
