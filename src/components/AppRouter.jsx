import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {privateRoutes, publicRoutes} from '../router'
import { AuthContext } from '../context';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext)

  if (isLoading) {
    return <Loader/>
  }

    return ( 
      isAuth 
        ? <Routes>
        {privateRoutes.map(route => 
          <Route 
            key={route.path}
            path={route.path} 
            element={route.component} 
            exact={route.exact}
          />
        )}
        <Route path='/*' element={<Navigate replace to="/posts"/>} />
      </Routes>
        : <Routes>
        {publicRoutes.map(route => 
          <Route 
            key={route.path}
            path={route.path} 
            element={route.component} 
            exact={route.exact}
          />
        )}
        <Route path='/*' element={<Navigate replace to="/login"/>} />
      </Routes>
      
    );
}
 
export default AppRouter;