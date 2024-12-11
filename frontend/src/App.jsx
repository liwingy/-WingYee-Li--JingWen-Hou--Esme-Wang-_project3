import React, { useState } from 'react';
import NavBar from './navbar/Navbar';

const App = () => {
  return (
    <>
      {/* 渲染导航栏 */}
      <NavBar />
      {/* 欢迎信息 */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h1>Welcome to the Application</h1>
        <p>Please log in or sign up to continue.</p>
      </div>
    </>
  );
};

export default App;



