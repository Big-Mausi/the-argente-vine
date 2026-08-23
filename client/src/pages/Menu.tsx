import { useEffect, useState } from "react";
import MenuCard from "../components/MenuCard";
import { getMenuItems } from "../services/api";
import type { MenuItem } from "../types/menu";

const categories = ["Starters", "Main Course", "Desserts", "Drinks"];

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const data = await getMenuItems();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
        setError("Unable to load the menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return (
      <section className="py-5">
        <div className="container text-center">
          <p>Loading menu...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5">
        <div className="container text-center">
          <p className="text-danger">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5" id="menu">
      <div className="container">
        <h2 className="text-center mb-4">Our Menu</h2>

        {categories.map((category) => {
          const items = menuItems.filter((item) => item.category === category);

          return (
            <div key={category}>
              <h3 className="mb-4 mt-5">{category}</h3>

              <div className="row">
                {items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Menu;
