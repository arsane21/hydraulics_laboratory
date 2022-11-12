import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  {BrowserRouter as Router} from "react-router-dom";
import { Routes,Route } from "react-router-dom";

import NavHeader from './components/Navbar';
// import Calculopendiente from './components/uniformFlow/CalculoPendiente';
import NormalDepthRectangle from './components/uniformFlow/NormalDepth/NormalDepthRectangle';
// import UncoatedChannelsDesign from './components/uniformFlow/UncoatedChannelsDesign/UncoatedChannelsDesign';
import NormalDepthTrapeze from './components/uniformFlow/NormalDepth/NormalDepthTrapeze';
import NormalDepthCircle from './components/uniformFlow/NormalDepth/NormalDepthCircle';
import CriticalDepthRectangle from './components/criticalFlow/CriticalDepth/CriticalDepthRectangle';
import CriticalDepthTriangle from './components/criticalFlow/CriticalDepth/CriticalDepthTriangle';
import NormalDepthTriangle from './components/uniformFlow/NormalDepth/NormalDepthTriangle';
import GeoElemRectangle from './components/geometryelements/GeoElemRectangle';
import CriticalDepthTrapeze from './components/criticalFlow/CriticalDepth/CriticalDepthTrapeze';
import CriticalDepthCircle from './components/criticalFlow/CriticalDepth/CriticalDepthCircle';
import NormalDepthCircleTrapeze from './components/uniformFlow/NormalDepth/CompoundSections/NormalDepthCircleTrapeze';
import CompoundSections from './components/uniformFlow/NormalDepth/CompoundSections/CompoundSections';
import NormalDepthTriangleRectangle from './components/uniformFlow/NormalDepth/CompoundSections/NormalDepthTriangleRectangle';
import SlopeCircle from './components/uniformFlow/Slope/SlopeCircle';
import SlopeRectangle from './components/uniformFlow/Slope/SlopeRectangle';
import SlopeTriangle from './components/uniformFlow/Slope/SlopeTriangle';
import GeoElemTriangle from './components/geometryelements/GeoElemTriangle';
import Footer from './components/Footer';
import GeoElemCircle from './components/geometryelements/GeoElemCircle';
import GeoElemTrapeze from './components/geometryelements/GeoElemTrapeze';
import SlopeTrapeze from './components/uniformFlow/Slope/SlopeTrapeze';
import DischargeTrapeze from './components/uniformFlow/Discharge/DischargeTrapeze';
import DischargeRectangle from './components/uniformFlow/Discharge/DischargeRectangle';
import DischargeTriangle from './components/uniformFlow/Discharge/DischargeTriangle';
import DischargeCircle from './components/uniformFlow/Discharge/DischargeCircle';
import SpecificEnergy from './components/SpecificEnergy/SpecificEnergy';
import FlowConditionsAfterAStep from './components/SpecificEnergy/FlowConditionsAfterAStep';
// COMPONENTS


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
      <NavHeader/>
      <Routes>
        <Route path="/" element={<App />}/>
          <Route path="/elementosgeometricos/canalrectangular" element={<GeoElemRectangle/>} />
          <Route path="/elementosgeometricos/canaltriangular" element={<GeoElemTriangle/>} />
          <Route path="/elementosgeometricos/canalcircular" element={<GeoElemCircle/>} />
          <Route path="/elementosgeometricos/canaltrapezoidal" element={<GeoElemTrapeze/>} />

          {/* RUTAS PARA EL CÁLCULO DE LA PROFUNDIDAD NORMAL */}
          <Route path="/flujouniforme/profundidadnormal/canalrectangular" element={<NormalDepthRectangle/>} />
          <Route path="/flujouniforme/profundidadnormal/canaltrapecial" element={<NormalDepthTrapeze/>} />
          <Route path="/flujouniforme/profundidadnormal/canaltriangular" element={<NormalDepthTriangle/>} />
          <Route path="/flujouniforme/profundidadnormal/canalcircular" element={<NormalDepthCircle/>} />
          <Route path="/flujouniforme/profundidadnormal/seccionescompuestas" element={<CompoundSections/>} />
          <Route path="/flujouniforme/profundidadnormal/seccionescompuestas/circulotrapecio" element={<NormalDepthCircleTrapeze/>} />
          <Route path="/flujouniforme/profundidadnormal/seccionescompuestas/triangulorectangulo" element={<NormalDepthTriangleRectangle/>} />
          
          {/* RUTAS PARA EL CÁLCULO DE LA PENDIENTE */}
          <Route path="/flujouniforme/pendiente/canalrectangular" element={<SlopeRectangle/>} />
          <Route path="/flujouniforme/pendiente/canaltriangular" element={<SlopeTriangle/>} />
          <Route path="/flujouniforme/pendiente/canalcircular" element={<SlopeCircle/>} />
          <Route path="/flujouniforme/pendiente/canaltrapezoidal" element={<SlopeTrapeze/>} />

          {/* RUTAS PARA EL CÁLCULO DEL CAUDAL */}
          <Route path="/flujouniforme/caudal/canalrectangular" element={<DischargeRectangle/>} />
          <Route path="/flujouniforme/caudal/canaltriangular" element={<DischargeTriangle/>} />
          <Route path="/flujouniforme/caudal/canalcircular" element={<DischargeCircle/>} />
          <Route path="/flujouniforme/caudal/canaltrapezoidal" element={<DischargeTrapeze/>} />

          {/* RUTAS PARA EL CÁLCULO DE LA PROFUNDIDAD CRITICA */}
          <Route path="/flujocritico/profundidadcritica/canalrectangular" element={<CriticalDepthRectangle/>} />
          <Route path="/flujocritico/profundidadcritica/canaltriangular" element={<CriticalDepthTriangle/>} />
          <Route path="/flujocritico/profundidadcritica/canaltrapezoidal" element={<CriticalDepthTrapeze/>} />
          <Route path="/flujocritico/profundidadCritica/canalcircular" element={<CriticalDepthCircle/>} />

           {/* RUTAS PARA EL CÁLCULO DE LA PROFUNDIDAD CRITICA */}
           <Route path="/specificEnergy" element={<SpecificEnergy/>} />
           <Route path="/specificEnergy/flow_conditions_after_a_step" element={<FlowConditionsAfterAStep/>} />
           

      </Routes>
      <Footer/>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
