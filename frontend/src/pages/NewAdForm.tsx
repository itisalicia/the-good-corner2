import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { Category, Tag } from "../types";

type Inputs = {
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  category: number;
  tags: string[]; 
};

const NewAdForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      const categories = await axios.get("http://localhost:3000/categories");
      setCategories(categories.data);
      const tags = await axios.get("http://localhost:3000/tags");
      setTags(tags.data);
    };
    fetchCategoriesAndTags();
  }, []);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await axios.post("http://localhost:3000/ads", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre
        <input
          defaultValue={"iPhone13 Pro Max"}
          {...register("title", { required: true })}
        />
      </label>

      <br />

      <label>
        Description
        <input
          defaultValue={"Super beau"}
          {...register("description", { required: true })}
        />
      </label>

      <br />

      <label>
        Vendeur
        <input
          defaultValue={"Jane Doe"}
          {...register("owner", { required: true })}
        />
      </label>

      <br />

      <label>
        Ville
        <input
          defaultValue={"Lille"}
          {...register("location", { required: true })}
        />
      </label>

      <br />

      <label>
        Image
        <input
          defaultValue={
            "https://www.actuauto.fr/wp-content/uploads/2021/01/Peugeot-206-scaled.jpg"
          }
          {...register("picture", { required: true })}
        />
      </label>

      <br />

      <label>
        Prix
        <input
          type="number"
          defaultValue={4000}
          {...register("price", { required: true })}
        />
      </label>

      <br />

      <label>
        Categorie
        <select {...register("category", { required: true })}>
          {categories.map((el) => (
            <option value={el.id} key={el.id}>
              {el.title}
            </option>
          ))}
        </select>
      </label>

      <br />
      
      <section className="tag-section">
        {tags.map((tag) => (
          <label key={tag.id}>
            {tag.title}
            <input
              type="checkbox"
              value={tag.id}
              {...register("tags")}
            />
          </label>
        ))}
      </section>
      <br />
      <input type="submit" />
    </form>
  );
};
export default NewAdForm;
