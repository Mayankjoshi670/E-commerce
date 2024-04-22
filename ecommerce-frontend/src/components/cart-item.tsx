import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};
const CartItem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;

  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>

      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>

      <button onClick={() => removeHandler(productId)}>
        <FaTrash></FaTrash>
      </button>
    </div>
  );
}

export default CartItem;

// Sample usage
// const cartItems = {
//   productId: "asas",
//   photo: "https://m.media-amazon.com/images/I/61RJn0ofUsL._AC_SX342_.jpg",
//   name: "mac Book",
//   price: 65468,
//   quantity: 4,
//   stock: 10
// };

// ReactDOM.render(<CartItem cartItem={cartItems} />, document.getElementById('root'));
