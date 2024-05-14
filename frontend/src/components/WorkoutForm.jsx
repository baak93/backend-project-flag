// import { useState } from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import cookiesServerCall from "../services/cookiesServerCall";

// function WorkoutForm() {
//   //terá que fazer uma requisiçao ao backend para o backend ler as cookies e passar o userID

//   const [title, setTitle] = useState("");

//   const handleTitleChange = (event) => {
//     setTitle(event.target.value);
//   };

//   async function handleSubmit(event) {
//     event.preventDefault();
// const cookies = await cookiesServerCall.getCookies();
// const userLoggedIn = cookies.LoggedIn;
// const userDataObject = JSON.parse(userLoggedIn);
// const user_id = userDataObject.userID;

//     const workout = {
//       user_id,
//       title,
//     };

//     // console.log("userLoggedIn");
//     // console.log(userDataObject.userID);
//     console.log("workout");
//     console.log(workout);
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextField
//         label="Title"
//         variant="outlined"
//         fullWidth
//         value={title}
//         onChange={handleTitleChange}
//         style={{ marginBottom: "1rem" }}
//       />
//       <Button variant="contained" color="primary" type="submit">
//         Create Workout
//       </Button>
//     </form>
//   );
// }

// export default WorkoutForm;

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import cookiesServerCall from "../services/cookiesServerCall";

function WorkoutForm() {
  const [title, setTitle] = useState("");

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const cookies = await cookiesServerCall.getCookies();
    const userLoggedIn = cookies.LoggedIn;
    const userDataObject = JSON.parse(userLoggedIn);
    const user_id = userDataObject.userID;

    // Cria o objeto de dados a ser enviado para o backend
    const workoutData = {
      title,
      user_id,
    };

    console.log("workoutData");
    console.log(workoutData);

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(workoutData),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      };
      console.log("options");
      console.log(options);
      // Envia a solicitação POST para o backend
      const response = await fetch("http://localhost:3000/workout", options);

      console.log("response");
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to create workout");
      }

      // A resposta do backend pode conter informações adicionais, dependendo da sua implementação
      const data = await response.json();
      console.log("Workout created:", data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={handleTitleChange}
        style={{ marginBottom: "1rem" }}
      />
      <Button variant="contained" color="primary" type="submit">
        Create Workout
      </Button>
    </form>
  );
}

export default WorkoutForm;
