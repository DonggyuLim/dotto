const Testimonials = () => {
  return (
    <div className='py-2 w-full'>
      <div className='p-6 w-full mx-auto rounded-lg shadow-lg text-center md:w-10/12'>
        <h1 className='mb-5 text-2xl font-extrabold text-purple-900 md:leading-snug md:text-4xl'>
          DecentralLotto is an archway blockchain based lottery game designed
          for many people to play
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500'>
            <br />
            "much simpler and easier"
          </span>
        </h1>
        {/* <div className='mx-auto mb-3 shadow-lg avatar'>
        <img src='/placeholder.jpg' alt='' />
      </div> */}
        <p className='text-base font-bold text-purple-900'>Jin</p>
        <p className='text-sm font-medium text-purple-900'>TEAM, BOL3</p>
      </div>
    </div>
  )
}
export default Testimonials
