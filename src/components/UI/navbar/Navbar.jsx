import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cl from "./Navbar.module.css"
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);


    const logout = () =>{
        setIsAuth(false);
        localStorage.removeItem('auth')
    }
    return (
    <div className={cl.navbar}>
      <MyButton onClick={logout}>Выйти</MyButton>
      <Link to="/about">О сайте</Link>
      <Link to="/posts">Посты</Link>
    </div>
    );
};

export default Navbar;