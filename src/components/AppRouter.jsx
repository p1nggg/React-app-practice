import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import {privateRoutes, publicRoutes} from "../router";
import Login from "../pages/Login"
import Posts from '../pages/Posts';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if(isLoading){
        return <Loader/>
    }
    return (
        isAuth
            ?
        <Routes>
          {privateRoutes.map(route => 
            <Route key={route.path} element={route.component} path = {route.path} exact = {route.exact} />
          )};
          <Route path="*" element={<Posts/>}/>
        </Routes>
            :
            <Routes>
            {publicRoutes.map(route => 
              <Route key={route.path} element={route.component} path = {route.path} exact = {route.exact} />
            )};
            <Route path="*" element={<Login/>}/>
          </Routes>  
            

    );
};

export default AppRouter;