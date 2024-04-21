import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";

 
 const cartItems = {
  productId : "asas" , 
   photo : asas , 
   name : "mac Book" , 
   price : 65468 , 
   quantity : 4 , 
   stock : 10
 } ;
 const subtotal = 4000 ; 
 const tax =  Math.round(subtotal*0.18);
 const shippingCharges = 200 ; 
 const discount = 400;
 const total = subtotal+tax+ shippingCharges ; 
const Cart = () => {
  const[coupen , setCoupen]  = useState<string>("");
  const[isCoupenValid , setIsCoupenValid] = useState<boolean>(false) ;
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if(Math.random()>0.5) setIsCoupenValid(true) ; 
      else  setIsCoupenValid(false) ; 
    }, 500);
  
    return () => {
      clearTimeout(timeOutId)
      setIsCoupenValid(false)
    }
  }, [coupen])
   
  return (
    <div className='cart'>
      <main>
        {
          cartItems.map(i=><CartItem )/>)

        }
      </main>
    <aside>
    <p>Subtotal :${subtotal}</p>
    <p> Shipping Charges :${shippingCharges} </p>
    <p> Tax :${tax} </p> ; 
    <p> Total :${total} </p>
    <p>
      Discount: <em>- ${discount}</em>
    </p>
    <b>total : ${total}</b>
    <input placeholder="coupen code " type="text"  value={coupen} onChange={(e)=>setCoupen(e.target.value)}/>
    {coupen && (isCoupenValid ? (
          <span className="green">${discount} off using the <code>{coupen}</code></span>
        ) : (
          <span className="red">Invalid coupon code <VscError /></span>
        ))}
    </aside>
    </div>
  )
}

 export default Cart
