import Navbar from "./components/Navbar";
import AppRoute from "./routes/AppRoutes";
import { useFetchUser } from "./hooks/useFetchUser";
import './App.css'

export default function App() {
  useFetchUser();

  return (
    <div className="App">
      <Navbar />
      <AppRoute />
    </div>
  );
}

