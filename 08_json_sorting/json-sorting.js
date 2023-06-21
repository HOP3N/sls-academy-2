const axios = require('axios');

const endpoints = [
  'https://jsonbase.com/sls-team/json-793',
  'https://jsonbase.com/sls-team/json-955',
  'https://jsonbase.com/sls-team/json-231',
  'https://jsonbase.com/sls-team/json-931',
  'https://jsonbase.com/sls-team/json-93',
  'https://jsonbase.com/sls-team/json-342',
  'https://jsonbase.com/sls-team/json-770',
  'https://jsonbase.com/sls-team/json-491',
  'https://jsonbase.com/sls-team/json-281',
  'https://jsonbase.com/sls-team/json-718',
  'https://jsonbase.com/sls-team/json-310',
  'https://jsonbase.com/sls-team/json-806',
  'https://jsonbase.com/sls-team/json-469',
  'https://jsonbase.com/sls-team/json-258',
  'https://jsonbase.com/sls-team/json-516',
  'https://jsonbase.com/sls-team/json-79',
  'https://jsonbase.com/sls-team/json-706',
  'https://jsonbase.com/sls-team/json-521',
  'https://jsonbase.com/sls-team/json-350',
  'https://jsonbase.com/sls-team/json-64',
];

async function queryEndpoint(endpoint) {
  
    try {
    const res = await axios.get(endpoint);
    const data = res.data;

    if (data && data.isDone !== undefined) {
      console.log(`[Success] ${endpoint}: isDone - ${data.isDone}`);

      return data.isDone;
    }
  } catch (error) {
    console.log(`[Fail] ${endpoint}: ${error.message}`);
  }

  return null;
}

async function executeQueries() {
  let trueCount = 0;
  let falseCount = 0;

  for (const endpoint of endpoints) {

    let isDone = null;
    for (let i = 0; i < 3; i += 1) {
      isDone = await queryEndpoint(endpoint);

      if (isDone !== null) break;
    }

    if (isDone !== null) {

      if (isDone) {
        trueCount++;
      } else {
        falseCount++;
      }
    }
  }

  console.log(`Found True values: ${trueCount}`);
  console.log(`Found False values: ${falseCount}`);
}

executeQueries();
