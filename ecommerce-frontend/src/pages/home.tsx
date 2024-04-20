//  import React from 'react'
import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"
const Home = () => {
  const addToCarthandler= ()=>{}
  return (
    <div className="home">
    <section></section>
    <h1>Latest Product 
      <Link to="/search" className="findmore">More</Link>
    </h1>
    <main>
      <ProductCard productId="32323swd" name="phone" photo="https://m.media-amazon.com/images/I/61RJn0ofUsL._AC_SX342_.jpg"  price={9999} stock={10} handler={addToCarthandler} />
      {/* productId, name, photo, price, stock  , handler */}
    </main>
    </div>
  )
}
export default Home
