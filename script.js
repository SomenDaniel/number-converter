// selectors
const btn = document.querySelector(".converter");
const resultNum = document.querySelector(".result");
const userNumber = document.querySelector("#number");
const displayError = document.querySelector(".error");

// variables
let result = "";
let splitted;
let error = "";
let value;

// Number helpers.
const oneDigit = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

const twoDigit = {
  1: "ten",
  2: "twenty",
  3: "thirty",
  4: "forty",
  5: "fifty",
  6: "sixty",
  7: "seventy",
  8: "eighty",
  9: "ninety",
  11: "eleven",
  12: "twelve",
  14: "fourteen",
};

// Functions
const twoDigits = (array) => {
  let num = "";
  if (array[1] === "0") {
    num = twoDigit[array[0]];
  }

  if (array[0] === "1") {
    if (array[1] === "0") {
      num = twoDigit[array[0]];
    } else if (array[1] === "1") {
      num = twoDigit[11];
    } else if (array[1] === "2") {
      num = twoDigit[12];
    } else if (array[1] === "4") {
      num = twoDigit[14];
    } else {
      num = twoDigit[array[1]].slice(0, -1) + "een";
    }
  }

  if (array[1] !== "0" && array[0] !== "1") {
    num = `${twoDigit[array[0]]}-${oneDigit[array[1]]}`;
  }
  return num;
};

const hundreds = (array) => {
  let num = "";
  if (array[1] === "0" && array[2] === "0") {
    num = `${oneDigit[array[0]]} hundred`;
  } else {
    if (array[1] === "0") {
      num = `${oneDigit[array[0]]} hundred and ${oneDigit[array[2]]}`;
    } else {
      num = `${oneDigit[array[0]]} hundred and ${twoDigits([
        array[1],
        array[2],
      ])}`;
    }
  }
  return num;
};

const thousands = (array) => {
  let num = "";
  let zeros = array.filter((el) => el === "0");
  if (zeros.length === array.length - 1) {
    num = `${oneDigit[array[0]]} thousand`;
  } else if (array[1] !== "0") {
    num = `${oneDigit[array[0]]} thousand ${hundreds(array.slice(1))}`;
  } else if (array[2] !== "0") {
    num = `${oneDigit[array[0]]} thousand and ${twoDigits(array.slice(2))}`;
  } else {
    num = `${oneDigit[array[0]]} thousand and ${oneDigit[array[3]]}`;
  }
  return num;
};

const tenThousands = (array) => {
  let num = "";
  let zeros = array.filter((el) => el === "0");
  if (array[2] === "0" && array[3] === "0" && array[4] === "0") {
    num = `${twoDigits([array[0], array[1]])} thousand`;
  } else if (array[2] !== "0") {
    num = `${twoDigits([array[0], array[1]])} thousand ${hundreds(
      array.slice(2)
    )}`;
  } else if (array[3] !== "0") {
    num = `${twoDigits([array[0], array[1]])} thousand and ${twoDigits(
      array.slice(3)
    )}`;
  } else {
    num = `${twoDigits([array[0], array[1]])} thousand and ${
      oneDigit[array[4]]
    }`;
  }

  return num;
};

const hundredThousands = (array) => {
  let num = "";
  let half = array.slice(3);
  let zeros = half.filter((el) => el === "0");
  if (zeros.length === 3) {
    num = `${hundreds([array[0], array[1], array[2]])} thousand`;
  } else if (array[3] !== "0") {
    num = `${hundreds([array[0], array[1], array[2]])} thousand ${hundreds(
      half
    )}`;
  } else if (array[4] !== "0") {
    num = `${hundreds([array[0], array[1], array[2]])} thousand and ${twoDigits(
      array.slice(4)
    )}`;
  } else {
    num = `${hundreds([array[0], array[1], array[2]])} thousand and ${
      oneDigit[array[5]]
    }`;
  }
  return num;
};

const millions = (array) => {
  let num = "";
  let zeros = array.filter((el) => el === "0");
  if (zeros.length === 6) {
    num = `${oneDigit[array[0]]} million`;
  } else if (array[1] !== "0") {
    num = `${oneDigit[array[0]]} million ${hundredThousands(array.slice(1))}`;
  } else if (array[2] !== "0") {
    num = `${oneDigit[array[0]]} million ${tenThousands(array.slice(2))}`;
  } else if (array[3] !== "0") {
    num = `${oneDigit[array[0]]} million ${thousands(array.slice(3))}`;
  } else if (array[4] !== "0") {
    num = `${oneDigit[array[0]]} million ${hundreds(array.slice(4))}`;
  } else if (array[5] !== "0") {
    num = `${oneDigit[array[0]]} million and ${twoDigits(array.slice(5))}`;
  } else {
    num = `${oneDigit[array[0]]} million and ${oneDigit[array[6]]}`;
  }
  return num;
};

// Number helper.
const lengthHelper = [
  oneDigit,
  twoDigits,
  hundreds,
  thousands,
  tenThousands,
  hundredThousands,
  millions,
];

// the onclick function
btn.addEventListener("click", function () {
  value = "";
  error = "";
  number = userNumber.value;
  splitted = userNumber.value.split("");
  const rigthFunction = lengthHelper[splitted.length - 1];
  if (splitted.length === 0) {
    error = "This is not a number!";
    value = "";
  } else if (splitted[0] === "-") {
    error = "We do not accept negative numbers!";
    value = "";
  } else if (splitted.length > 7) {
    error = "This converter is working for seven digits!";
    value = "";
  } else if (splitted.length > 1 && splitted[0] === "0") {
    error = "We do not accept numbers starting with zero! ";
    value = "";
  } else {
    if (splitted.length === 1 && splitted[0] === "0") {
      value = "zero";
      error = "";
    } else if (splitted.length === 1) {
      value = rigthFunction[splitted];
      error = "";
    } else {
      value = rigthFunction(splitted);
      error = "";
    }
  }
  displayError.innerHTML = error;
  resultNum.innerHTML = value;
});
