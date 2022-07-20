import './App.scss';
import { ComponentsDemo } from './components/test';
import { DefaultLayout } from './layout';
function App() {
  return (
    <>
      <DefaultLayout>
        <ComponentsDemo />
      </DefaultLayout>
    </>
  );
}

export default App;
