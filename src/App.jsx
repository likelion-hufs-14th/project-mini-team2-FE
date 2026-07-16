import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FeedPage from './pages/Feed/FeedPage';
import DetailPage from './pages/Detail/DetailPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div>INCINER</div>} />
                <Route path="/feed" element={<FeedPage />} />

                <Route path="/feed/:id" element={<DetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
