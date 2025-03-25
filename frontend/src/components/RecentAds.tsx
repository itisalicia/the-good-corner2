import AdCard, { AdCardProps } from "./AdCard";

const ads: AdCardProps[] = [
  {
    id: 1,
    imgUrl: "/images/bougie.webp",
    link: "/ads/bougie",
    title: "Bougie",
    price: 10,
  },
  {
    id: 2,
    imgUrl: "/images/dame-jeanne.webp",
    link: "/ads/dame-jeanne",
    title: "Dame Jeanne",
    price: 100,
  },
  {
    id: 3,
    imgUrl: "/images/porte-magazine.webp",
    link: "/ads/porte-magazine",
    title: "Porte Magazine",
    price: 50,
  },
  {
    id: 4,
    imgUrl: "/images/table.webp",
    link: "/ads/table",
    title: "Table",
    price: 30,
  },
  {
    id: 5,
    imgUrl: "/images/vaisselier.webp",
    link: "/ads/vaisselier",
    title: "Vaisselier",
    price: 40,
  },
  {
    id: 6,
    imgUrl: "/images/vide-poche.webp",
    link: "/ads/vide-poche",
    title: "Vide Poche",
    price: 5,
  },
];

const RecentAds = () => {
  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((el) => (
          <AdCard
            key={el.id}
            imgUrl={el.imgUrl}
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
