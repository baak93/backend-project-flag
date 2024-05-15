import { useState } from "react";
import { TextField, Button, Snackbar, SnackbarContent } from "@mui/material";
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
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <SnackbarContent
          style={{
            backgroundColor: variant === "error" ? "red" : "green", // Defina a cor com base na variável de estado "variant"
          }}
          message={<span id="client-snackbar">{message}</span>}
        />
      </Snackbar>
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
