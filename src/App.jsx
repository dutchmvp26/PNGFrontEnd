import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Navbar />
      <main className="page">
        <Home />
      </main>
    </>
  );
}

export default App;
