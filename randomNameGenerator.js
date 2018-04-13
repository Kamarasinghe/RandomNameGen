// shape of the data

// name will be a string "first middle last"
// this data comes from the name arrays of first, middle and last


const RndmName = function() {
  let randomFirstName = this.genRandomName(firstNames);
  let randomMiddleName = this.genRandomName(middleNames);
  let randomLastName = this.genRandomName(lastNames);
  
  this.firstName = randomFirstName();
  this.middleName = randomMiddleName();
  this.lastName = randomLastName();
};

RndmName.prototype.genRandomName = function(names) {
  let max = firstNames.length - 1;
  let prev;
  return function random() {
    let randomNum = Math.floor(Math.random() * max);
    prev = (names[randomNum] === prev) ? random() : names[randomNum];
    return prev;
  };
};

const grabNamesWithInitial = function(initial) {
  let initials = initial.split('.');
  let firstInit = initials[0];
  let middleInit = initials[1];
  let lastInit = initials[2];
  
  let firstInits = firstNames.filter(function(name) {
    return (name.slice(0, 1) === firstInit);
  });
  
  let middleInits = middleNames.filter(function(name) {
    return (name.slice(0, 1) === middleInit);
  });
  
  let lastInits = lastNames.filter(function(name) {
    return (name.slice(0, 1) === lastInit);
  });
  
  let rndmFirstName = RndmName.prototype.genRandomName(firstInits);
  let rndmMiddleName = RndmName.prototype.genRandomName(middleInits);
  let rndmLastName = RndmName.prototype.genRandomName(lastInits);
  
  return `${rndmFirstName()} ${rndmMiddleName()} ${rndmLastName()}`;
};

const genSingleName = (rndmName) => {
  let newName = new rndmName();
  return `${newName.firstName} ${newName.middleName} ${newName.lastName}`;
};

const genListOfNames = (rndmName) => {
  let newNames = firstNames.map(name => genSingleName(rndmName));
  return [...newNames];
};

const genListOfNamesOfSize = (rndmName, number=1) => {
  return Array(number).fill(false).map(name => genSingleName(rndmName));
};
