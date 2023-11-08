import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Suspense, useState } from "react"

function App() {

  const [user, setUser] = useState(-1)

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header user={ user }/>
      <Suspense>
        <Outlet context={[ user, setUser ]}/>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;