import Navbar from "./components/Navbar";
import AppRoute from "./routes/AppRoutes";
import './App.css'

export default function App() {
  return (
    <div className="App">
      <Navbar/>
      <AppRoute/>
    </div>
  );
}

