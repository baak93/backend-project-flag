import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [exerciseList, setExerciseList] = useState([]);

  useEffect(function () {
    (async function () {
      const options = {
        credentials: "include",
      };

      const response = await fetch("http://localhost:3000/exercises", options);
      const result = await response.json();
      console.log(result);

      setExerciseList(result);
    })();
  }, []);

  return (
    <>
      {exerciseList.map((exercise) => (
        <div>{exercise.name}</div>
      ))}
    </>
  );
}

export default App;
