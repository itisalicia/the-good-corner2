import axios from "axios";
import AdCard, { AdCardProps } from "./AdCard";
import { useState, useEffect } from "react";

const RecentAds = () => {
  const [ads, setAds] = useState<AdCardProps[]>([]);
  const fetchData = async () => {
    const result = await axios.get("http://localhost:3000/ads");
    setAds(result.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((el) => (
          <AdCard
            key={el.id}
            picture={el.picture}
            link={el.link}
            title={el.title}
            price={el.price}
          />
        ))}
      </section>
    </>
  );
};

export default RecentAds;
