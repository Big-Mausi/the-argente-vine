import type { MenuItem } from "../data/menuData";

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard = ({ item }: MenuCardProps) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={item.image} className="card-img-top" alt="{item.alt" />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{item.name}</h5>

          <p className="card-text">{item.description}</p>

          <p className="fw-bold text-warning mt-auto mb-0">
            ₦{item.price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
