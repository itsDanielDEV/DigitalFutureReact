import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import { useContext } from "react";

function ProductCard(props) {
  const { cartItems, setCartItems } = useContext(CartContext);

  function handleAddToCart(e) {
    setCartItems((arr) => [
      ...arr,
      {
        id: props.id,
        imgURL: props.imgURL,
        name: props.name,
        price: props.price,
      },
    ]);
  }
  return (
    <div className="col mb-5 " data-id={props.id}>
      <div className="card h-100">
        {/* Product image */}
        <img className="card-img-top" src={props.imgURL} alt={props.name} />
        {/* Product details */}
        <div className="card-body p-4">
          <div className="text-center">
            {/* Product name */}
            <h5 id="item-name" className="fw-bolder">
              {props.name}
            </h5>
            <p id="item-desc">{props.description}</p>

            {/* Product price */}
            <p id="item-price">${props.price}</p>
          </div>
        </div>

        {/* Product actions */}
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex justify-content-center">
          <Link
            to={!props.homeMode ? "/logup" : null}
            id="btn-addCart"
            className="text-center btn btn-outline-success mt-auto"
            onClick={(e) => (!props.homeMode ? null : handleAddToCart(e))}
          >
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
