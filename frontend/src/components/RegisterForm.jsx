import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import usersServerCall from "../services/usersServerCall";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await usersServerCall.registerUser(
      username,
      email,
      password
    );
    console.log(result);

    if (result.message) {
      toast.current.show({
        severity: "error",
        summary: "Error registering user",
        // detail: "Nope",
      });
    } else {
      toast.current.show({
        severity: "success",
        summary: "User registered successfully",
        // detail: "Nope",
      });
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="flex flex-wrap align-items-center mb-3 mt-3 gap-2">
            <label htmlFor="username" className="p-sr-only">
              Username
            </label>
            <InputText
              id="username"
              placeholder="Username"
              className="p-invalid mr-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Message severity="error" text="Username is required" />
          </div>
          <div className="flex flex-wrap align-items-center mb-3 gap-2">
            <label htmlFor="email" className="p-sr-only">
              Email
            </label>
            <InputText
              id="email"
              placeholder="Email"
              className="p-invalid mr-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Message severity="error" />
          </div>
          <div className="flex flex-wrap align-items-center mb-3 gap-2">
            <label htmlFor="password" className="p-sr-only">
              Password
            </label>
            <InputText
              id="password"
              placeholder="Password"
              className="p-invalid mr-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Message severity="error" />
          </div>
          <Button type="submit" label="Register" />
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
