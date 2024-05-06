import { Route } from "wouter";
import ExercisesList from "./components/ExercisesList";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Route path="/exercises" component={ExercisesList} />
      <Route path="/sign-up" component={RegisterForm} />
    </>
  );
}

export default App;
