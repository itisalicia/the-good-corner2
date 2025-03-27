import axios from "axios";
import AdCard, { AdCardProps } from "./AdCard";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

const RecentAds = () => {
  const [ads, setAds] = useState<AdCardProps[]>([]);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      let url = "http://localhost:3000/ads";
      if (searchParams.get("category")) {
        url += `?category=${searchParams.get("category")}`;
      }
      const result = await axios.get(url);
      setAds(result.data);
    };
    fetchData();
  }, [searchParams]);
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
