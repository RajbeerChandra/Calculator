const axios = require("axios");

async function fetchNumber(numberId) {
  const baseUrl = "http://20.244.56.144/test/";
  let url;

  switch (numberId) {
    case "p":
      url = `${baseUrl}primes`;
      break;
    case "f":
      url = `${baseUrl}fibo`;
      break;
    case "e":
      url = `${baseUrl}even`;
      break;
    case "r":
      url = `${baseUrl}rand`;
      break;
    default:
      return null;
  }
   const token = process.env.TOKEN;

  try {
    const response = await axios.get(url, {
		headers: {
		  Authorization: `Bearer ${token}`,
		},
	  });
    return response.data.number;
  } catch (error) {
    console.error("Error fetching number:", error);
    return null;
  }
}

function calculateAverage() {
  const numbers = Array.from(numberSet);
  if (numbers.length === 0) return null;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

module.exports = {
  fetchNumber,
  calculateAverage,
};
