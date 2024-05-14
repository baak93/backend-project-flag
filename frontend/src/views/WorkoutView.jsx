function createWorkout() {
  window.location.href = "/createworkout";
}

function WorkoutView() {
  return (
    <>
      <div>WorkoutView</div>
      <div>WorkoutView</div>
      <div>WorkoutView</div>
      <div>WorkoutView</div>

      <button onClick={createWorkout}>Create a new Workout</button>
    </>
  );
}

export default WorkoutView;
