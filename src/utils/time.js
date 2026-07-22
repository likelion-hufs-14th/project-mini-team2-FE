// 남은 시간 상한 (24시간)
export const MAX_TIME_SECONDS = 24 * 60 * 60;

export function parseSafeDate(str) {
    if (!str) return null;
    const date = new Date(str.replace(/-/g, '/').replace('T', ' '));
    return isNaN(date.getTime()) ? null : date;
}

// 남은 초 계산
export function calcTimeLeft(expiresAt) {
    const date = parseSafeDate(expiresAt);
    if (!date) return 0;

    const seconds = Math.floor((date.getTime() - Date.now()) / 1000);
    // 0 ~ 24시간 사이로 고정 (공감으로 만료시각이 24시간 넘게 밀려도 24H로 표시)
    return Math.min(MAX_TIME_SECONDS, Math.max(0, seconds));
}

// 투명도 계산
export function calcOpacity(createdAt, expiresAt, timeLeftSeconds) {
    const createdTime = parseSafeDate(createdAt)?.getTime();
    const expiresTime = parseSafeDate(expiresAt)?.getTime();
    if (!createdTime || !expiresTime) return 1;

    // 전체 기간도 24시간을 상한으로 (timeLeftSeconds와 기준을 맞춤)
    const totalDuration = Math.min(expiresTime - createdTime, MAX_TIME_SECONDS * 1000);
    if (totalDuration <= 0) return 0;

    const ratio = (timeLeftSeconds * 1000) / totalDuration;
    return Math.max(0, Math.min(1, ratio));
}

// 초 단위 표시
export function formatTime(seconds) {
    const h = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, '0');
    return `${h}H ${m}M`;
}
