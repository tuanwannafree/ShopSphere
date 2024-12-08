import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import SmallProduct from "./SmallProduct";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const settings = {
    data: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="mb-4 mt-2 xl:block lg:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">{error?.data.message || error.error}</Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[44rem] lg:w-[50rem] md:w-[50rem] sm:w-[34rem] sm:block"
        >
          {products.map(
            ({
              image,
              name,
              price,
              description,
              _id,
              brand,
              createdAt,
              numReviews,
              ratings,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem]"
                />
                <div className="flex justify-between w-[20rem]">
                  <div className="one">
                    <h2>{name}</h2>
                    <p>${price}</p> <br />
                    <br />
                    <p className="w-[25rem]">
                      {description.substring(0, 150)}...
                    </p>
                  </div>
                  <div className="flex justify-between w-[20rem]">
                    <div className="one w-[10rem]">
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaStore className="mr-2 text-white" />Brand: {brand}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaClock className="mr-2 text-white" />Added: {" "} {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaStar className="mr-2 text-white" />Reviews: {" "} {numReviews}
                      </h1>
                    </div>
                    <div className="two">
                      <h1 className="flex items-center mb-6  w-[10rem]">
                        <FaStar className="mr-2 text-white" />Ratings: {Math.round(ratings)}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaShoppingCart className="mr-2 text-white" />Quantity: {quantity}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[10rem]">
                        <FaBox className="mr-2 text-white" />In Stock: {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
