export const splitAvailabilities = ({ availabilities }) => {
  let people = [];
  let index = 0;

  for (let availability of availabilities) {
    let startToEndTimes = [];
    let times = availability.times;
    for (let time of times) {
      startToEndTimes.push(...convertToIntTime(time.startTime, time.endTime));
    }
    let number = availability.number;
    let name = availability.name;
    people.push({ name: name, number: number, timesAvailable: [] });
    people[index].timesAvailable.push(...startToEndTimes);
    index += 1;
  }

  let allTimes = [];

  for (let person of people) {
    for (let time of person.timesAvailable) {
      if (!allTimes.includes(time)) {
        allTimes.push({
          fullTime: time,
          peopleAvailableNumbers: [],
          peopleAvailableNames: [],
        });
      }
    }
  }

  for (let time of allTimes) {
    for (let person of people) {
      for (let timeAvailable of person.timesAvailable) {
        if (
          time.fullTime.date === timeAvailable.date &&
          time.fullTime.hourMin === timeAvailable.hourMin
        ) {
          time.peopleAvailableNumbers.push(person.number);
          time.peopleAvailableNames.push(person.name);
        }
      }
    }
  }

  let dates = [];

  for (let time of allTimes) {
    if (!dates.includes(time.fullTime.date)) {
      dates.push(time.fullTime.date);
    }
  }

  let availabilitiesToReturn = [];

  for (let date of dates) {
    let sameDateObjects = getTimeObject(date, allTimes);
    let next = 1;
    for (let current = 0; current < sameDateObjects.length; current++) {
      if (next != sameDateObjects.length) {
        let namesWithSameAvailability = sameDateObjects[current].names.filter(
          (value) => sameDateObjects[next].names.includes(value)
        );
        let numbersWithSameAvailability = sameDateObjects[
          current
        ].numbers.filter((value) =>
          sameDateObjects[next].numbers.includes(value)
        );
        let startTime = convertBackToString(
          date,
          sameDateObjects[current].timeAvailable
        );
        let endTime = convertBackToString(
          date,
          sameDateObjects[next].timeAvailable
        );
        availabilitiesToReturn.push({
          names: namesWithSameAvailability,
          numbers: numbersWithSameAvailability,
          startTime: startTime,
          endTime: endTime,
        });
      }
      n += 1;
    }
  }

  return availabilitiesToReturn;

  function getTimeObject(date, allTimes) {
    let sameDateObjects = [];

    for (let time of allTimes) {
      if (time.fullTime.date === date) {
        sameDateObjects.push({
          timeAvailable: time.fullTime.time,
          names: time.peopleAvailableNames,
          numbers: time.peopleAvailableNumbers,
        });
      }
    }
    return sameDateObjects;
  }
};
