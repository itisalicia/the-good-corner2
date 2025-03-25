import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./pages/Layout";
import RecentAds from "./components/RecentAds";
import AboutPage from "./pages/About";
import AdDetailsPage from "./pages/AdDetails";

function App() {
  console.log("test");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentAds />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="ad/:id" element={<AdDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
