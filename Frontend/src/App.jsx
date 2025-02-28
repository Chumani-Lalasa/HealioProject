import './App.css'
import Dashboard from './Components/Dashboard'
import HealthCard from './Components/HealthTrackDashboard'
import HealthTrackDashboard from './Components/HealthTrackDashboard'
import Sidebar from './Components/Sidebar'
import Chatbot from './Pages/Chatbot'
import HealthReportForm from './Pages/HealthReportForm'
import LandingPage from './Pages/LandingPage'
import Settings from './Pages/Settings'
import UploadReport from './Pages/UploadReport'
import Signup from './Pages/SignUp'
import Signin from './Pages/Signin'
import SkinDiseaseAnalyzer from './Pages/SkinDiseaseAnalyzer'
import AppRoutes from './Routes/AppRoutes'

function App() {

  return (
    <>
      {/* <SkinDiseaseAnalyzer /> */}
      <AppRoutes />
      {/* <Signup /> */}
      {/* <Signin /> */}
    </>
  )
}

export default App
