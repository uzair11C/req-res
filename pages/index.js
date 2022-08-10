import Head from 'next/head'
import Appbar from '../components/Appbar'
import UnLoggedInHome from '../components/UnLoggedInHome'
// import { Provider } from 'react-redux';
// import store from '../store/store';
import { CurrentUser } from '../contexts/currentUserContext'
import { useContext } from 'react'

export default function Home() {

  const [currentUser, setCurrentUser] = useContext(CurrentUser)

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
//<UnLoggedInHome />