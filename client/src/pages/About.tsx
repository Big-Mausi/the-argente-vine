const About = () => {
  return (
    <main>
      {/* Hero */}
      <section className="py-5 bg-dark text-white text-center">
        <div className="container">
          <h1 className="display-5 fw-bold">About The Argenté Vine</h1>

          <p className="lead mb-0">
            Where elegant dining meets unforgettable flavors.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <img
                src="/DiningHall.png"
                alt="The Argenté Vine restaurant interior"
                className="img-fluid rounded shadow"
              />
            </div>

            <div className="col-md-6">
              {" "}
              <h2 className="fw-bold mb-3">Our Story</h2>
              <p>
                The Argenté Vine was created from a passion for bringing people
                together through exceptional food, warm hospitality, and
                memorable dining experiences.
              </p>
              <p>
                Our menu brings together carefully selected ingredients,
                distinctive flavors, and dishes inspired by culinary traditions
                from around the world.
              </p>
              <p className="mb-0">
                Whether you are joining us for an intimate dinner, a special
                celebration, or a relaxed evening with friends, every visit is
                designed to be an experience worth remembering.{" "}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">What We Value</h2>

            <p className="text-muted">
              The ingredients behind every experience at The Argenté Vine.{" "}
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <i className="bi bi-stars fs-1"></i>

                  <h4 className="mt-3">Exceptional Quality</h4>

                  <p className="text-muted mb-0">
                    {" "}
                    From our ingredients to our service, we focus on creating a
                    dining experience that feels special.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <i className="bi bi-heart fs-1"></i>

                  <h4 className="mt-3">Warm Hospitality</h4>

                  <p className="text-muted mb-0">
                    {" "}
                    We believe great food is even better when it is shared in a
                    welcoming and memorable atmosphere.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <i className="bi bi-cup-hot fs-1"></i>

                  <h4 className="mt-3">Memorable Flavors</h4>

                  <p className="text-muted mb-0">
                    Our dishes are created to bring together familiar comfort
                    and exciting flavors from different culinary traditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
