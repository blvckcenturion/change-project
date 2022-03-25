import './styles/globals.scss'
import 'normalize.css'
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';

const App = () =>{
  return (
    <div>
      <Header/>
        <div className='page-content'>
          <Routes>
              <Route index element={<HomePage />} />
              <Route path="hola" element={<HolaPage />} />
          </Routes>
        </div>
      <Footer/>
    </div>
  );
}

const HomePage = () => {
  return (
    <>
      <h1>Hola mundo</h1>
      <h1>Hola mundo</h1>
      <h1>Hola mundo</h1>
      <h1>Hola mundo</h1>
      <h1>Hola mundo</h1><h1>Hola mundo</h1>
      <h1>Hola mundo</h1>
      <h1>Hola mundo</h1>
      <h1>Hola mundo</h1>
      <h1>Hola mundo</h1>
      <h1>Hola mundo</h1>
    </>
  )
}

const HolaPage = () => {
  return (
    <>
      <h1>Hola </h1>
      <h1>Hola </h1>
      <h1>Hola </h1>
      <h1>Hola </h1>
      <h1>Hola </h1>
      <h1>Hola </h1>
      <h1>Hola </h1>
      <h1>Hola </h1>
      <h1>Hola </h1>
      <h1>Hola </h1>
      <h1>Hola </h1>
      <h1>Hola </h1>

      <h1>Hola </h1><h1>Hola </h1>
      <h1>Hola </h1>

    </>
  )
}

export default App;
