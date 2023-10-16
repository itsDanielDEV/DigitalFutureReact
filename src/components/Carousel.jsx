import bannerTelefono from "../assets/banner-telefono.png";
import bannerAudifonos from "../assets/banner-audifonos.png";
import bannerSmartwatch from "../assets/banner-smartwatch.png";

function Carousel() {
  return (
    <section id="carouselExampleIndicators" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active d-flex">
          <img
            src={bannerTelefono}
            className="d-block ms-auto me-auto"
            alt="Phone Banner"
          />
        </div>
        <div className="carousel-item">
          <img
            src={bannerAudifonos}
            className="d-block ms-auto me-auto"
            alt="Headphones Banner"
          />
        </div>
        <div className="carousel-item">
          <img
            src={bannerSmartwatch}
            className="d-block ms-auto me-auto"
            alt="Smartwatch Banner"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </section>
  );
}

export default Carousel;
