import * as React from 'react'
import { TNextLayout } from 'next'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { lotteryDrawState } from 'recoils/lottery'
import Header from 'components/Layout/Header'
import Footer from 'components/Layout/Footer'
import Draw from 'components/Layout/Draw'
import OpenNumber from 'components/Layout/OpenNumber'
import { useRouter } from 'next/router'

type TBasicLayout = {
  children: React.ReactNode
}

const Layout: TNextLayout<TBasicLayout> = ({ children }): JSX.Element => {
  const { lotteryDrawDate } = useRecoilValue(lotteryDrawState)

  let now = new Date().getTime()
  let difference, newDays, newHours, newMinutes, newSeconds
  if (lotteryDrawDate !== null) {
    difference = lotteryDrawDate.getTime() - now
    newDays = Math.floor(difference / (1000 * 60 * 60 * 24))
    newHours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    newMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    newSeconds = Math.floor((difference % (1000 * 60)) / 1000)
  }

  const { pathname } = useRouter()

  if (!newDays && !newHours && !newMinutes && newSeconds === 0)
    return (
      <>
        <OpenNumber />
      </>
    )
  else if (
    !newDays &&
    !newHours &&
    !newMinutes &&
    newSeconds &&
    newSeconds > 0 &&
    newSeconds <= 10
  )
    return (
      <>
        <Draw contDownSeconds={newSeconds} />
      </>
    )
  else
    return (
      <div className='flex flex-col justify-center min-h-screen bg-[#e7e8f434] w-screen text-base-content'>
        <Head>
          <title>{process.env.NEXT_PUBLIC_SITE_TITLE}</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon-package/favicon.ico' />
        </Head>

        <Header />
        <main className='mt-20 flex flex-grow justify-center w-full min-h-full text-center font-normal tracking-normal xl:bg-[url(/background.png)] bg-no-repeat xl:bg-cover'>
          <div
            className={`flex flex-col max-w-3xl sm:w-full max-h-screen bg-gray-50 rounded-md ${
              pathname == '/prizes' &&
              'bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md shadow-xl'
            }`}
          >
            {children}
          </div>
        </main>
        <Footer />
      </div>
    )
}
export default Layout
