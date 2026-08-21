import { Link } from "react-router-dom";
import type { SpecialOffer } from "../data/specialOffers";

interface SpecialOfferCardProps {
  offer: SpecialOffer;
}

const SpecialOfferCard = ({ offer }: SpecialOfferCardProps) => {
  return (
    <div className="col-md-4">
      <div className="card border-0 shadow h-100">
        <img src={offer.image} className="card-img-top" alt={offer.alt} />

        <div className="card-body text-center d-flex flex-column">
          <h4 className="fw-bold">{offer.title}</h4>

          <p className="text-muted">{offer.description}</p>

          <Link to={offer.buttonLink} className="btn btn-warning mt-auto">
            {offer.buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferCard;
