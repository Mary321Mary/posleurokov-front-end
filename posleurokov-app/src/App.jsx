import "./App.scss";
import { DefaultLayout } from "./layout";
import {
  NotFoundPage,
  Main,
  Catalogue,
  LessonPage,
  LessonCreate,
} from "./pages";
import Helmet from "react-helmet";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Helmet titleTemplate="Все Кружки :: %s" />
      <DefaultLayout>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/catalogue" element={<Catalogue />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/lesson/create" element={<LessonCreate />} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
};

export default App;
