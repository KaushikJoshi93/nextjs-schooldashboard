'use client'
import Navbar from "@/components/Navbar";
import SchoolCard from "@/components/SchoolCard";
import SchoolCardSkeleton from "@/components/SchoolCardSkeleton";
import { fetchAllSchools } from "@/lib/actions";
import { ChangeEvent,  useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
    type schoolDataType = { 
        id: number;
        school_name: string ; 
        school_email: string ; 
        school_address: string ; 
        school_city: string ;
        school_state: string ; 
        school_contact: string  
      }
    const [schoolsData , setSchoolsData] = useState<Array<schoolDataType>>([]);
    const [filteredSchoolData , setFilteredSchoolData] = useState<Array<schoolDataType>>([]);
    const [searchText , setSearchText] = useState("");
    const [showLoader , setShowLoader] = useState(true)

    const fetchSchools = async()=>{
        try {
            setShowLoader(true)
            const all_schools = await fetchAllSchools();
            setSchoolsData(all_schools);
            setFilteredSchoolData(all_schools);
            setShowLoader(false)

        } catch (err) {
            if(err instanceof Error){
                toast.error(err.message)
            }else{
                toast.error("Some Error Occured");
            }
        }
    }

    const filterResult = ()=>{
        if(searchText.trim() !== ""){
            const filteredResult = schoolsData.filter((obj)=>{
                const lowerCaseSchoolName = obj.school_name.toLowerCase();
                const lowerCaseSearchText = searchText.toLowerCase();

                if(lowerCaseSchoolName.includes(lowerCaseSearchText)){
                    return true;
                }
            })
            setFilteredSchoolData(filteredResult)
        }else{
            setFilteredSchoolData(schoolsData);
        }
    }

    useEffect(()=>{
        fetchSchools();
    },[])
  return (
    <div>
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center mt-24">
        <p className="text-3xl md:text-4xl font-bold">School Search</p>
        <div className="w-full flex justify-center gap-2 md:gap-4 mt-9">
          <div className="relative w-64 md:w-96 flex justify-center">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-500 rounded-lg w-full focus:outline-none focus:border-blue-500"
              value={searchText}
              onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchText(e.target.value)}
            />
            <svg
              className="absolute left-[5%] top-3 md:top-5 h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-5.2-5.2"
              />
              <circle cx="10" cy="10" r="8" />
            </svg>
          </div>
          <button className="flex justify-center items-center bg-[#125175] text-white p-2 md:p-4 rounded-lg" onClick={filterResult}>Search</button>
        </div>
      </div>

      <div className="flex flex-col items-center md:flex-row md:justify-center mt-9 flex-wrap gap-4">
        {
            filteredSchoolData.length ? filteredSchoolData.map((item , index)=>(
                <SchoolCard key={index} schoolName={item.school_name} schoolCity={item.school_city}/>
            )):
            showLoader ? Array.from(Array(3)).map((val , index)=>(
                <SchoolCardSkeleton key={index}/>
            )):
            <p>No Result Found</p>
        }
      </div>
    </div>
  );
};

export default page;
