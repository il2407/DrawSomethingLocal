import axios from "axios";

const getGameData = (url) => axios.get(url);

const createGameData = (url, word, time, points, score) =>
  axios.post(url, {
    name: "gameData",
    word: word,
    time: time,
    points: points,
    score: score,
  });

const updateGameData = (url, newWord, newPoints, newTime, newScore) =>
  axios.put(url, {
    newWord: newWord,
    newTime: newTime,
    newPoints: newPoints,
    newScore: newScore,
  });

export { getGameData, createGameData, updateGameData };
