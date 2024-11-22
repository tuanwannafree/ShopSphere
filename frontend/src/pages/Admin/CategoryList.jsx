import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectCategory, setSelectCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if(!name){
      return toast.error("Category name is required");
    }
    try {
      const result =await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      }
      else{
          setName("");
          toast.success(`${result.name} created successfully`);

      }
    } catch (error) {
        console.log(error)
      toast.error(error?.data?.message || error.message);
    }
    
  };
  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className=" border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-pink-500"
                onClick={() => {
                  setModalVisible(true),
                    setSelectCategory(category),
                    setUpdateName(category.name);
                }}
              >{category.name}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
