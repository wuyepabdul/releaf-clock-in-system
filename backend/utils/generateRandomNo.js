// generate a random number
const generateRandomNumber = (initials) => {
  const number = `${initials}_` + Math.floor(Math.random() * 10000) + `_RF`;
  return number;
};

export default generateRandomNumber;
