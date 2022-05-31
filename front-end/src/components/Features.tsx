const Features = () => {
  return (
    <section className='py-6 mx-auto max-w-7xl md:w-10/12'>
      <h2 className='mb-1 text-3xl font-extrabold leading-tight text-gray-900'>
        Features
      </h2>
      <p className='mb-10 text-lg text-gray-500'>
        4 Core Concepts of DecentralLotto
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-5 gap-x-16 lg:gap-x-10 gap-y-20'>
        <div>
          <div className='flex items-center justify-center w-8 h-8 mb-4 text-red-600 bg-red-100 rounded-full'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-5 h-5'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <h3 className='mb-2 text-base font-semibold leading-tight text-gray-900'>
            Familiarity
          </h3>
          <p className='text-sm text-gray-500'>
            keplr 지갑 로그인 및 단순한 버튼클릭 몇번 만으로 바로 로또 게임을
            즐길 수 있다.
          </p>
        </div>
        <div>
          <div className='flex items-center justify-center w-8 h-8 mb-4 text-pink-600 bg-pink-100 rounded-full'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-5 h-5'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <h3 className='mb-2 text-base font-semibold leading-tight text-gray-900'>
            Integrity
          </h3>
          <p className='text-sm text-gray-500'>
            데이터 정확성 및 일관성을 보장하는 블록체인 기술은 기존 로또의
            한계를 극복할 수 있도록 돕는다.
          </p>
        </div>
        <div>
          <div className='flex items-center justify-center w-8 h-8 mb-4 text-yellow-600 bg-yellow-100 rounded-full'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-5 h-5'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <h3 className='mb-2 text-base font-semibold leading-tight text-gray-900'>
            Economic
          </h3>
          <p className='text-sm text-gray-500'>
            DecentralLotto는 아주 작은 archway chain의 수수료를 제외하면 판매액
            대비 대략 100%에 가까운 당첨금이 지급된다.
          </p>
        </div>
        <div>
          <div className='flex items-center justify-center w-8 h-8 mb-4 text-green-600 bg-green-100 rounded-full'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-5 h-5'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z'
                clipRule='evenodd'
              />
              <path
                fillRule='evenodd'
                d='M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z'
                clipRule='evenodd'
              />
              <path
                fillRule='evenodd'
                d='M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <h3 className='mb-2 text-base font-semibold leading-tight text-gray-900'>
            작성해야함
          </h3>
          <p className='text-sm text-gray-500'>작성해야함</p>
        </div>
      </div>
    </section>
  )
}
export default Features
