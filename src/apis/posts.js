import { api } from './client';

async function request(promise, errorMsg) {
    try {
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(errorMsg, error);
        throw error;
    }
}

// 1. 피드 목록 가져오기
export const getFeeds = (page = 1) =>
    request(api.get('/feeds/', { params: { page, page_size: 12 } }), '피드 목록 조회 실패:');

// 1-1. 메모지(피드) 작성하기
export const createFeed = (content, nickname) =>
    request(api.post('/feeds/', { content, nickname }), '메모지 작성 실패:');

// 2. 피드 상세 정보 가져오기
export const getFeedDetail = (feedId) => request(api.get(`/feeds/${feedId}/`), `피드 상세 조회(${feedId}) 실패:`);

// 3. 공감(좋아요) 누르기
export const addFan = (feedId) => request(api.post(`/feeds/${feedId}/react/fan/`), '공감 추가 실패:');

// 4. 비공감(싫어요) 누르기
export const addWood = (feedId) => request(api.post(`/feeds/${feedId}/react/wood/`), '비공감 추가 실패:');

// 5. 댓글 목록 가져오기
export const getComments = (feedId) => request(api.get(`/feeds/${feedId}/comments/`), '댓글 목록 조회 실패:');

// 6. 댓글 작성하기
export const createComment = (feedId, content, nickname) =>
    request(api.post(`/feeds/${feedId}/comments/`, { content, nickname }), '댓글 작성 실패:');

// 7. 소각 기록 남기기
export const createVisitLog = () => request(api.post('/feeds/burn/'), '소각 기록 생성 실패:');

// 8. 오늘 소각한 수 가져오기 ({ burn_cnt: 3 } 형태)
export const getBurnCount = () => request(api.get('/feeds/burn/'), '소각 수 조회 실패:');
