import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Hero from './components/Hero'


function App() {
  const [count, setCount] = useState(0)
  const user = {
    name: "Dara",

    tel: "099998888"
  }

  const laptop = [
    {
    id: 1,
    title: "MSI katana 17 B13VEK",
    price: "1200$",
    description: "The MSI Katana 17 B13VEK-1052FR Dragon Station is a Gaming laptop equipped with a 13th-generation Intel Core processor, NVIDIA GeForce RTX 40 series graphics, DDR5 RAM, an ultra-fast PCIe SSD and a 144 Hz Full HD screen.",
    rate: 4.5,
    image: "https://storage-asset.msi.com/global/picture/product/product_17453875563e17f33fdf5d6848a9796baf44abb506.png"
  },
    {
    id: 2,
    title: "MSI katana 17 B13VFK",
    price: "1200$",
    description: "The MSI Katana 17 B13VFK-1052FR Dragon Station is a Gaming laptop equipped with a 13th-generation Intel Core processor, NVIDIA GeForce RTX 40 series graphics, DDR5 RAM, an ultra-fast PCIe SSD and a 144 Hz Full HD screen.",
    rate: 4.5,
    image: "https://storage-asset.msi.com/global/picture/product/product_17453875563e17f33fdf5d6848a9796baf44abb506.png"
  },
    {
    id: 3,
    title: "MSI katana 17 B13VGK",
    price: "1200$",
    description: "The MSI Katana 17 B13VGK-1052FR Dragon Station is a Gaming laptop equipped with a 13th-generation Intel Core processor, NVIDIA GeForce RTX 40 series graphics, DDR5 RAM, an ultra-fast PCIe SSD and a 144 Hz Full HD screen.",
    rate: 4.5,
    image: "https://storage-asset.msi.com/global/picture/product/product_17453875563e17f33fdf5d6848a9796baf44abb506.png"
  },
    {
    id: 4,
    title: "MSI katana 17 b13vek",
    price: "1200$",
    description: "The MSI Katana 17 B13VEK-1052FR Dragon Station is a Gaming laptop equipped with a 13th-generation Intel Core processor, NVIDIA GeForce RTX 40 series graphics, DDR5 RAM, an ultra-fast PCIe SSD and a 144 Hz Full HD screen.",
    rate: 4.5,
    image: "https://storage-asset.msi.com/global/picture/product/product_17453875563e17f33fdf5d6848a9796baf44abb506.png"
  },
    {
    id: 5,
    title: "MSI katana 17 b13vek",
    price: "1200$",
    description: "The MSI Katana 17 B13VEK-1052FR Dragon Station is a Gaming laptop equipped with a 13th-generation Intel Core processor, NVIDIA GeForce RTX 40 series graphics, DDR5 RAM, an ultra-fast PCIe SSD and a 144 Hz Full HD screen.",
    rate: 4.5,
    image: "https://storage-asset.msi.com/global/picture/product/product_17453875563e17f33fdf5d6848a9796baf44abb506.png"
  },
    {
    id: 6,
    title: "MSI katana 17 b13vek",
    price: "1200$",
    description: "The MSI Katana 17 B13VEK-1052FR Dragon Station is a Gaming laptop equipped with a 13th-generation Intel Core processor, NVIDIA GeForce RTX 40 series graphics, DDR5 RAM, an ultra-fast PCIe SSD and a 144 Hz Full HD screen.",
    rate: 4.5,
    image: "https://storage-asset.msi.com/global/picture/product/product_17453875563e17f33fdf5d6848a9796baf44abb506.png"
  },
    {
    id: 7,
    title: "MSI katana 17 b13vek",
    price: "1200$",
    description: "The MSI Katana 17 B13VEK-1052FR Dragon Station is a Gaming laptop equipped with a 13th-generation Intel Core processor, NVIDIA GeForce RTX 40 series graphics, DDR5 RAM, an ultra-fast PCIe SSD and a 144 Hz Full HD screen.",
    rate: 4.5,
    image: "https://storage-asset.msi.com/global/picture/product/product_17453875563e17f33fdf5d6848a9796baf44abb506.png"
  },
    {
    id: 8,
    title: "MSI katana 17 b13vek",
    price: "1200$",
    description: "The MSI Katana 17 B13VEK-1052FR Dragon Station is a Gaming laptop equipped with a 13th-generation Intel Core processor, NVIDIA GeForce RTX 40 series graphics, DDR5 RAM, an ultra-fast PCIe SSD and a 144 Hz Full HD screen.",
    rate: 4.5,
    image: "https://storage-asset.msi.com/global/picture/product/product_17453875563e17f33fdf5d6848a9796baf44abb506.png"
  },
    {
    id: 9,
    title: "MSI katana 17 b13vek",
    price: "1200$",
    description: "The MSI Katana 17 B13VEK-1052FR Dragon Station is a Gaming laptop equipped with a 13th-generation Intel Core processor, NVIDIA GeForce RTX 40 series graphics, DDR5 RAM, an ultra-fast PCIe SSD and a 144 Hz Full HD screen.",
    rate: 4.5,
    image: "https://storage-asset.msi.com/global/picture/product/product_17453875563e17f33fdf5d6848a9796baf44abb506.png"
  },
    {
    id: 10,
    title: "MSI katana 17 b13vek",
    price: "1200$",
    description: "The MSI Katana 17 B13VEK-1052FR Dragon Station is a Gaming laptop equipped with a 13th-generation Intel Core processor, NVIDIA GeForce RTX 40 series graphics, DDR5 RAM, an ultra-fast PCIe SSD and a 144 Hz Full HD screen.",
    rate: 4.5,
    image: "https://storage-asset.msi.com/global/picture/product/product_17453875563e17f33fdf5d6848a9796baf44abb506.png"
  },
]

  return (
    <div>
     <Header user={user}/>
     <Home laptop={laptop}/>
     {/* <Footer /> */}
    </div>
  )
}

export default App
