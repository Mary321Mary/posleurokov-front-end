import './App.scss';
import { DefaultLayout } from './layout';
import { NotFoundPage, Main, Catalogue, LessonPage, Profile, Subscriptions, ActiveLessons, ArchiveLessons } from './pages';
import Helmet from 'react-helmet';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
          <Route path='/cabinet/Profile' element={<Profile />} />
          <Route path='/cabinet/Subscriptions' element={<Subscriptions />} />
          <Route path='/cabinet/active' element={<ActiveLessons />} />
          <Route path='/cabinet/archive' element={<ArchiveLessons />} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
};

export default App;
