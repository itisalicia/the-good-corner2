import AdCard from "./AdCard";

const RecentAds = () => {
  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        <AdCard
          imgUrl="/images/bougie.webp"
          link="/ads/bougie"
          title="Bougie"
          price={10}
        />
        <AdCard
          imgUrl="/images/table.webp"
          link="/ads/table"
          title="Table"
          price={50}
        />
      </section>
    </>
  );
};

export default RecentAds;
