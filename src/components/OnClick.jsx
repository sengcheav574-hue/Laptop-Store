import React, {useState} from "react";

function OnClick() {
    const [like , setlike] = useState(false);

    const handleclick = () => {
        setlike(!like);
        console.log(like);
        
    }
  return (
    <div className="h-1/2 flex justify-center items-center gap-5">
       <div onClick={() => {alert("This is a onclick event!")}} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Click me</div>
    
        <div className="w-75 h-100 bg-amber-100 relative mt-5">
          <div onClick={handleclick} className="absolute right-5 text-4xl">
            {like ? "❤️" : "🤍"}

          </div>

        </div>
    </div>

  )
}

export default OnClick