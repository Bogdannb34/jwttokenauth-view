import { Routes, Route } from 'react-router-dom';
import { Layout, Register, Login, Unauthorized, Missing, Home, RequireAuth, Admin, AccessPage } from './components';
import { ROLES } from './helpers/constant';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* public routes */}
          <Route path='/' element={<AccessPage />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='unauthorized' element={<Unauthorized />} />

          {/* protected routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
            <Route path="home" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path='admin' element={<Admin />} />
          </Route>

          <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
