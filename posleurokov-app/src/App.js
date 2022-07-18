import './App.css';
import { TestAxios } from './components/test'
import { Button } from './components/shared'

function App() {
  return (
    <div>
      <TestAxios/>
      <Button type="btn_lesson" onclick={() => {alert(1)}}><p>Content</p></Button>
    </div>
  );
}

export default App;
