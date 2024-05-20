import { FaPlus } from "react-icons/fa";

type ProductsProp = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: () => void;
  };
  const server = "dsdsd"
  const ProductCard = ({ productId, name, photo, price, stock  , handler}: ProductsProp) => {
    return (
      <div className="product-card">
        {/* <img src={`${server}/${photo}`} alt={name} /> */}
       <img src="https://m.media-amazon.com/images/I/61RJn0ofUsL._AC_SX342_.jpg" alt="MacBook" />
        <p>{name}</p>
        <span>₹{price}</span>
        <div>
            <button onCanPlay={()=>handler()}>
                <FaPlus/>
                </button>
        </div>
      </div>
    );
  };
  
  export default ProductCard;
  