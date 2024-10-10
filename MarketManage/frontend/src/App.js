import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ManagementPage from "./pages/ManagementPage";
import ProductGrid from "./components/ProductGrid";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/management" element={<ManagementPage />} />
          <Route path="/products" element={<ProductGrid />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
