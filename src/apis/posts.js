// 초기 더미 데이터 15개 생성

const generateInitialFeeds = () => {
    const now = new Date();
    return Array.from({ length: 15 }, (_, i) => ({
        feed_id: i + 1,
        nickname: `작성자${i + 1}`,
        content: `${i + 1}번째 게시물입니다. 페이징과 정렬을 확인하세요!`,
        created_at: new Date(now.getTime() - 3600000 * i).toISOString(),
        expires_at: new Date(now.getTime() + 3600000 * (15 - i)).toISOString(),
        fan_cnt: Math.floor(Math.random() * 20),
        wood_cnt: Math.floor(Math.random() * 20),
        comment_cnt: Math.floor(Math.random() * 10),
    }));
};

// 피드 데이터 가져오기 (없으면 초기 데이터 생성 후 저장)
const getStoredFeeds = () => {
    const saved = localStorage.getItem('dummy_feeds');
    if (saved) return JSON.parse(saved);
    const initialData = generateInitialFeeds();
    saveFeeds(initialData);
    return initialData;
};

const saveFeeds = (feeds) => {
    localStorage.setItem('dummy_feeds', JSON.stringify(feeds));
};

// (실제 백엔드 연동 시 수정 예정)
// 피드 전체 목록 가져오기
export async function getFeeds(page = 1) {
    const allFeeds = getStoredFeeds().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const pageSize = 12;
    const results = allFeeds.slice((page - 1) * pageSize, page * pageSize);
    return {
        count: allFeeds.length,
        next: allFeeds.length > page * pageSize ? true : null,
        results: results,
    };
}

// 특정 피드 상세 정보 가져오기
export async function getFeedDetail(feedId) {
    const feeds = getStoredFeeds();
    return feeds.find((f) => f.feed_id === parseInt(feedId)) || feeds[0];
}

// 새로운 피드 작성(글 올리기)
export async function createFeed(content, nickname) {
    const feeds = getStoredFeeds();
    const newFeed = {
        feed_id: Date.now(),
        nickname: nickname || '익명',
        content,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 3600000 * 24).toISOString(),
        fan_cnt: 0,
        wood_cnt: 0,
        comment_cnt: 0,
    };
    feeds.unshift(newFeed);
    saveFeeds(feeds);
    return newFeed;
}

// 공감수 증가 및 1시간 연장
export async function addFan(feedId) {
    const feeds = getStoredFeeds();
    const feed = feeds.find((f) => f.feed_id === parseInt(feedId));
    if (feed) {
        feed.fan_cnt += 1;
        const currentExpire = new Date(feed.expires_at).getTime();
        feed.expires_at = new Date(currentExpire + 3600000).toISOString();
    }
    saveFeeds(feeds);
    return feed;
}

// 비공감수 증가 및 10분 단축
export async function addWood(feedId) {
    const feeds = getStoredFeeds();
    const feed = feeds.find((f) => f.feed_id === parseInt(feedId));
    if (feed) {
        feed.wood_cnt += 1;
        const currentExpire = new Date(feed.expires_at).getTime();
        feed.expires_at = new Date(currentExpire - 600000).toISOString();
    }
    saveFeeds(feeds);
    return feed;
}

// 피드의 댓글 개수 1 증가
export async function addCommentCount(feedId) {
    const feeds = getStoredFeeds();
    const feed = feeds.find((f) => f.feed_id === parseInt(feedId));
    if (feed) feed.comment_cnt = (feed.comment_cnt || 0) + 1;
    saveFeeds(feeds);
    return feed;
}

// 특정 피드의 댓글 목록 가져오기
export async function getComments(feedId) {
    const saved = localStorage.getItem(`comments_${feedId}`);
    return saved ? JSON.parse(saved) : [];
}

// 새로운 댓글 작성
export async function createComment(feedId, content, nickname) {
    const comments = await getComments(feedId);
    const newComment = {
        cmt_id: Date.now(),
        feed_id: parseInt(feedId),
        content,
        nickname: nickname || '익명',
        created_at: new Date().toISOString(),
    };

    comments.push(newComment);
    localStorage.setItem(`comments_${feedId}`, JSON.stringify(comments));

    await addCommentCount(feedId);
    return newComment;
}
