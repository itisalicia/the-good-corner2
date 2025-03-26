import axios from "axios";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  title: string;
};

const NewAdForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await axios.get("http://localhost:3000/categories");
      console.log(result);
      setCategories(result.data);
    };
    fetchCategories();
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form as HTMLFormElement);

        const formJson = Object.fromEntries(formData.entries());
        //console.log("formJson", formJson);
        axios.post("http://localhost:3000/ads", formJson);
      }}
    >
      <label>
        Titre de l'annonce
        <input
          className="text-field"
          name="title"
          defaultValue={"Je vends ma 206"}
        />
      </label>
      <br />
      <label>
        Description
        <input
          className="text-field"
          name="description"
          defaultValue={"Ma 206 est une super voiture"}
        />
      </label>
      <br />
      <label>
        Vendeur
        <input className="text-field" name="owner" defaultValue={"John Doe"} />
      </label>
      <br />
      <label>
        Price
        <input className="text-field" name="price" defaultValue={4000} />
      </label>
      <br />
      <label>
        Picture
        <input
          className="text-field"
          name="picture"
          defaultValue={
            "https://www.actuauto.fr/wp-content/uploads/2021/01/Peugeot-206-scaled.jpg"
          }
        />
      </label>
      <br />
      <label>
        Location
        <input className="text-field" name="location" defaultValue={"Paris"} />
      </label>
      <br />
      <select name="category">
        {categories.map((el) => (
          <option value={el.id} key={el.id}>
            {el.title}
          </option>
        ))}
      </select>
      <br />
      <button className="button">Submit</button>
    </form>
  );
};
export default NewAdForm;
