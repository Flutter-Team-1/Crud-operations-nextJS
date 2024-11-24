'use client'
import { SetStateAction, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Pagination from "@/components/paginations";
import TopBar from "@/components/topBar";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
// const users = [
//    {
//       "id": "673e0a6e2cc829cf5c571b34",
//       "name": "Jodi Tran",
//       "email": "joditran@handshake.com",
//       "mobile": "+91 (845) 407-3552"
//    },
//    {
//       "id": "673e0a6ef0d2fbc12b47e848",
//       "name": "Garcia Oneill",
//       "email": "garciaoneill@handshake.com",
//       "mobile": "+91 (845) 511-2132"
//    },
//    {
//       "id": "673e0a6e46d9c37990e31f80",
//       "name": "Noelle English",
//       "email": "noelleenglish@handshake.com",
//       "mobile": "+91 (880) 593-3701"
//    },
//    {
//       "id": "673e0a6e9ddefa340bc3674c",
//       "name": "Charity Blankenship",
//       "email": "charityblankenship@handshake.com",
//       "mobile": "+91 (924) 410-2856"
//    },
//    {
//       "id": "673e0a6e475c933d48c9d5aa",
//       "name": "Hendricks Diaz",
//       "email": "hendricksdiaz@handshake.com",
//       "mobile": "+91 (856) 493-2536"
//    },
//    {
//       "id": "673e0a6ef3c4db432da1457b",
//       "name": "Erika Whitley",
//       "email": "erikawhitley@handshake.com",
//       "mobile": "+91 (992) 552-2365"
//    },
//    {
//       "id": "673e0a6e97692469d02806d8",
//       "name": "Bernadine Ryan",
//       "email": "bernadineryan@handshake.com",
//       "mobile": "+91 (916) 548-2731"
//    },
//    {
//       "id": "673e0a6ef555162911ce2f0d",
//       "name": "Puckett Sexton",
//       "email": "puckettsexton@handshake.com",
//       "mobile": "+91 (870) 577-3072"
//    },
//    {
//       "id": "673e0a6e76867a683ca41563",
//       "name": "Mccormick Lott",
//       "email": "mccormicklott@handshake.com",
//       "mobile": "+91 (997) 458-2630"
//    },
//    {
//       "id": "673e0a6e04d3ab5e66191d62",
//       "name": "Browning Good",
//       "email": "browninggood@handshake.com",
//       "mobile": "+91 (848) 525-2963"
//    },
//    {
//       "id": "673e0a6ed72a181f855d92bd",
//       "name": "Sara Perkins",
//       "email": "saraperkins@handshake.com",
//       "mobile": "+91 (933) 542-2441"
//    },
//    {
//       "id": "673e0a6e92c426299f5aedf1",
//       "name": "Hyde Estes",
//       "email": "hydeestes@handshake.com",
//       "mobile": "+91 (934) 591-2729"
//    },
//    {
//       "id": "673e0a6ec5557a700bc797ab",
//       "name": "Middleton Mccullough",
//       "email": "middletonmccullough@handshake.com",
//       "mobile": "+91 (883) 443-2411"
//    },
//    {
//       "id": "673e0a6eb122c5f380ffbf70",
//       "name": "Cleo Navarro",
//       "email": "cleonavarro@handshake.com",
//       "mobile": "+91 (854) 403-2684"
//    },
//    {
//       "id": "673e0a6e5f407c376a71c8df",
//       "name": "Alta Brady",
//       "email": "altabrady@handshake.com",
//       "mobile": "+91 (976) 404-2050"
//    },
//    {
//       "id": "673e0a6eb5c4ae1886702775",
//       "name": "Ingrid Bailey",
//       "email": "ingridbailey@handshake.com",
//       "mobile": "+91 (800) 472-3813"
//    },
//    {
//       "id": "673e0a6ee9bb40eaecf0e5e4",
//       "name": "Fern Shelton",
//       "email": "fernshelton@handshake.com",
//       "mobile": "+91 (865) 418-2483"
//    },
//    {
//       "id": "673e0a6e5af9d027bed7b1ce",
//       "name": "Maura Moran",
//       "email": "mauramoran@handshake.com",
//       "mobile": "+91 (955) 404-2962"
//    },
//    {
//       "id": "673e0a6e3980802e02cd9c36",
//       "name": "Iris Fry",
//       "email": "irisfry@handshake.com",
//       "mobile": "+91 (922) 510-2937"
//    },
//    {
//       "id": "673e0a6edffa1b7ac4d3560b",
//       "name": "Britney Bradford",
//       "email": "britneybradford@handshake.com",
//       "mobile": "+91 (951) 547-2709"
//    }
// ];
export default function Home() {
   const router = useRouter();
   const [usersData, setUsersData] = useState([]);
   const [pageNumber, setPageNumber] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const [loader, setLoader] = useState(false);

   useEffect(() => {
      setUsersData([]);
      setTotalPages(1);
   }, [])
   const onPageChange = (event: SetStateAction<number>) => {
      setPageNumber(event)
   }
   const addUser = () => {
      setLoader(true)
      router.push('/users/userForm')
   }
   return (<>
      <TopBar></TopBar>
      <div className="flex justify-center m-5">
         <div className="container mx-auto p-4">
            {/* Header Section */}
            <div className="flex justify-between items-center bg-white shadow-md rounded p-4 mb-6">
               <h1 className="text-3xl font-semibold text-gray-800">Users</h1>
               <Button variant="contained" color="primary" onClick={addUser}>
                  Add User
               </Button>
            </div>

            {/* Table Section */}
            <div className="bg-white shadow-md rounded max-h-80 overflow-auto">
               {usersData.length > 0 ? (
                  <table className="w-full text-sm text-left border-collapse">
                     <thead className="bg-blue-200 text-gray-700 uppercase">
                        <tr>
                           <th className="py-3 px-4 border-b">S.No</th>
                           <th className="py-3 px-4 border-b">Name</th>
                           <th className="py-3 px-4 border-b">Email</th>
                           <th className="py-3 px-4 border-b">Mobile</th>
                           <th className="py-3 px-4 border-b">Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {usersData.map((user: { id: number, name: string, email: string, mobile: string }, index: number) => (
                           <tr
                              key={user.id}
                              className={`hover:bg-blue-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                 }`}
                           >
                              <td className="py-3 px-4 border-b">{index + 1}</td>
                              <td className="py-3 px-4 border-b">{user.name}</td>
                              <td className="py-3 px-4 border-b">{user.email}</td>
                              <td className="py-3 px-4 border-b">{user.mobile}</td>
                              <td className="py-3 px-4 border-b space-x-4">
                                 <button
                                    className="text-blue-500 hover:text-blue-700"
                                 // onClick={() => editForm(user)}
                                 >
                                    <i className="ri-pencil-fill text-xl" />
                                 </button>
                                 <button
                                    className="text-red-500 hover:text-red-700"
                                 // onClick={() => deleteuser()}
                                 >
                                    <i className="ri-delete-bin-5-fill text-xl"></i>
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               ) : (
                  <div className="text-center py-6 text-gray-500">No data found</div>
               )}
            </div>

            {/* Pagination */}
            {usersData.length > 0 && (

               <div className="flex justify-end mt-4">
                  <Pagination
                     currentPage={pageNumber}
                     totalPages={totalPages}
                     onPageChange={onPageChange}
                  />
               </div>)
            }
         </div>
         {loader && <Loader></Loader>}
      </div>
   </>
   );
}
