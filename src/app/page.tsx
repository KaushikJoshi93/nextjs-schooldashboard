'use client'
import Navbar from '@/components/Navbar'
import Bg from '../../public/assets/bg.jpg'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { addSchool } from '@/lib/actions'
import toast from 'react-hot-toast'
import Loader from '@/components/Loader'

interface IFormInput {
  school_name:string
  school_address: string
  school_city: string
  school_state: string
  school_contact: string
  school_email: string
}

export default function Home() {
  const {register , formState:{errors} , handleSubmit , reset} = useForm<IFormInput>();
  const [showloader , setShowLoader] = useState(false);
  const [file , setFile] = useState<File|null>(null);

  const onSubmit = async(data:IFormInput)=>{
    try {
      setShowLoader(true)
      const msg = await addSchool(data);
      reset();
      setShowLoader(false)
      setFile(null)
      toast.success(msg.message);
    } catch (err) {
      if(err instanceof Error){
        toast.error(err.message)
      }else{
        toast.error("Error Occured")
      }
      setShowLoader(false)
    }
  }
  
  return (
    <main className="flex min-h-screen w-full flex-col  p-2 relative gap-4 transition-all duration-1000" style={{background:`url(${Bg.src})` , backgroundRepeat:"round"}}>
        <div className="absolute inset-0 z-0  bg-gray-900 opacity-50"></div>
        <Navbar/> 
        <form className='z-[1] flex flex-col gap-4  items-center justify-center bg-[#ffffff65] p-4 md:p-16  md:ml-28 md:mr-28 rounded-lg shadow-2xl' onSubmit={handleSubmit(onSubmit)}>
          <span className='text-2xl md:text-4xl font-bold'>
            Add School
          </span>

          <div className='w-36 h-36 md:w-60 md:h-60 rounded-full  flex justify-center items-center text-gray-100' style={{background: (file ? `url(${URL.createObjectURL(file)})`:"#777474cc") , backgroundSize:(file ? "cover":"initial")}}>
            {
              !file &&
                <label className='cursor-pointer' htmlFor='photo'>
                Select Image
                <input type="file" name="school_image" id="photo" onChange={(e)=>setFile(e.target.files && e.target.files.length ? e.target.files[0] : null)} hidden />
                </label>
            }
          </div>
          <label htmlFor="" className='flex flex-col gap-4 w-full'>
            School Name
            <p className='text-red-700 text-xs md:text-sm'>{errors.school_name?.message}</p>
            <input {...register("school_name" , {required:"School Name is Required" , maxLength:{value:20 , message:"School Name Should be less than 20 letters"}})} className='p-4 rounded-lg'/>
          </label>
          <label htmlFor="" className='flex flex-col gap-4 w-full'>
            School Email
            <p className='text-red-700 text-xs md:text-sm'>{errors.school_email?.message}</p>
            <input {...register("school_email" , {required:'School Email is Required' , pattern:{value:/[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+/i , message:"Email Should Match the Proper Format"}})} className='p-4 rounded-lg'/>
          </label>
          <label htmlFor="" className='flex flex-col gap-4 w-full'>
            School Address
            <p className='text-red-700 text-xs md:text-sm'>{errors.school_address?.message}</p>
            <input {...register("school_address" , {required:"School Address is Required" })} className='p-4 rounded-lg'/>
          </label>
          <label htmlFor="" className='flex flex-col gap-4 w-full'>
            School City
            <p className='text-red-700 text-xs md:text-sm'>{errors.school_city?.message}</p>
            <input {...register("school_city" , {required:"School City is Required"})} className='p-4 rounded-lg'/>
          </label>
          <label htmlFor="" className='flex flex-col gap-4 w-full'>
            School State
            <p className='text-red-700 text-xs md:text-sm'>{errors.school_state?.message}</p>
            <input {...register("school_state")} className='p-4 rounded-lg'/>
          </label>
          <label htmlFor="" className='flex flex-col gap-4 w-full'>
             Contact Number
             <p className='text-red-700 text-xs md:text-sm'>{errors.school_contact?.message}</p>
            <input {...register("school_contact" , {required:"School Contact Number Should Be There" })} className='p-4 rounded-lg'/>
          </label>
          <label htmlFor="" className='flex flex-col gap-4 w-full mt-4'>
            <button type="submit" className='p-4 bg-cyan-700 text-xs md:text-sm text-white rounded-lg w-full flex justify-center cursor-pointer' disabled={showloader ? true : false} style={{cursor:(showloader ?'not-allowed':"pointer")}}>
              {
                showloader ?
                <Loader/>:
                <>Submit</>
              }
            </button>
          </label>
        </form>
    </main>
  )
}
