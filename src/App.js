import "./App.css";
import Header from "./components/Header";
import DayList from "./components/DayList";
import Day from "./components/Day";
import EmptyPage from "./components/EmptyPage";
import CreateWord from "./components/CreateWord";
import CreateDays from "./components/CreateDays";

import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<DayList />} />
          <Route path="/day/:day" element={<Day />} />
          <Route path="*" element={<EmptyPage />} />
          <Route path="/create_word" element={<CreateWord />} />
          <Route path="/create_day" element={<CreateDays />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
