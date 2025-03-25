import { useParams } from "react-router";

const AdDetails = () => {
  const { id } = useParams();
  return <p>Ad details {id}</p>;
};

export default AdDetails;
