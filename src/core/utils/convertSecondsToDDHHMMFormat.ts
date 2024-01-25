export const convertSecondsToDDHHMMFormat = (secondsAmount: number) => {
  let secondsAmountCopy = secondsAmount;

  let convertedTime = [];

  convertedTime.push(Math.floor(secondsAmountCopy / (3600 * 24)).toString());
  secondsAmountCopy %= 3600 * 24;
  convertedTime.push(Math.floor(secondsAmountCopy / 3600).toString());
  secondsAmountCopy %= 3600;
  convertedTime.push(Math.floor(secondsAmountCopy / 60).toString());

  convertedTime = convertedTime.map((timeItem) => {
    if (timeItem.length === 1) {
      return '0' + timeItem;
    }

    return timeItem;
  });

  return {
    days: convertedTime[0],
    hours: convertedTime[1],
    minutes: convertedTime[2],
  };
};
