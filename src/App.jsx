import './App.css'
import { Main } from '../Comp_Contenedores/Main/Main'
import { Header } from '../Comp_Contenedores/Header/Header'
import { Footer } from '../Comp_Contenedores/Footer/Footer'
import { GlobalContextProvider } from '../Context/GlobalContext'
import { ModalContainer } from '../ModalConteiner/ModalContainer'

export const App = () => {
  return (
    <GlobalContextProvider>
      <section className="layout">
        <div className="header">
          <Header/>
        </div>
        <div className="main">
          <Main />
        </div>
        <div className="footer">
          <Footer/>
        </div>
        <ModalContainer />
      </section>
    </GlobalContextProvider>
  )
}

