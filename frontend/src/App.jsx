import { Route, Switch } from "wouter";
import ExercisesList from "./components/ExercisesList";
import Header from "./components/Header";
import HomeView from "./views/HomeView";
import ScrollToTop from "./components/ScrollToTop";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Switch>
        <Route path="/" component={HomeView} />
        <Route path="/exercises" component={ExercisesList} />
        <Route path="/sign-up" component={RegisterForm} />
        <Route path="/sign-in" component={LoginForm} />
      </Switch>
    </>
  );
}

export default App;
