import './App.scss';
import { DefaultLayout } from './layout';
import { NotFoundPage } from './pages';
import { ComponentsDemo } from './components/test';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <DefaultLayout>
        <Routes>
          <Route exact path="/" element={<ComponentsDemo />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
};

export default App;
