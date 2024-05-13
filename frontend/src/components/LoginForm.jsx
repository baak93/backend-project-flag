// import { Message } from "primereact/message";
// import { InputText } from "primereact/inputtext";
// import { Password } from "primereact/password";
// import { Button } from "primereact/button";
// import { useState, useRef } from "react";
// import { Toast } from "primereact/toast";
// import usersServerCall from "../services/usersServerCall";

// function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const toast = useRef(null);

//   async function handleSubmit(event) {
//     event.preventDefault();
//     const result = await usersServerCall.loginUser(email, password);
//     console.log(result);

//     if (result.status !== "success") {
//       toast.current.show({
//         severity: "error",
//         summary: "Error trying to login",
//         // detail: "Nope",
//       });
//     } else {
//       toast.current.show({
//         severity: "success",
//         summary: "Pagina Pessoal",
//         // detail: "vai para a pagina pessoal",
//       });
//     }
//   }

//   return (
//     <>
//       <Toast ref={toast} />
//       <form onSubmit={handleSubmit}>
//         <div className="card">
//           <div className="flex flex-wrap align-items-center mb-3 gap-2">
//             <label htmlFor="email" className="p-sr-only">
//               Email
//             </label>
//             <InputText
//               id="email"
//               placeholder="Email"
//               className="p-invalid mr-2"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Message severity="error" />
//           </div>
//           <div className="flex flex-wrap align-items-center mb-3 gap-2">
//             <label htmlFor="password" className="p-sr-only">
//               Password
//             </label>
//             <Password
//               id="password"
//               placeholder="Password"
//               className="p-invalid mr-2"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               feedback={false}
//               tabIndex={1}
//             />
//             <Message severity="error" />
//           </div>
//           <Button type="submit" label="Sign-in" />
//         </div>
//       </form>
//     </>
//   );
// }

// export default LoginForm;

import { useState } from "react";
import { TextField, Button, Snackbar } from "@mui/material";
import usersServerCall from "../services/usersServerCall";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await usersServerCall.loginUser(email, password);
    console.log(result);

    if (result.status !== "success") {
      setVariant("error");
      setMessage("Error trying to login");
    } else {
      setVariant("success");
      setMessage("Vai para a Página Pessoal");
    }

    setOpen(true);
  }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        variant={variant}
      />
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="flex flex-wrap align-items-center mb-3 gap-2">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              className="mr-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap align-items-center mb-3 gap-2">
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              className="mr-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" variant="contained" color="primary">
            Sign-in
          </Button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
