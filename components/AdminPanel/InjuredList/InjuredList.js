"use client";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import axios from "@/plugins/axios";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import Dropzone from "@/components/Dropzone/Dropzone";
import objectToFormData from "@/utils/objToFormData";
import { toast } from "react-toastify";

function InjuredList() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isloading, setLoading] = useState(true);
  const [iserror, setError] = useState(null);
  const [totalPosts, setTotalPosts] = useState(1);
  const [activePage, setactivePage] = useState(1);
  const [itemToEdit, setItemToEdit] = useState(null);
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(totalPosts / itemsPerPage);
  const [editPost, setEditPost] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    address: "",
    incidentDetails: "",
    requestedFund: "",
    receivedFund: "",
    image: null,
  });

  // Fetch Posts
  const fetchPost = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`/user/posts?page=${activePage}&limit=${itemsPerPage}`)
      .then((res) => {
        const fetchedTotalPost = res?.data?.meta?.totalCount || 0;
        setData(res?.data?.data || []);
        setLoading(false);
        setTotalPosts(fetchedTotalPost);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  };

  // UseEffect to Fetch Data
  useEffect(() => {
    fetchPost();
  }, [activePage]);

  // Edit Posts
  const handleEditClick = (item) => {
    setEditPost(item);
    setItemToEdit(item);
    setIsEditModalOpen(true);
  };
  const handleEditInputChange = (e) => {
    const { name, value, files } = e.target;
    setEditPost((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
  const handleEdit = (e) => {
    e.preventDefault();
    // Convert the data to FormData if there are files
    const convertedData = objectToFormData(editPost);
    // Make sure the URL is correct
    axios
      .put(`/user/posts/${itemToEdit._id}`, convertedData)
      .then((res) => {
        toast.success(res?.data?.message); // Assuming `toast` is imported correctly
        setIsEditModalOpen(false);

        // Resetting the form after a successful edit
        setEditPost({
          name: "",
          age: "",
          email: "",
          phone: "",
          address: "",
          incidentDetails: "",
          requestedFund: "",
          receivedFund: "",
          image: null,
        });

        fetchPost(); // Fetch the updated list after the edit
      })
      .catch((e) => {
        console.error("Error updating post:", e);
        toast.error("Post Update Failed");
      });
  };

  // Handle Delete
  const handleDelete = () => {
    console.log(`Deleting post with id: ${itemToDelete}`);
    axios
      .put(`/user/posts/${itemToDelete}`, { existence: false })
      .then((res) => {
        toast.success(res?.data?.message);
        fetchPost(); // Fetch updated data after deletion
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
      })
      .catch((e) => {
        console.error("Error deleting item:", e); // Log the error for better debugging
        toast.error("Post Delete Failed");
      });
  };
  // Handle Page Click
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    setactivePage(event.selected + 1);
  };
  return (
    <>
      <div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="h-[70px] rounded-xl">
              <tr className="bg-gray-900 text-white">
                <th className="w-[30px] text-center px-3 rounded-l-[10px] md:text-lg text-xs font-semibold">
                  Sl.
                </th>
                <th className="px-2 text-center md:text-lg text-xs font-semibold">
                  Name
                </th>
                <th className="px-2 text-center md:text-lg text-xs font-semibold">
                  Age
                </th>
                <th className="px-2 text-center md:text-lg text-xs font-semibold">
                  Email
                </th>
                <th className="px-2 text-center md:text-lg text-xs font-semibold">
                  Phone Number
                </th>
                <th className="px-2 text-center md:text-lg text-xs font-semibold">
                  Address
                </th>
                <th className="px-2 text-center md:text-lg text-xs font-semibold">
                  Incident Details
                </th>
                <th className="px-2 text-center md:text-lg text-xs font-semibold">
                  Image
                </th>
                <th className="px-2 text-center md:text-lg text-xs font-semibold">
                  Fund (BDT)
                </th>
                <th className="px-2 text-center md:text-lg text-xs font-semibold">
                  Fund Received
                </th>
                <th className="px-2 text-center md:w-[300px] rounded-r-[10px] w-[800px] md:text-lg text-xs font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="rounded-xl mb-20">
              {isloading && (
                <tr>
                  <td>Loading...</td>
                </tr>
              )}
              {iserror && (
                <tr>
                  <td>Error...</td>
                </tr>
              )}
              {data?.map((item, index) => (
                <tr
                  key={item._id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-200"}`}
                >
                  <td className="px-2 rounded-l-[10px] md:text-lg text-xs text-[#48525C] text-center">
                    {offset + index + 1}
                  </td>
                  <td className="px-2 text-center md:text-lg text-xs text-[#48525C] py-6">
                    {item.name}
                  </td>
                  <td className="px-5 text-center  md:text-lg text-xs text-[#48525C] py-6">
                    {item.age}
                  </td>
                  <td className="px-5 text-center  md:text-lg text-xs text-[#48525C] py-6">
                    {item.email}
                  </td>
                  <td className="px-5 text-center  md:text-lg text-xs text-[#48525C] py-6">
                    {item.phone}
                  </td>
                  <td className="px-5 text-center  md:text-lg text-xs text-[#48525C] py-6">
                    {item.address}
                  </td>
                  <td className="px-5 text-center  md:text-lg text-xs text-[#48525C] py-6 line-clamp-3">
                    {item.incidentDetails}
                  </td>
                  <td className="px-5 text-center  md:text-lg text-xs text-[#48525C] py-6">
                    <Image
                      width={100}
                      height={100}
                      className="w-[100px] max-h-[35.625rem] "
                      src={item.image}
                      alt="Pic"
                    />
                  </td>
                  <td className="px-5 text-center  md:text-lg text-xs text-[#48525C] py-6">
                    {item.requestedFund}
                  </td>
                  <td className="px-5 text-center md:text-lg text-xs text-[#48525C] py-6">
                    {item.receivedFund}
                  </td>
                  <td className="px-3">
                    <div className="flex justify-center items-center gap-2">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          className="bg-[#20b486] hover:bg-[#1a945c] transition duration-300 ease-in-out p-2 rounded-lg cursor-pointer"
                          onClick={() => {
                            setIsEditModalOpen(true);
                            handleEditClick(item);
                          }}
                        >
                          <FiEdit className="text-white text-[18px]" />
                        </button>
                        <button
                          onClick={() => {
                            setIsDeleteModalOpen(true);
                            setItemToDelete(item._id);
                          }}
                          className="bg-[#E04D4D] hover:bg-[#ff1a1a] transition duration-300 ease-in-out p-2 rounded-lg cursor-pointer"
                        >
                          <AiOutlineDelete className="text-white text-[18px]" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="bg-white w-[50%] h-[40vh] p-5 rounded-lg flex flex-col items justify-center">
            <div className="w-full flex flex-col justify-center items-center gap-5">
              <div className="text-bold text-black text-2xl">
                Are you sure you want to delete this item?
              </div>
              <div className="flex flex-row w-full items-center justify-around mt-2">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="py-2 px-7 bg-red-600 text-center w-[40%] text-white rounded-md border border-red-600 hover:bg-white hover:text-[#1f2937] hover:border-[#1f2937] transition duration-300"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setItemToDelete(null);
                  }}
                  className="py-2 px-7 bg-white text-center w-[40%] rounded-md border border-black hover:bg-white text-[#1f2937] hover:border-[#1f2937] transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed flex justify-center items-center inset-0 bg-black bg-opacity-80 ">
          <div className="bg-white w-[70%] h-[90vh] p-5 px-10 rounded-lg overflow-y-auto">
            <div className="w-full gap-5">
              {/* head */}

              <div className="relative mt-12">
                <div className="font-bold text-cyan-500 text-3xl flex items-center justify-center">
                  Edit Post
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="absolute top-[-50px] right-0 text-cyan-500 text-[30px] font-semibold transition duration-300 "
                >
                  <IoClose />
                </button>
              </div>

              {/* form */}
              <form onSubmit={handleEdit}>
                <div className="md:grid md:grid-cols-2 mt-10 gap-4 justify-center items-start w-full text-[#1f2937]">
                  <div className="md:w-auto mb-5 w-full flex flex-col">
                    <label className="text-lg">
                      {" "}
                      Name&nbsp;<span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      className="border border-black rounded-md p-2  w-full mt-2 pl-3 focus:outline-cyan-500"
                      placeholder="Provide Name"
                      required
                      type="text"
                      name="name"
                      value={editPost.name}
                      onChange={handleEditInputChange}
                    />
                  </div>

                  <div className="md:w-auto mb-5 w-full flex flex-col">
                    <label className="text-lg">Age </label>
                    <input
                      className="border border-black rounded-md p-2  w-full mt-2 pl-3 focus:outline-cyan-500"
                      placeholder="Provide Age"
                      type="number"
                      name="age"
                      value={editPost.age}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="md:w-auto mb-5 w-full flex flex-col">
                    <label className="text-lg"> Email</label>
                    <input
                      className="border border-black rounded-md p-2  w-full mt-2 pl-3 focus:outline-cyan-500"
                      placeholder="Provide Email"
                      type="text"
                      name="email"
                      value={editPost.email}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="md:w-auto w-full flex flex-col mb-5">
                    <label className="text-lg">
                      {" "}
                      Phone&nbsp;<span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      className="border border-black rounded-md p-2  w-full mt-2 pl-3 focus:outline-cyan-500"
                      placeholder="Provide Phone Number"
                      required
                      type="text"
                      name="phone"
                      value={editPost.phone}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="md:w-auto mb-5 w-full flex flex-col">
                    <label className="text-lg"> Address</label>
                    <input
                      className="border border-black rounded-md p-2  w-full mt-2 pl-3 focus:outline-cyan-500"
                      placeholder="Provide Address"
                      type="text"
                      name="address"
                      value={editPost.address}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="md:w-auto mb-5 w-full flex flex-col">
                    <label className="text-lg"> Incident Details</label>
                    <input
                      className="border border-black rounded-md p-2  w-full mt-2 pl-3 focus:outline-cyan-500"
                      placeholder="Provide Incident Details"
                      type="text"
                      name="incidentDetails"
                      value={editPost.incidentDetails}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="md:w-auto w-full flex flex-col mb-5">
                    <label className="text-lg"> Requested Fund</label>
                    <input
                      className="border border-black rounded-md p-2  w-full mt-2 pl-3 focus:outline-cyan-500"
                      placeholder="Provide Requested Fund"
                      type="number"
                      name="requestedFund"
                      value={editPost.requestedFund}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="md:w-auto w-full flex flex-col mb-5">
                    <label className="text-lg"> Receiveed Fund</label>
                    <input
                      className="border border-black rounded-md p-2  w-full mt-2 pl-3 focus:outline-cyan-500"
                      placeholder="Provide Receiveed Fund"
                      type="number"
                      name="receivedFund"
                      value={editPost.receivedFund}
                      onChange={handleEditInputChange}
                    />
                  </div>

                  <div className=" col-span-2 mb-5 w-full ">
                    <Dropzone
                      handleInputChange={handleEditInputChange}
                      image={editPost?.image}
                    />
                  </div>
                </div>
                <div className="flex w-full items-center justify-center mt-2">
                  <button
                    type="submit"
                    // onClick={() => setIsModalOpen(false)}
                    className="py-3 px-7  text-center md:w-96 mt-5 w-full text-white rounded-md border   transition duration-300 font-bold bg-cyan-500  outline hover:bg-white hover:text-cyan-500 hover:outline-1 hover:outline-cyan-500"
                  >
                    Submit
                  </button>
                </div>
                {/* submit */}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InjuredList;
