import {Link} from 'react-router-dom'
import { FaSearch, FaSignOutAlt, FaUser  } from 'react-icons/fa'
import { FaShoppingBag } from 'react-icons/fa'
import { IoIosLogIn } from "react-icons/io";
import { useState } from 'react';
const user = {_id:"Mayank" , role:"User"}
const Headers = () => {
    const [isOpen , setIsOpen] = useState<boolean>(false);
    const logoutHandler=()=>{
        setIsOpen(false);
    }
  return (
    <nav className='header'>
        <Link onClick={()=>setIsOpen(false)} to={'/'}>Home</Link>
        <Link onClick={()=>setIsOpen(false)}  to={'/search'}><FaSearch/></Link>
        <Link onClick={()=>setIsOpen(false)}  to={'/cart'}><FaShoppingBag/></Link>
{user?._id ? (
<>
<button onClick={()=>setIsOpen((prev)=>!prev)}>
<FaUser/> 
</button>
<dialog open={isOpen}>
    <div>
        {
            user.role==="Admin"&&(
                <Link onClick={()=>setIsOpen(false)}  to='/admin/dashboard'>Admin</Link>
            )
        }
        <Link onClick={()=>setIsOpen(false)} to={'/orders'}>Orders</Link>
        <button onClick={logoutHandler}>
           <FaSignOutAlt/>
        </button>
    </div>
</dialog>
</>
) : <Link onClick={()=>setIsOpen(false)}  to={'/signIn'}><IoIosLogIn/></Link>}
    </nav>
  )
}

export default Headers
