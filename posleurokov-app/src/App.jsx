import "./App.scss";
import { DefaultLayout, LoginLayout } from "./layout";
import {
  NotFoundPage,
  Main,
  Catalogue,
  LessonPage,
  LessonCreate,
  SignUp,
  Login,
  LessonUpdate,
} from "./pages";
import Helmet from "react-helmet";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Helmet titleTemplate="Все Кружки :: %s" />
      <div className="shadow" id="shadow"></div>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/catalogue" element={<Catalogue />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/lesson/create" element={<LessonCreate />} />
          <Route path="/lesson/update/:id" element={<LessonUpdate />} />
        </Route>
        <Route path="/" element={<LoginLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
