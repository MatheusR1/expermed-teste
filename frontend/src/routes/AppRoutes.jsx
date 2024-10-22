import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Kanban from '../pages/kanban/Kanban';
import Login from '../pages/login/Login';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/kanban" element={<Kanban />} />
    </Routes>
  );
}

export default AppRoutes;
