import { Route } from "wouter";
import ExercisesList from "./components/ExercisesList";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Route path="/exercises" component={ExercisesList} />
    </>
  );
}

export default App;
