// 라우트 경로 상수 (URL은 여기서 관리, 문자열 직접 쓰지 말기)
export const PATHS = {
  START: '/', // 시작 화면
  WRITE: '/write', // 작성 + 타는 이미지
  END: '/end', // 재가 되어 사라졌습니다
  FEED: '/feed', // 피드 목록
  DETAIL: '/feed/:id', // 피드 상세
};


export const toDetail = (id) => `/feed/${id}`;
