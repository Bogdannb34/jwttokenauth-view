import { Routes, Route } from 'react-router-dom';
import { Layout, Register, Login, Unauthorized, Missing, Home, LinkPage } from './components';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* public routes */}
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='/' element={<LinkPage />} />
          <Route path='unauthorized' element={<Unauthorized />} />
          <Route path="home" element={<Home />} />

          <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
