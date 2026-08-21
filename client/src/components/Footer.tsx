const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">
              &copy; 2026 The Argenté Vine. All rights reserved.
            </p>
          </div>

          <div className="col-md-6 text-center text-md-end">
            <a href="#" className="text-white me-3">
              <i className="bi bi-facebook fs-4"></i>
            </a>

            <a href="#" className="text-white me-3">
              <i className="bi bi-instagram fs-4"></i>
            </a>

            <a href="#" className="text-white me-3">
              <i className="bi bi-twitter fs-4"></i>
            </a>

            <a href="#" className="text-white me-3">
              <i className="bi bi-youtube fs-4"></i>
            </a>

            <a href="#" className="text-white">
              <i className="bi bi-linkedin fs-4"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
