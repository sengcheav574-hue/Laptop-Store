import { VscAccount } from "react-icons/vsc";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";

function Header ({user}){
    return (
        <header className=' flex items-center justify-between bg-pink-300 h-[100px]: px-[10%]'>
        {/* logo */}
        <div className='text-2xl p-3'>logo</div>
        {/* navbar */}
        <nav className='lg:flex hidden gap-10 text-xl'>
          <a href="#">Home</a>
          <a href="#">Categary</a>
          <a href="#">Delivery</a>
          <a href="#">Deals</a>
        </nav>
        {/* service */}
        <div className=' hidden md:flex gap-7'>
          <div className=' flex relative items-center justify-end '>
            <input type="text" placeholder='Search Products here' className='bg-pink-200 p-2 rounded-full'/>
            <IoSearchSharp className='absolute text-xl mr-2'/>
          </div>
          
          <div className='flex gap-5 items-center relative'>
            <MdOutlineShoppingCart className='text-2xl'/>
            <p className='text-xl'>Card</p>
            <span className='absolute top-0.5 bg-red-700 text-gray-100 flex justify-center items-center w-4 h-4 text-xs right-12 rounded-full '>0</span>
          </div>

          <div className='flex gap-5 items-center'>
            <VscAccount  className='text-2xl'/>
            <div>
              <p className="text-xs font-bold">{user.name}</p>
              <p className="text-[12px]">{user.tel}</p>
            </div>
          </div>
          
        </div>
        <div className="flex md:hidden" >
            <IoMenu className=" text-3xl items-center"/>
          </div>
      </header>
    )
}

export default Header;

