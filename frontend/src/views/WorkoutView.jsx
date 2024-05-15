function WorkoutView() {
  function createWorkout() {
    window.location.href = "/createworkout";
  }
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
