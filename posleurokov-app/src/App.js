import './App.css';
import { Button } from './components/shared'

function App() {
    return (
        <Button
            onClick={() => {
                alert(1)
            }}
            height='50px'
            width='120px'
            background='#EA2182'
            borderRadius='10px'
            color='#FFFFFF'
        ><p>Content</p></Button>
    );
}

export default App;
