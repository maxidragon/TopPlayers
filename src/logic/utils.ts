export const getWeekendPeriod = () => {
  const today = new Date().getDay();
  let nextThursday, nextTuesday;

  switch (today) {
    case 1: 
      nextThursday = new Date();
      nextThursday.setDate(nextThursday.getDate() + (4 - nextThursday.getDay() + 7) % 7);
      nextTuesday = new Date(nextThursday.getTime());
      nextTuesday.setDate(nextTuesday.getDate() + 4);
      break;
    case 2:
      nextThursday = new Date();
      nextThursday.setDate(nextThursday.getDate() + (4 - nextThursday.getDay() + 7) % 7);
      nextTuesday = new Date();
      nextTuesday.setDate(nextThursday.getDate() + 6);
      break;
    case 3: 
      nextThursday = new Date();
      nextTuesday = new Date(nextThursday.getTime());
      nextTuesday.setDate(nextTuesday.getDate() + 6);
      break;
    case 4: 
      nextThursday = new Date();
      nextThursday.setDate(nextThursday.getDate() + (4 - nextThursday.getDay() + 7) % 7);
      nextTuesday = new Date(nextThursday.getTime());
      nextTuesday.setDate(nextTuesday.getDate() + 6);
      break;
    case 5: 
      const todayCopy = new Date();
      todayCopy.setDate(todayCopy.getDate() - 2);
      nextThursday = new Date();
      nextThursday.setDate(nextThursday.getDate() + (4 - nextThursday.getDay() + 7) % 7);
      nextTuesday = new Date(nextThursday.getTime());
      nextTuesday.setDate(nextTuesday.getDate() + 6);
      break;
    case 6: 
      const daysToLastThursday = (today + 7 - 4) % 7;
      nextThursday = new Date();
      nextThursday.setDate(nextThursday.getDate() - daysToLastThursday);
      nextTuesday = new Date(nextThursday.getTime());
      nextTuesday.setDate(nextTuesday.getDate() + 4);
      break;
    default: 
      nextThursday = new Date();
      nextThursday.setDate(nextThursday.getDate() + (4 - nextThursday.getDay() + 7) % 7);
      nextTuesday = new Date(nextThursday.getTime());
      nextTuesday.setDate(nextTuesday.getDate() + 4);
      break;
  }


  const start = `${nextThursday.getFullYear()}-${(nextThursday.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${nextThursday.getDate().toString().padStart(2, "0")}`;
  const end = `${nextTuesday.getFullYear()}-${(nextTuesday.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${nextTuesday.getDate().toString().padStart(2, "0")}`;
  return { start, end };
};
