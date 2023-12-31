import Image from 'next/image'
import SchoolPlaceholder from '../../public/assets/school_placeholder.png'

type SchoolCardParam = {
    schoolName?:string,
    schoolCity?:string
}

const SchoolCard = (props:SchoolCardParam) => {
  return (
    <div className="w-80 h-80 rounded-lg border border-gray-400 shadow-2xl relative">

        {/* photo header */}
        <div className="w-full h-[50%] bg-gray-400 rounded-tr-lg rounded-tl-lg overflow-hidden ">
            <Image src={SchoolPlaceholder} alt="School Image" className='w-full h-full hover:scale-125 transition-all duration-700'/>
        </div>

        {/* school card body */}
        <div className='flex flex-col'>
                <p className='p-2 text-lg font-semibold'>
                    {props.schoolName}
                </p>
                <p className='p-2 text-sm text-gray-500'>
                    {props.schoolCity}
                </p>
        </div>

        {/* footer button */}
        <div className="absolute w-full bg-green-500 h-9 bottom-0 flex justify-center text-white items-center rounded-br-lg rounded-bl-lg">
                Apply Now
        </div>
        
    </div>
  )
}

export default SchoolCard