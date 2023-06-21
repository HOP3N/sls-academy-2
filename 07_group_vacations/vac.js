const fs = require('fs');

const rawData = fs.readFileSync('vacations.json');
const devs = JSON.parse(rawData);

const devsMap = new Map();

devs.forEach((record) => {
  const { _id, user, startDate, endDate } = record;
  const { _id: userId, name: userName } = user;

  if (devsMap.has(userId)) {
    const vacations = devsMap.get(userId).vacations;
    vacations.push({ startDate, endDate });
  } else {
    devsMap.set(userId, {
      userId,
      userName,
      vacations: [{ startDate, endDate }],
    });
  }
});

const res = Array.from(devsMap.values());

fs.writeFileSync('transformed.json', JSON.stringify(res, null, 2));

console.log('Transformation complete!');
