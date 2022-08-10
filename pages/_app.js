import { AllUsersContext } from '../contexts/allUsersContext'
import { CurrentUserContext } from '../contexts/currentUserContext'
import '../styles/globals.css'
// import { Provider } from 'react-redux';
// import store from '../store/store';

function MyApp({ Component, pageProps }) 
{
  return(
    
    <AllUsersContext>
      <CurrentUserContext>
        <Component {...pageProps} />
      </CurrentUserContext>
    </AllUsersContext>
  )
}

export default MyApp
