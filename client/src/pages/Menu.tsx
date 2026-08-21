import MenuCard from "../components/MenuCard";
import { menuData } from "../data/menuData";

const categories = ["Starters", "Main Course", "Desserts", "Drinks"] as const;

const Menu = () => {
  return (
    <section className="py-5" id="menu">
      <div className="container">
        <h2 className="text-center mb-4">Our Menu</h2>

        {categories.map((category) => {
          const items = menuData.filter((item) => item.category === category);

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
