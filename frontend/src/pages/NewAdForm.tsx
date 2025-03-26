import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Category = {
  id: number;
  title: string;
};

type Inputs = {
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  category: number;
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

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await axios.post("http://localhost:3000/ads", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre
        <input
          defaultValue={"Je vends ma 206"}
          {...register("title", { required: true })}
        />
      </label>

      <br />

      <label>
        Description
        <input
          defaultValue={"Ma 206 est super"}
          {...register("description", { required: true })}
        />
      </label>

      <br />

      <label>
        Vendeur
        <input
          defaultValue={"John Doe"}
          {...register("owner", { required: true })}
        />
      </label>

      <br />

      <label>
        Ville
        <input
          defaultValue={"Paris"}
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

      <input type="submit" />
    </form>
  );
};
export default NewAdForm;
