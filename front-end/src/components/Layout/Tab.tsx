import Link from 'next/link'
import { useRouter } from 'next/router'
import { navigation } from 'components/Layout/navigation'

const Tab = () => {
  const { pathname } = useRouter()
  return (
    <div className='lg:flex lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:dark:text-slate-200 lg:items-center'>
      <ul className='btn btn-primary w-screen flex items-center justify-center lg:flex lg:w-80 lg:justify-between content-center lg:rounded-2xl px-3 py-2'>
        {navigation.pages.map((page, idx) => (
          <li key={idx}>
            <Link href={page.href}>
              <a
                className={`rounded-lg px-4 py-2.5 duration-100 ease-in-out leading-6 hover:brightness-90 focus:outline-none dark:hover:brightness-125
                  ${
                    page.href === '/' + pathname.split('/')[1] &&
                    'bg-[#ffffffe7] text-[#66C1BD]'
                  }`}
              >
                {page.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Tab
