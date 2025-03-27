import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./pages/Layout";
import RecentAds from "./components/RecentAds";
import AboutPage from "./pages/About";
import AdDetailsPage from "./pages/AdDetails";
import NewAdForm from "./pages/NewAdForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentAds />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="ad/:id" element={<AdDetailsPage />} />
        <Route path="ad/new" element={<NewAdForm />} />
      </Route>
    </Routes>
  );
}

export default App;
