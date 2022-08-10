import './App.scss';
import { DefaultLayout } from './layout';
import { NotFoundPage, Main, Catalogue, LessonPage } from './pages';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <DefaultLayout>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/catalogue" element={<Catalogue />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
};

export default App;
