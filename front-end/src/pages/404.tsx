import Link from 'next/link'

const Page404 = () => {
  return (
    <div className='relative py-16 px-4 w-full min-h-screen bg-gray-50'>
      <div className='flex flex-col items-center'>
        {/* :TITLE */}
        <div className='text-center space-y-5'>
          <p className='text-6xl sm:text-7xl text-purple-400 font-bold tracking-wide'>
            404
          </p>
          <h1 className='text-3xl sm:text-4xl md:text-5xl text-gray-700 font-semibold capitalize'>
            This page does not exist
          </h1>
          <p className='text-sm text-gray-500 font-medium'>
            Sorry! We could not find the page you are looking for. Please check
            URL in address bar and try again.
          </p>
        </div>

        {/* :OPTION LINKS */}
        <div className='mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4'>
          <Link href='/lottery'>
            <a
              className='px-5 py-2.5 rounded border border-transparent
              bg-primary text-center text-base text-white font-medium
              hover:brightness-75'
            >
              Get back to Homepage
            </a>
          </Link>
          <a
            href='https://github.com/codestates/beb-03-ball93/tree/c98a4bf6e24ac7751a5a4ae06f929761762cf1cf'
            className='px-5 py-2.5 rounded border-2 border-primary bg-transparent text-center text-base text-primary font-medium hover:brightness-110 hover:bg-gray-200'
          >
            Contact Support
          </a>
        </div>

        {/* :ILLUSTRATION */}
        <img
          src='https://fancytailwind.com/static/under_construction-503cab99df4458de6d2801e7ee4fa400.svg'
          alt=''
          className='mt-10 max-h-72'
        />
      </div>
    </div>
  )
}

export default Page404
