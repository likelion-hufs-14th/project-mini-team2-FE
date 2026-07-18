// 서버가 주는 초를 mm:ss 형식으로 변환하기
export function formatTime(seconds) {
    const safe = Math.max(0, seconds);

    const m = String(Math.floor(safe / 60)).padStart(2, '0');

    const s = String(safe % 60).padStart(2, '0');

    return `${m}:${s}`;
}
