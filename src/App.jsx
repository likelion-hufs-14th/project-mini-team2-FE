import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FeedPage from './pages/Feed/FeedPage';
import DetailPage from './pages/Detail/DetailPage';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FeedPage />} />

                <Route path="/feed" element={<FeedPage />} />

                <Route path="/detail/:id" element={<DetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}
