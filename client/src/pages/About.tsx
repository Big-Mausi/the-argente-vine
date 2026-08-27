import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container text-center">
          <span className="section-eyebrow">THE ARGENTÉ VINE</span>

          <h1 className="fw-bold">About Us</h1>

          <p>Where elegant dining meets unforgettable flavors.</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-story py-5">
        <div className="container">
          <div className="mb-5">
            <span className="section-eyebrow">OUR STORY</span>

            <h2 className="fw-bold">Where food becomes an experience.</h2>
          </div>

          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                src="/DiningHall.png"
                alt="The Argenté Vine restaurant interior"
                className="about-story-image"
              />
            </div>

            <div className="col-lg-6">
              <div className="about-story-text">
                <h3 className="fw-bold">
                  A dining experience worth remembering.
                </h3>

                <p>
                  The Argenté Vine was created from a passion for bringing
                  people together through exceptional food, warm hospitality,
                  and memorable dining experiences.
                </p>

                <p>
                  Our menu brings together carefully selected ingredients,
                  distinctive flavors, and dishes inspired by culinary
                  traditions from around the world.
                </p>

                <p className="mb-0">
                  Whether you are joining us for an intimate dinner, a special
                  celebration, or a relaxed evening with friends, every visit is
                  designed to be an experience worth remembering.
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-content-end mt-4">
            <div className="col-lg-7">
              <img
                src="/AboutDish.png"
                alt="Signature dish at The Argenté Vine"
                className="about-dish-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-eyebrow">WHAT WE VALUE</span>

            <h2 className="fw-bold">
              The ingredients behind every experience.
            </h2>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="about-value">
                <i className="bi bi-stars"></i>

                <span>01</span>

                <h3>Exceptional Quality</h3>

                <p>
                  From our ingredients to our service, we focus on creating a
                  dining experience that feels special.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="about-value">
                <i className="bi bi-heart"></i>

                <span>02</span>

                <h3>Warm Hospitality</h3>

                <p>
                  We believe great food is even better when it is shared in a
                  welcoming and memorable atmosphere.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="about-value">
                <i className="bi bi-cup-hot"></i>

                <span>03</span>

                <h3>Memorable Flavors</h3>

                <p>
                  Our dishes are created to bring together familiar comfort and
                  exciting flavors from different culinary traditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta py-5 text-center">
        <div className="container">
          <span className="section-eyebrow">YOUR TABLE AWAITS</span>

          <h2 className="fw-bold">
            Make your next dining experience memorable.
          </h2>

          <p>
            Join us for exceptional food, thoughtful hospitality, and moments
            worth sharing.
          </p>

          <Link to="/reservation" className="btn btn-warning">
            Make a Reservation
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
