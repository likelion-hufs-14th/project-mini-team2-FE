export function parseSafeDate(str) {
    if (!str) return null;
    const date = new Date(str.replace(/-/g, '/').replace('T', ' '));
    return isNaN(date.getTime()) ? null : date;
}

// 남은 초 계산
export function calcTimeLeft(expiresAt) {
    const date = parseSafeDate(expiresAt);
    if (!date) return 0;
    return Math.max(0, Math.floor((date.getTime() - Date.now()) / 1000));
}

// 투명도 계산
export function calcOpacity(createdAt, expiresAt, timeLeftSeconds) {
    const createdTime = parseSafeDate(createdAt)?.getTime();
    const expiresTime = parseSafeDate(expiresAt)?.getTime();
    if (!createdTime || !expiresTime) return 1;

    const totalDuration = expiresTime - createdTime;
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
