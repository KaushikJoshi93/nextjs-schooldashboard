
type LoaderParam = {
    color?:string
}

const Loader = (props:LoaderParam) => {
  return (
        <div className="border-t-4 border-white border-solid rounded-full animate-spin w-9 h-9"></div>
      )
}

export default Loader