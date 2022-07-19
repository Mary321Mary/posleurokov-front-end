import './App.css';
import { Button } from './components/shared'

function App() {
    return (
        <Button
            height='50px'
            background='#EA2182'
            borderRadius='10px'
            color='#FFFFFF'
            onClick={() => {
                alert(1)
            }}
        >Добавить занятие</Button>
    );
}

export default App;
