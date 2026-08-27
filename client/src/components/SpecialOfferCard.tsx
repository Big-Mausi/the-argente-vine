import { Link } from "react-router-dom";
import type { SpecialOffer } from "../data/specialOffers";

interface SpecialOfferCardProps {
  offer: SpecialOffer;
}

const SpecialOfferCard = ({ offer }: SpecialOfferCardProps) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <article className="special-offer-card h-100">
        <div className="special-offer-image-wrapper">
          <img
            src={offer.image}
            className="special-offer-image"
            alt={offer.alt}
          />
        </div>

        <div className="special-offer-content">
          <h4 className="special-offer-title">{offer.title}</h4>

          <p className="special-offer-description">{offer.description}</p>

          <Link to={offer.buttonLink} className="special-offer-button">
            {offer.buttonText}
          </Link>
        </div>
      </article>
    </div>
  );
};

export default SpecialOfferCard;
