// const connection = require("./connection");

// async function createWorkoutDB(userID, title) {
//   const workoutQuery = `INSERT INTO workouts (title, user_id) VALUES (?, ?)`;
//   const params = [title, userID];
//   const workoutResult = await connection.promise().query(workoutQuery, params);
//   workoutId = workoutResult[0].insertId;
//   console.log(workoutId);
//   return workoutId;
// }

// module.exports = {
//   createWorkoutDB,
// };
