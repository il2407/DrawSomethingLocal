import axios from "axios";

const getAll = (url) => axios.get(url);

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

export { getAll, createSession, updateSession };
