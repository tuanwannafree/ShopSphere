import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch paginated products with optional keyword search
    getProducts: builder.query({
      query: ({ keyword }) => {
        const params = keyword ? { keyword } : {};  // Only add keyword if it's defined
        return {
          url: PRODUCT_URL,
          params,  // Pass the params object dynamically
        };
      },
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    

    // Fetch a single product by ID
    getProductById: builder.query({
      query: (productId) => `${PRODUCT_URL}/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    // Fetch all products (for admin or full access use case)
    getAllProducts: builder.query({
      query: () => `${PRODUCT_URL}/allProducts`,
      providesTags: ["Product"],
    }),

    // Create a new product
    createProduct: builder.mutation({
      query: (productData) => ({
        url: PRODUCT_URL,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),

    // Update an existing product
    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product", id: productId },
      ],
    }),

    // Upload product image
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),

    // Delete a product
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),

    // Create a review for a product
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: `${PRODUCT_URL}/${reviewData.productId}/reviews`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product", id: productId },
      ],
    }),

    // Fetch top-rated products
    // getTopProducts: builder.query({
    //   query: () => `${PRODUCT_URL}/top`,
    //   keepUnusedDataFor: 5,
    // }),

    // Fetch newly added products
    getNewProducts: builder.query({
      query: () => `${PRODUCT_URL}/new`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetProductByIdQuery,
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useUploadProductImageMutation,
} = productApiSlice;
