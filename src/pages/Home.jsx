import React from "react";
import Hero from "../components/Hero"
function Home ({laptop}){
    return (
        <div className="h-screen flex text-center justify-center">
            <Hero />
            
            <div className="h-screen w-full lg:px-[10%] px-5">
                <div className="flex justify-between items-center ">
                    <h3 className="my-10 text-3xl">Product List</h3>
                    <a href="#">View all</a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {laptop.map((item)=>(
                        <div key={item.id} className="h-150 bg-pink-50 shadow-pink-500 shadow-xs hover:shadow-lg transform duration-300 rounded-md overflow-hidden ">
                            <div className="h-2/4">
                                <img src={item.image} alt="" className="h-full w-full"/>
                            </div>

                            <div>
                                <p className="font-bold">{item.title}</p>
                                <p className="font-bold text-red-500">{item.price}</p>
                                <p className="text-start ps-2">{item.description}</p>
                                <p className="text-start ps-2 font-bold">{item.rate}</p>
                            </div>
                        </div>

                        
                    ))}
                </div>
            </div>
        </div>

    )
}
export default Home;
