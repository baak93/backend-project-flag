import { Route, Switch } from "wouter";
import Header from "./components/Header";
import HomeView from "./views/HomeView";
import ScrollToTop from "./components/ScrollToTop";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutView from "./views/WorkoutView";
import WorkoutDetail from "./components/WorkoutDetail";
import ExercisesView from "./views/ExercisesView";
import ExerciseDetail from "./components/ExerciseDetail";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Switch>
        <Route path="/" component={HomeView} />
        <Route path="/workouts" component={WorkoutView} />
        <Route path="/createworkout" component={WorkoutForm} />
        <Route path="/exercises" component={ExercisesView} />
        <Route path="/workoutdetail/:id">
          {(params) => <WorkoutDetail id={params.id} />}
        </Route>
        <Route path="/exercisedetail/:id">
          {(params) => <ExerciseDetail id={params.id} />}
        </Route>
        <Route path="/sign-up" component={RegisterForm} />
        <Route path="/sign-in" component={LoginForm} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
