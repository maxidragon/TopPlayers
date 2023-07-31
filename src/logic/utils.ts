export const getWeekendPeriod = () => {
  const today = new Date().getDay();
  let nextThursday, nextMonday;

  switch (today) {
    case 0:
      nextThursday = new Date();
      nextThursday.setDate(nextThursday.getDate() - 4);
      nextMonday = new Date();
      nextMonday.setDate(nextMonday.getDate() + 1);
      break;
    case 1:
      nextThursday = new Date();
      nextThursday.setDate(nextThursday.getDate() + 3);
      nextMonday = new Date();
      nextMonday.setDate(nextMonday.getDate() + 8);
      break;
    case 4:
      nextThursday = new Date();
      nextMonday = new Date();
      nextMonday.setDate(nextMonday.getDate() + 4);
      break;
    case 6:
      nextThursday = new Date();
      nextThursday.setDate(nextThursday.getDate() - 3);
      nextMonday = new Date();
      nextMonday.setDate(nextMonday.getDate() + 2);
      break;
    default:
      const daysToThursday = (4 - today + 7) % 7;
      nextThursday = new Date();
      nextThursday.setDate(nextThursday.getDate() + daysToThursday);
      nextMonday = new Date(nextThursday.getTime());
      nextMonday.setDate(nextMonday.getDate() + 4);
      break;
  }

  const start = `${nextThursday.getFullYear()}-${(nextThursday.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${nextThursday.getDate().toString().padStart(2, "0")}`;
  const end = `${nextMonday.getFullYear()}-${(nextMonday.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${nextMonday.getDate().toString().padStart(2, "0")}`;
  return { start, end };
};
