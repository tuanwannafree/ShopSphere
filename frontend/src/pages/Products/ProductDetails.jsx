import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useGetProductByIdQuery, useCreateReviewMutation } from "../redux/api/productApiSlice"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { FaBox, FaClock, FaShoppingCart, FaStore, FaStar } from "react-icons/fa"
import moment from "moment"
import HeartIcon from "./HeartIcon"

const ProductDetails = () => {
    const {id: productId} = useParams()
    console.log(productId)
    const navigate = useNavigate()
    // const dispatch = useDispatch()

    const [qty, SetQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const {data: product, isLoading, refetch, error} = useGetProductByIdQuery(productId)
    const {userInfo} = useSelector((state) => state.auth)
    const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation()
  return (
    <>
      <div>
        <Link to="/" className="text-white font-semibold hover:underline ml-[10rem]">Go Back</Link>
      
      </div>
      {isLoading ? (
        <Loader />) : error ? (
          <Message variant="danger">{error?.data?.message || error?.message}</Message>
        ) : (
          <>
          <div className="flex flex-wrap relative items-between my-[2rem] ml-[1rem]">
            <div>
                <img src={product.image} alt={product.name} className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]" />
                <HeartIcon product={product} />
            </div>
            <div className="flex flex-col justify-between">
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <p className="my-4 xl:w-[35rem] lg:w-[35rem] text-[#B0B0B0] md:w-[30rem]">{product.description}</p>
            <p className="text-5xl my-4 font-extrabold">$ {product.price}</p>
            <div className="flex items-center justify-between w-[20rem]">
                <div className="one">
                    <h1 className="flex items-center mb-6">
                        <FaStore className="mr-2 text-white"/> Brand:{" "} {product.brand}
                    </h1>
                    <h1 className="flex items-center mb-6">
                        <FaStore className="mr-2 text-white"/> Brand:{" "} {product.brand}
                    </h1>
                    <h1 className="flex items-center mb-6">
                        <FaStore className="mr-2 text-white"/> Added:{" "} {moment(product.createdAt).fromNow()}
                    </h1>
                </div>
            </div>
            </div>
          </div>
          </>
        
      )}
    </>
  )
}

export default ProductDetails
