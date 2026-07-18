import { Routes, Route } from 'react-router-dom';
import { PATHS } from './routes/paths';
import StartPage from './pages/Start/StartPage';
import WritePage from './pages/Write/WritePage';
import EndPage from './pages/End/EndPage';
import FeedPage from './pages/Feed/FeedPage';
import DetailPage from './pages/Detail/DetailPage';
import NoticePage from './pages/Notice/NoticePage';
import NoticeDetailPage from './pages/Notice/NoticeDetailPage';

function App() {
    return (
        <Routes>
            <Route path={PATHS.START} element={<StartPage />} />
            <Route path={PATHS.WRITE} element={<WritePage />} />
            <Route path={PATHS.END} element={<EndPage />} />
            <Route path={PATHS.FEED} element={<FeedPage />} />
            <Route path={PATHS.DETAIL} element={<DetailPage />} />
            <Route path={PATHS.NOTICE} element={<NoticePage />} />
            <Route path={PATHS.NOTICE_DETAIL} element={<NoticeDetailPage />} />
        </Routes>
    );
}

export default App;
