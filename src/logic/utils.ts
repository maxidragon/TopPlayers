export const getWeekendPeriod = () => {
  const today = new Date().getDay();
  let lastThursday, nextTuesday;

  switch (today) {
    case 1:
      lastThursday = new Date();
      lastThursday.setDate(
        lastThursday.getDate() - ((lastThursday.getDay() + 7 - 4) % 7),
      );
      nextTuesday = new Date(lastThursday.getTime());
      nextTuesday.setDate(nextTuesday.getDate() + 1);
      break;
    case 2:
      lastThursday = new Date();
      lastThursday.setDate(
        lastThursday.getDate() - ((lastThursday.getDay() + 7 - 4) % 7),
      );
      nextTuesday = new Date();
      nextTuesday.setDate(nextTuesday.getDate());
      break;
    case 3:
      lastThursday = new Date();
      lastThursday.setDate(
        lastThursday.getDate() - ((lastThursday.getDay() + 7 - 4) % 7),
      );
      nextTuesday = new Date(lastThursday.getTime());
      nextTuesday.setDate(nextTuesday.getDate() + 6);
      break;
    case 4:
      lastThursday = new Date();
      lastThursday.setDate(
        lastThursday.getDate() - ((lastThursday.getDay() + 7 - 4) % 7),
      );
      nextTuesday = new Date(lastThursday.getTime());
      nextTuesday.setDate(nextTuesday.getDate() + 6);
      break;
    case 5:
      lastThursday = new Date();
      lastThursday.setDate(
        lastThursday.getDate() - ((lastThursday.getDay() + 7 - 4) % 7),
      );
      nextTuesday = new Date(lastThursday.getTime());
      nextTuesday.setDate(nextTuesday.getDate() + 6);
      break;
    case 6:
      lastThursday = new Date();
      lastThursday.setDate(
        lastThursday.getDate() - ((lastThursday.getDay() + 7 - 4) % 7),
      );
      nextTuesday = new Date(lastThursday.getTime());
      nextTuesday.setDate(nextTuesday.getDate() + 6);
      break;
    default:
      lastThursday = new Date();
      lastThursday.setDate(
        lastThursday.getDate() - ((lastThursday.getDay() + 7 - 4) % 7),
      );
      nextTuesday = new Date(lastThursday.getTime());
      nextTuesday.setDate(nextTuesday.getDate() + 1);
      break;
  }

  const start = `${lastThursday.getFullYear()}-${(lastThursday.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${lastThursday.getDate().toString().padStart(2, "0")}`;
  const end = `${nextTuesday.getFullYear()}-${(nextTuesday.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${nextTuesday.getDate().toString().padStart(2, "0")}`;
  return { start, end };
};
