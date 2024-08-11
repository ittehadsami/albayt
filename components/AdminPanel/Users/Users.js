"use client";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "@/plugins/axios";
import Image from "next/image";
function Users() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [isloading, setLoading] = useState(true);
  const [iserror, setError] = useState(null);
  const [activePage, setactivePage] = useState(1);
  const offset = currentPage * itemsPerPage;
  const [totalUsers, setTotalUsers] = useState(1);
  const pageCount = Math.ceil(totalUsers / itemsPerPage);

  // Fetch Users
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:3001/doctors");
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError(true);
      }
    };

    fetchDoctors();
  }, []);
  // const fetchUsers = () => {
  //   setLoading(true);
  //   setError(null);
  //   axios
  //     .get(`/doctors`)
  //     .then((res) => {
  //       const fetchedTotalUsers = res?.data?.meta?.totalCount || 0;
  //       setData(res?.data?.data || []);
  //       setLoading(false);
  //       setTotalUsers(fetchedTotalUsers);
  //     })
  //     .catch((e) => {
  //       setError(true);
  //       setLoading(false);
  //     });
  // };

  // UseEffect to Fetch Data
  // useEffect(() => {
  //   fetchUsers();
  // }, [activePage]);

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
              <tr className="bg-pink-600 text-white">
                <th className="w-[30px] text-center px-3 rounded-l-[10px] md:text-lg text-xs font-semibold">
                  Sl.
                </th>
                <th className="px-2 text-center md:text-lg text-xs font-semibold">
                  Name
                </th>

                <th className="px-2 text-center md:text-lg text-xs font-semibold">
                  Specialization
                </th>
                <th className="px-2 text-center md:text-lg text-xs font-semibold">
                  Image
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
              {doctors?.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-200"}`}
                >
                  <td className="px-2 rounded-l-[10px] md:text-lg text-xs text-[#48525C] text-center">
                    {offset + index + 1}
                  </td>
                  <td className="px-2 text-center md:text-lg text-xs text-[#48525C] py-6">
                    {item.name}
                  </td>
                  {/* <td className="px-5 text-center  md:text-lg text-xs text-[#48525C] py-6">
                    {item.age}
                  </td> */}
                  <td className="px-5 text-center  md:text-lg text-xs text-[#48525C] py-6">
                    {item.specialization}
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
    </>
  );
}

export default Users;
