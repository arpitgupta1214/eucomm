import padNumber from "./padNumber";

const formatSeconds = (totalSeconds) => {
  const minutes = parseInt(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  return `${padNumber(minutes)}:${padNumber(seconds)}`;
};

export default formatSeconds;
