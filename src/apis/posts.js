import axios from 'axios';

// 백엔드 주소로 변경 예정.
const BASE_URL = 'http://000';

// 1. 피드 목록 가져오기
export const getFeeds = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/feeds`, {
            params: { page },
        });
        return response.data;
    } catch (error) {
        console.error('피드 목록 조회 실패:', error);
        throw error;
    }
};

// 1-1. 메모지(피드) 작성하기
export const createFeed = async (content, nickname) => {
    try {
        const response = await axios.post(`${BASE_URL}/feeds`, {
            content,
            nickname,
        });
        return response.data;
    } catch (error) {
        console.error('메모지 작성 실패:', error);
        throw error;
    }
};

// 2. 피드 상세 정보 가져오기
export const getFeedDetail = async (feedId) => {
    try {
        const response = await axios.get(`${BASE_URL}/feeds/${feedId}`);
        return response.data;
    } catch (error) {
        console.error(`피드 상세 조회(${feedId}) 실패:`, error);
        throw error;
    }
};

// 3. 공감(좋아요) 누르기
export const addFan = async (feedId) => {
    try {
        const response = await axios.post(`${BASE_URL}/feeds/${feedId}/fan`);
        return response.data;
    } catch (error) {
        console.error('공감 추가 실패:', error);
        throw error;
    }
};

// 4. 비공감(싫어요) 누르기
export const addWood = async (feedId) => {
    try {
        const response = await axios.post(`${BASE_URL}/feeds/${feedId}/wood`);
        return response.data;
    } catch (error) {
        console.error('비공감 추가 실패:', error);
        throw error;
    }
};

// 5. 댓글 목록 가져오기
export const getComments = async (feedId) => {
    try {
        const response = await axios.get(`${BASE_URL}/feeds/${feedId}/comments`);
        return response.data;
    } catch (error) {
        console.error('댓글 목록 조회 실패:', error);
        throw error;
    }
};

// 6. 댓글 작성하기
export const createComment = async (feedId, content, nickname) => {
    try {
        const response = await axios.post(`${BASE_URL}/feeds/${feedId}/comments`, {
            content,
            nickname,
        });
        return response.data;
    } catch (error) {
        console.error('댓글 작성 실패:', error);
        throw error;
    }
};

// 7. 방문 기록 생성
export const createVisitLog = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/feeds`);
        return response.data;
    } catch (error) {
        console.error('방문 기록 생성 실패:', error);
        throw error;
    }
};
