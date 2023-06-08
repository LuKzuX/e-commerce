import useCarrousel from "../functions/useCarrousel"
import { Link } from "react-router-dom"
import { useRef } from "react"
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"

const Carrousel = () => {
  const { carrousel } = useCarrousel()
  const ref = useRef(null)
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset
  }
  return (
    <div className='mt-20'>
      <h1 className='font-normal mt-5 text-3xl font-bold text-gray-700 font-sans'>
        You May Like
      </h1>
      <div
        className='scroll-smooth mt-3 grid grid-flow-col auto-cols-[minmax(60vw,_60vw)] gap-5 overflow-x-auto scrollbar-hide overscroll-x-contain
      md:auto-cols-[minmax(33vw,_33vw)] lg:auto-cols-[minmax(25vw,_25vw)] xl:auto-cols-[minmax(16vw,_16vw)]'
        ref={ref}
      >
        {carrousel &&
          carrousel.map((x) => (
            <div
              className='flex flex-col h-auto snap-mandatory mb-10'
              key={x._id}
            >
              <Link to={`/product-details/${x._id}`}>
                <img
                  className='rounded-sm border-2 object-contain aspect-video'
                  src={x.image}
                  alt={x.name}
                />
                <div className='mt-3'>
                  <p className='text-gray-800 font-semibold'>{x.name}</p>
                  <p className='text-gray-500'>${x.price}</p>
                </div>
              </Link>
            </div>
          ))}
      </div>
      <div className='flex justify-center mb-10'>
        <button
          className='p-3 hidden mr-3 text-white bg-gray-500 lg:block bg-color-red'
          onClick={() => scroll(-600)}
        >
          <AiOutlineArrowLeft />
        </button>
        <button
          className='p-3 hidden text-white bg-gray-500 lg:block'
          onClick={() => scroll(600)}
        >
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  )
}

export default Carrousel
