import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './pages/Welcome';
import Portfolio from './pages/Portfolio';
import { connect } from 'react-redux';
import * as portfolioActions from './services/portfolios/actions'
import { useEffect } from 'react';
import Loader from './components/Loader';
import Error from './components/Error'; 
import Wrapper from './components/Wrapper';
import Scenarios from './pages/Scenarios';

function App(props) {
  const { portfolios, getPortfolios } = props
  let params = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    getPortfolios();
  }, [])

  if(portfolios.loading) {
    return <Loader />
  }

  if(portfolios.error) {
    return <Error message={portfolios.error} />
  }


  return (
    <>
      <Routes>
        <Route exact path="/" element={<Wrapper Component={Welcome} />} />
        <Route exact path="/portfolio" element={<Wrapper Component={Portfolio} />} />
        <Route exact path="/scenarios" element={<Wrapper Component={Scenarios} />} />
      </Routes>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  portfolios: state.portfolios
})

const mapDispatchToProps = {
  getPortfolios: portfolioActions.getPortfolios
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
