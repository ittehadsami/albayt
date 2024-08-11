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
function Donors() {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]); // Store post data
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isloading, setLoading] = useState(true);
  const [iserror, setError] = useState(null);
  const [activePage, setactivePage] = useState(1);
  const [itemToEdit, setItemToEdit] = useState(null);
  const offset = currentPage * itemsPerPage;
  const [totalPosts, setTotalPosts] = useState(1);
  const pageCount = Math.ceil(totalPosts / itemsPerPage);
  const [editPost, setEditPost] = useState({
    name: "",
    email: "",
    phone: "",
    fund: "",
    status: "",
    post: "",
  });

  // Fetch Pledges
  const fetchPledge = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`/admin/pledges?page=${activePage}&limit=${itemsPerPage}`)
      .then((res) => {
        const fetchedTotalPost = res?.data?.meta?.totalCount || 0;
        const newOffset =
          fetchedTotalPost > 0
            ? ((activePage - 1) * itemsPerPage) % fetchedTotalPost
            : 0;
        setData(res?.data?.data || []);
        setLoading(false);
        setTotalPosts(fetchedTotalPost);
      })
      .catch((e) => {
        console.error("Error fetching data:", e); // Log the error for better debugging
        setError(true);
        setLoading(false);
      });
  };
  //Fetch Posts
  const fetchPost = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`/user/posts`)
      .then((res) => {
        setPosts(res?.data?.data || []);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Error fetching posts:", e);
        setError(true);
        setLoading(false);
      });
  };
  // UseEffect to Fetch Data
  useEffect(() => {
    fetchPledge();
    fetchPost();
  }, [activePage]);

  //Post Donor
  const handleSubmit = (e) => {
    delete editPost.status;
    const convertedData = objectToFormData(editPost);
    e.preventDefault();
    axios
      .post(`/pledge`, convertedData)
      .then((res) => {
        setIsModalOpen(false);
        toast.success(res?.data?.message);
        setEditPost({
          name: "",
          email: "",
          phone: "",
          fund: "",
          post: "",
        });
        fetchPledge();
      })
      .catch((e) => {
        console.error("Error updating post:", e);
        toast.error("Post Update Failed");
      });
  };

  // Edit
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
    let convertedData = editPost;
    delete convertedData._id;
    delete convertedData.foundReceivedDate;
    delete convertedData.existence;
    delete convertedData.createdAt;
    delete convertedData.updatedAt;
    delete convertedData._v;

    // Make sure the URL is correct
    axios
      .put(`/admin/pledges/${itemToEdit._id}`, convertedData)
      .then((res) => {
        toast.success(res?.data?.message); // Assuming `toast` is imported correctly
        setIsEditModalOpen(false);

        // Resetting the form after a successful edit
        setEditPost({
          name: "",
          email: "",
          phone: "",
          fund: "",
          status: "",
        });

        fetchPledge(); // Fetch the updated list after the edit
      })
      .catch((e) => {
        console.error("Error updating post:", e);
        toast.error("Post Update Failed");
      });
  };
  const handleEditClick = (item) => {
    setEditPost(item);
    setItemToEdit(item);
    setIsEditModalOpen(true);
  };

  // Handle Page Click
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    setactivePage(event.selected + 1);
  };

  // Handle Delete
  const handleDelete = () => {
    console.log(`Deleting post with id: ${itemToDelete}`);
    axios
      .put(`/admin/pledges/${itemToDelete}`, { existence: false })
      .then((res) => {
        toast.success(res?.data?.message);
        fetchPledge(); // Fetch updated data after deletion
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
      })
      .catch((e) => {
        console.error("Error deleting item:", e); // Log the error for better debugging
        toast.error("Post Delete Failed");
      });
  };
  // Find the post name by its ID
  const findPostName = (postId) => {
    const post = posts.find((p) => p._id === postId);
    return post ? post.name : "Unknown Post";
  };
  return (
    <>
      <div className="flex justify-between p-3 pr-10">
        <div className="text-3xl text-bold">Donor List</div>
        <button
          type="button"
          className="ml-0 p-2 md:mt-0 mt-2 bg-gray-800 text-center h-10  text-white rounded-md border border-transparent hover:bg-white hover:text-[#1f2937] hover:border-[#1f2937]  transition duration-300 "
          onClick={() => setIsModalOpen(true)}
        >
          Add Donors +
        </button>
      </div>
      <div>
        <div className="overflow-x-auto pt-3">
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
                  Email
                </th>
                <th className="px-2 text-center md:text-lg text-xs font-semibold">
                  Phone Number
                </th>

                <th className="px-2 text-center md:text-lg text-xs font-semibold">
                  Fund Provided
                </th>
                <th className="px-2 text-center md:text-lg text-xs font-semibold">
                  Funded For
                </th>
                <th className="px-2 text-center md:text-lg text-xs font-semibold">
                  Status
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
                    {item.email}
                  </td>
                  <td className="px-5 text-center  md:text-lg text-xs text-[#48525C] py-6">
                    {item.phone}
                  </td>
                  <td className="px-5 text-center  md:text-lg text-xs text-[#48525C] py-6">
                    {item.fund}
                  </td>
                  <td className="px-5 text-center  md:text-lg text-xs text-[#48525C] py-6">
                    {findPostName(item.post)}
                  </td>
                  <td className="px-5 text-center  md:text-lg text-xs text-[#48525C] py-6">
                    {item.status}
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
                  Edit Donor
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
                    <label className="text-lg"> Email </label>
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
                    <label className="text-lg">
                      {" "}
                      Fund&nbsp;<span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      className="border border-black rounded-md p-2  w-full mt-2 pl-3 focus:outline-cyan-500"
                      placeholder="Provide Fund"
                      required
                      type="text"
                      name="fund"
                      value={editPost.fund}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="md:w-auto w-full flex flex-col mb-5">
                    <label className="text-lg">
                      {" "}
                      Funded For&nbsp;<span className="text-red-500">
                        *
                      </span>{" "}
                    </label>

                    <select
                      id="post"
                      className="border border-black rounded-md h-10  w-full mt-2 pl-3 focus:outline-cyan-500"
                      required
                      name="post"
                      value={editPost.post}
                      onChange={handleEditInputChange}
                    >
                      <option value="">Select Patient for donation</option>
                      {posts?.map((item, index) => (
                        <option key={index} value={`${item?._id}`}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:w-auto w-full flex flex-col mb-5">
                    <label className="text-lg">
                      {" "}
                      Status&nbsp;<span className="text-red-500">*</span>{" "}
                    </label>

                    <select
                      id="status"
                      className="border border-black rounded-md h-10  w-full mt-2 pl-3 focus:outline-cyan-500"
                      required
                      name="status"
                      value={editPost.status}
                      onChange={handleEditInputChange}
                    >
                      <option value="">Select Patient for donation</option>
                      <option value="pending">pending</option>
                      <option value="approved">approved</option>
                    </select>
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
      {isModalOpen && (
        <div className="fixed flex justify-center items-center inset-0 bg-black bg-opacity-80 ">
          <div className="bg-white w-[70%] h-[90vh] p-5 px-10 rounded-lg overflow-y-auto">
            <div className="w-full gap-5">
              {/* head */}

              <div className="relative mt-12">
                <div className="font-bold text-cyan-500 text-3xl flex items-center justify-center">
                  Add Donor
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-[-50px] right-0 text-cyan-500 text-[30px] font-semibold transition duration-300 "
                >
                  <IoClose />
                </button>
              </div>

              {/* form */}
              <form onSubmit={handleSubmit}>
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
                    <label className="text-lg"> Email </label>
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
                    <label className="text-lg">
                      {" "}
                      Fund&nbsp;<span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      className="border border-black rounded-md p-2  w-full mt-2 pl-3 focus:outline-cyan-500"
                      placeholder="Provide Fund"
                      required
                      type="text"
                      name="fund"
                      value={editPost.fund}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="md:w-auto w-full flex flex-col mb-5">
                    <label className="text-lg">
                      {" "}
                      Funded For&nbsp;<span className="text-red-500">
                        *
                      </span>{" "}
                    </label>

                    <select
                      id="post"
                      className="border border-black rounded-md h-10  w-full mt-2 pl-3 focus:outline-cyan-500"
                      required
                      name="post"
                      value={editPost.post}
                      onChange={handleEditInputChange}
                    >
                      <option value="">Select Patient for donation</option>
                      {posts?.map((item, index) => (
                        <option key={index} value={`${item?._id}`}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
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

export default Donors;
