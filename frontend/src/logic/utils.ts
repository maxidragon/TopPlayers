export const getWeekendPeriod = () => {
  const today = new Date().getDay();
  let nextFriday, nextMonday;

  switch (today) {
    case 0:
      nextFriday = new Date();
      nextFriday.setDate(nextFriday.getDate() - 3);
      nextMonday = new Date();
      nextMonday.setDate(nextMonday.getDate() + 1);
      break;
    case 1:
      nextFriday = new Date();
      nextFriday.setDate(nextFriday.getDate() - 4);
      nextMonday = new Date();
      nextMonday.setDate(nextMonday.getDate() + 1);
      break;
    case 5:
      nextFriday = new Date();
      nextMonday = new Date();
      nextMonday.setDate(nextMonday.getDate() + 3);
      break;
    case 6:
      nextFriday = new Date();
      nextFriday.setDate(nextFriday.getDate() - 2);
      nextMonday = new Date();
      nextMonday.setDate(nextMonday.getDate() + 2);
      break;
    default:
      const daysToFriday = (5 - today + 7) % 7;
      nextFriday = new Date();
      nextFriday.setDate(nextFriday.getDate() + daysToFriday);
      nextMonday = new Date(nextFriday.getTime());
      nextMonday.setDate(nextMonday.getDate() + 3);
      break;
  }

  const start = `${nextFriday.getFullYear()}-${(nextFriday.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${nextFriday.getDate().toString().padStart(2, "0")}`;
  const end = `${nextMonday.getFullYear()}-${(nextMonday.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${nextMonday.getDate().toString().padStart(2, "0")}`;

  return { start, end };
};
