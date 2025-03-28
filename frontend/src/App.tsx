import { Route, Routes } from "react-router";

import "./App.css";
import Layout from "./pages/Layout";
import RecentAds from "./components/RecentAds";
import AboutPage from "./pages/About";
import AdDetailsPage from "./pages/AdDetails";
import NewAdForm from "./pages/NewAdForm";
import NewCategoryForm from "./pages/NewCategoryForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentAds />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="ads/:id" element={<AdDetailsPage />} />
        <Route path="ads/new" element={<NewAdForm />} />
        <Route path="category/new" element={<NewCategoryForm />} />
      </Route>
    </Routes>
  );
}

export default App;
