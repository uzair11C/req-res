import Head from 'next/head'
import Appbar from '../components/Appbar'
import UnLoggedInHome from '../components/UnLoggedInHome'
import { Provider } from 'react-redux';
import store from '../store/store';

export default function Home() {
  return (
      <div>
        <Head>
          <title>Req-Res App</title>
          <link rel="icon" href="/reactFavicon.png" />
        </Head>
        <Appbar />
        <UnLoggedInHome />
      </div>
  )
}
