import { useNavigate } from 'react-router-dom';
function MainHomeSection() {
  const navigate = useNavigate();
  return (
    <div className='flex-col-reverse h-[90vh] lg:h-[90vh] w-full flex lg:flex-row border-b border-black'>
      <div className='w-full lg:w-1/2 bg-white h-full px-10 flex flex-col justify-end py-10 gap-3'>
        
            <h1 className='font-display text-3xl md:text-4xl lg:text-5xl'>Organic Wool Jacket</h1>
            <button className='font-display text-2xl w-fit px-10 py-2 rounded-xl border border-black' onClick={()=>navigate('/shop')}>Shop</button>
        
      </div>
      <div className='w-full lg:w-1/2  h-full'>
        <img className='object-cover w-full h-full object-center' src="https://markaware.jp/cdn/shop/files/20240524_87349_2400x2400.jpg?v=1720094591"/>
      </div>
    </div>
  )
}

export default MainHomeSection
