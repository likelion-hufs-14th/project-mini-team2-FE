import api from './client';

export async function getFeeds() {
    console.log('요청 보내는 주소 확인:', api.defaults.baseURL + '/feeds'); // 이게 범인입니다!
    const res = await api.get('/feeds');
    return res.data;
}

export async function getFeedDetail(feedId) {
    const res = await api.get(`/feeds/${feedId}`);
    return res.data;
}

export async function createFeed(content, nickname) {
    const res = await api.post('/feeds', {
        content: content,
        nickname: nickname,
    });
    return res.data;
}

export async function addFan(feedId) {
    const res = await api.post(`/feeds/${feedId}/fan`);
    return res.data;
}

export async function addWood(feedId) {
    const res = await api.post(`/feeds/${feedId}/wood`);
    return res.data;
}

export async function getComments(feedId) {
    const res = await api.get(`/feeds/${feedId}/comments`);
    return res.data;
}

export async function createComment(feedId, content, nickname) {
    const res = await api.post(`/feeds/${feedId}/comments`, {
        content: content,
        nickname: nickname,
    });
    return res.data;
}
