import { api } from './client';

// 피드 전체 가져오기
export async function getFeeds() {
    const res = await api.get('/feeds');
    return res.data;
}

// 피드 하나 가져오기
export async function getFeed(id) {
    const res = await api.get(`/feeds/${id}`);
    return res.data;
}

// 글 올리기
export async function createFeed({ nickname, content }) {
    const res = await api.post('/feeds', { nickname, content });
    return res.data;
}

// 공감좋아요
export async function fanFeed(id) {
    const res = await api.post(`/feeds/${id}/fan`);
    return res.data;
}

// 비공감싫어요
export async function woodFeed(id) {
    const res = await api.post(`/feeds/${id}/wood`);
    return res.data;
}

// 댓글 가져오기
export async function getComments(id) {
    const res = await api.get(`/feeds/${id}/comments`);
    return res.data;
}

// 댓글 달기
export async function createComment(id, { nickname, content }) {
    const res = await api.post(`/feeds/${id}/comments`, { nickname, content });
    return res.data;
}
