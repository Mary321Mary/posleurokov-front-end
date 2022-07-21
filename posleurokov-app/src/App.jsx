import './App.scss';
import { DefaultLayout } from './layout';
import { NotFoundPage, Main } from './pages';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <DefaultLayout>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
};

export default App;
