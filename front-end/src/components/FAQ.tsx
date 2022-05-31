const FAQ = () => {
  const FAQData = [
    {
      question: '여기를 작성해 주세용',
      answer: '🙏😭🙏',
    },
    {
      question: '여기를 작성해 주세용용',
      answer: '🙏😭😭🙏',
    },
    {
      question: '여기를 작성해 주세용용용',
      answer: '🙏😭😭😭🙏',
    },
    {
      question: '여기를 작성해 주세용용용용',
      answer: '🙏😭😭😭😭🙏',
    },
    {
      question: '여기를 작성해 주세용용용용용',
      answer: '🙏😭😭😭😭😭🙏',
    },
  ]
  return (
    <div className='p-4 mx-auto max-w-7xl md:px-2 md:w-10/12'>
      <h1 className='mb-8 text-xl font-bold md:text-3xl'>FAQ</h1>
      <div className='text-sm'>
        {FAQData?.map((data, index) => (
          <details
            key={index}
            className='p-4 mb-3 group bg-gray-100 rounded'
            open
          >
            {/* default를 닫혀 있도록 어떻게..?  */}
            <summary className='flex items-center justify-between w-full py-2 pr-1 font-semibold text-left text-gray-800 outline-none hover:text-primary focus:text-primary  focus:outline-none'>
              <h5 className='text-md font-semibold'>{data.question}</h5>
              <span className='relative flex-shrink-0 ml-1.5 w-5 h-5'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </span>
            </summary>

            <p className='pb-5 pr-0 text-gray-700'>{data.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
export default FAQ
