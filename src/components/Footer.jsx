function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="accordion accordion-flush" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Contact Us
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              If you have any questions, feedback, or inquiries, please don't
              hesitate to get in touch with us. We're here to assist you and
              provide the information you need. Here are the various ways to
              reach out to us:
              <br />
              <br />
              <strong>Customer Support:</strong>
              <br />
              <br />
              <strong>Email:</strong>support@example.com
              <br />
              <strong>Phone:</strong>+1 (123)456-7890
              <br />
              <br />
              <strong>Business Inquiries:</strong>
              <br />
              For business-related inquiries, partnerships, or collaborations,
              please contact our business development team:
              <br />
              <br />
              <strong>Email:</strong>business@example.com
              <br />
              <strong>Phone:</strong>+1 (123) 555-6789
              <br />
              <br />
              <strong>Visit Us:</strong>
              Feel free to visit our physical location:
              <br />
              <br />
              123 Tech Avenue
              <br />
              Cityville, ST 12345
              <br />
              United States
              <br />
              <br />
              We look forward to hearing from you and providing the assistance
              you need. Your feedback and questions are important to us, and
              we'll respond promptly to your inquiries. Thank you for choosing
              Tech Dreams Await!
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              About Us
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              At Tech Dreams Await,
              <strong>
                we are passionate about technology and innovation.
              </strong>
              Our mission is to provide you with the latest and greatest in tech
              products, all while delivering
              <strong>exceptional customer experiences.</strong>
              <br />
              <br />
              <strong>Our Story</strong>
              <br />
              <br />
              Founded in [year], Tech Dreams Await started as a
              <strong>small team of tech enthusiasts</strong> who shared a
              common vision. Over the years,
              <strong>
                we've grown into a trusted online destination for tech
                enthusiasts,
              </strong>
              offering a wide range of cutting-edge products.
              <br />
              <br />
              <strong>Our Commitment</strong>
              <br />
              <br />
              We are committed to:
              <br />- <strong>Quality:</strong> We handpick products from top
              brands, ensuring that you receive only the best in terms of
              quality and performance.
              <br />- <strong>Innovation:</strong> We stay up-to-date with the
              latest tech trends and continuously add new and exciting products
              to our catalog.
              <br />- <strong>Customer Satisfaction:</strong> Your satisfaction
              is our top priority. We provide excellent customer support and
              hassle-free returns to ensure your shopping experience is smooth.
              <br />
              <br />
              <strong>Our Team</strong>
              <br />
              <br />
              Our dedicated team of tech experts is always ready to assist you.
              Whether you need product recommendations, technical support, or
              general advice, <strong>we're here to help.</strong>
              <br />
              <br />
              <strong>Join Us in Our Tech Journey</strong>
              <br />
              <br />
              We invite you to explore our online store and discover the world
              of technology with us. At Tech Dreams Await,
              <strong>we believe that tech dreams can become a reality,</strong>
              and we're excited to be a part of your tech journey.
              <br />
              <br />
              Thank you for choosing Tech Dreams Await as your trusted tech
              destination.
              <strong>
                We look forward to serving you and being a part of your tech
                adventures!
              </strong>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Our Values
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              At Tech Dreams Await, our values serve as the foundation of
              everything we do. They define who we are and how we conduct our
              business. Our commitment to these values drives us to deliver the
              best products and services to our customers.
              <br />
              <br />
              <strong>1. Quality Excellence</strong>
              <br />
              We are dedicated to providing products of the highest quality. Our
              rigorous quality control ensures that every product we offer meets
              our stringent standards, guaranteeing reliability and performance.
              <br />
              <br />
              <strong>2. Innovation</strong>
              <br />
              We embrace innovation and constantly seek new and exciting tech
              solutions. We stay at the forefront of technological advancements
              to bring you the latest and most cutting-edge products.
              <br />
              <br />
              <strong>3. Customer-Centric</strong>
              <br />
              Our customers are at the heart of everything we do. We strive to
              exceed your expectations by delivering exceptional customer
              experiences. Your satisfaction is our top priority.
              <br />
              <br />
              <strong>4. Sustainability</strong>
              <br />
              We are committed to environmentally responsible practices. We work
              towards reducing our environmental footprint by promoting
              eco-friendly products and sustainable packaging.
              <br />
              <br />
              <strong>5. Transparency</strong>
              <br />
              We believe in transparency and open communication. We provide
              clear and honest information about our products, pricing, and
              policies to ensure trust and reliability.
              <br />
              <br />
              <strong>6. Teamwork</strong>
              <br />
              Our success is a result of collaborative teamwork. We value
              diversity, inclusivity, and the contributions of every team member
              in achieving our goals.
              <br />
              <br />
              <strong>7. Continuous Improvement</strong>
              <br />
              We are constantly learning and evolving. We actively seek feedback
              and use it to improve our products and services, ensuring we
              remain at the forefront of the tech industry. These values guide
              us in our mission to provide you with the best tech solutions. We
              invite you to join us on our journey as we continue to uphold
              these principles and deliver exceptional technology experiences.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
