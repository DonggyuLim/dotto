import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { SigningCosmWasmProvider } from 'contexts/cosmwasm'
import { RecoilRoot } from 'recoil'
import Layout from 'components/Layout/Layout'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SigningCosmWasmProvider>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </SigningCosmWasmProvider>
  )
}
export default MyApp
