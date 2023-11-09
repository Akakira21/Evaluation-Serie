import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Suspense, useState } from "react"

function App() {

  const [user, setUser] = useState(0)
  const [admin, setAdmin] = useState(0)

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header user={ user } setUser= { setUser } admin={ admin } setAdmin={ setAdmin } />
      <Suspense>
        <Outlet context={[ user, setUser, admin, setAdmin ]}/>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;