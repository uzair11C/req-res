import { AllUsersContext } from '../contexts/allUsersContext'
import '../styles/globals.css'
// import { Provider } from 'react-redux';
// import store from '../store/store';

function MyApp({ Component, pageProps }) 
{
  return(
    
    <AllUsersContext>
      <Component {...pageProps} />
    </AllUsersContext>
  )
}

export default MyApp
