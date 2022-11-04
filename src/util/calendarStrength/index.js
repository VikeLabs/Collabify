import { parseTime } from './parseTime';

export const splitAvailabilities = ({ availabilities }) => {
  let people = [];
  // let index = 0; // we may not need this index. more on this later.

  const dates = []; // all UNIQUE dates

  for (let availability of availabilities) {
    let startToEndTimes = [];
    let times = availability.times;

    for (let time of times) {
      // parsing time string to [date: int, time: int]
      // eg: '2022-12-12T09:00:00' -> [20221212, 900]
      const [parsedStartDate, parsedStartTime] = parseTime(time.startTime);
      const [_, parsedEndTime] = parseTime(time.endTime); // no need to extract the same date since we arent doing multi-day event

      // extracting date -> push to `dates` if not exists
      if (!dates.includes(parsedStartDate)) {
        dates.push(parsedStartDate);
      }

      /**
       * I totally forgot what you are supposed to do with the starting and ending time,
       * but they are now `parsedStartTime` and `parsedEndTime` respectively
       */
      startToEndTimes.push(...convertToIntTime(time.startTime, time.endTime));
    }

    const entry = {
      name: availability.name,
      number: availability.number,
      timesAvailable: [],
    };

    people.push(entry);

    // people[index].timesAvailable.push(...startToEndTimes); // maybe we could just add this to the `entry` object above
    // index += 1;
  }

  let allTimes = [];
  /**
   * is there a way we could extract `allTimes` within the previous loop?
   * if you want to just keep it like this for prod, feel free, but leave a TODO here so
   * we can optimize it later */

  /**
   * I've also written a function for this, checkout `./getTimeInterval.js`
   */

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
