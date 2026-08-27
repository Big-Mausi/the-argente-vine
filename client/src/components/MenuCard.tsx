import type { MenuItem } from "../types/menu";

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard = ({ item }: MenuCardProps) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="menu-card">
        <div className="menu-card-inner">
          {/* Front */}
          <div className="menu-card-front">
            <div className="menu-card-image-wrapper">
              <img
                src={item.image}
                className="menu-card-image"
                alt={item.alt}
              />

              <span className="menu-card-price">
                ₦{item.price.toLocaleString()}
              </span>
            </div>

            <div className="menu-card-content">
              <span className="menu-card-category">{item.category}</span>

              <h5 className="menu-card-title">{item.name}</h5>
            </div>
          </div>

          {/* Back */}
          <div className="menu-card-back">
            <span className="menu-card-category">{item.category}</span>

            <h5 className="menu-card-title">{item.name}</h5>

            <p className="menu-card-description">{item.description}</p>

            <div className="menu-card-back-price">
              ₦{item.price.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
