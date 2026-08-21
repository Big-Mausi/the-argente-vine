import { Link } from "react-router-dom";
import SpecialOfferCard from "../components/SpecialOfferCard";
import { specialOffers } from "../data/specialOffers";

const Home = () => {
  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <div className="container position-relative h-100">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-md-8 text-white">
              <h1 className="display-4 fw-bold">
                Experience Flavors in Fine Argenté Dining
              </h1>

              <p className="lead">
                {" "}
                Fresh ingredients, bold & mellow flavors, unforgettable dining
                experience.
              </p>

              <Link to="/menu" className="btn btn-warning">
                {" "}
                View Our Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-5 bg-dark">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-white">Special Offers</h2>

            <p className="text-white-50">
              Enjoy exclusive dining deals and deluxe experiences at The Argenté
              Vine.
            </p>
          </div>

          <div className="row g-4">
            {specialOffers.map((offer) => (
              <SpecialOfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section py-5 text-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-3"> Join Our Exclusive Newsletter</h2>

          <p className="text-white-50 mb-4">
            Be the first to hear about special events, luxury dining experences,
            seasonal menus, and exclusive offers.
          </p>

          <div className="row justify-content-center">
            <div className="col-md-6">
              <form className="d-flex gap-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />

                <button type="submit" className="btn btn-warning">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
