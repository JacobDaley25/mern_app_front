import logo from './logo.svg';
import './App.css';

const App = () => {
    return (
        <main>
            <h1>Plants List</h1>
            <section>
                <h2>Create a Plant</h2>
                <form>
                    Description: <input type="text"/><br/>
                    Needs Water: <input type="checkbox"/><br/>
                    <input type="submit" value="Create To Do"/>
                </form>
            </section>
        </main>
    );
}

export default App;
