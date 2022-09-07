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
  Profile,
  Subscriptions,
  ActiveLessons,
  ArchiveLessons,
  About,
  Terms,
  FAQ,
  Contacts,
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
          <Route path="/:cityParam" element={<Main />} />
          <Route exact path="/catalogue/:cityParam" element={<Catalogue />} />
          <Route
            path="/catalogue/:cityParam/:categoryParam"
            element={<Catalogue />}
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/cabinet/Profile" element={<Profile />} />
          <Route path="/cabinet/Subscriptions" element={<Subscriptions />} />
          <Route path="/cabinet/active" element={<ActiveLessons />} />
          <Route path="/cabinet/archive" element={<ArchiveLessons />} />
          <Route path="/lesson/create" element={<LessonCreate />} />
          <Route path="/lesson/update/:id" element={<LessonUpdate />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contacts" element={<Contacts />} />
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
