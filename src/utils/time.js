// 투명도가 100%가 되는 기준 시간 (24시간)
export const FULL_OPACITY_SECONDS = 24 * 60 * 60;

export function parseSafeDate(str) {
    if (!str) return null;
    const date = new Date(str.replace(/-/g, '/').replace('T', ' '));
    return isNaN(date.getTime()) ? null : date;
}

// 남은 초 계산
export function calcTimeLeft(expiresAt) {
    const date = parseSafeDate(expiresAt);
    if (!date) return 0;

    // 실제 남은 시간 그대로 (공감으로 24시간을 넘겨도 넘어간 만큼 표시)
    return Math.max(0, Math.floor((date.getTime() - Date.now()) / 1000));
}

// 투명도 계산 (24시간 이상 남았으면 100%, 0에 가까울수록 흐려짐)
export function calcOpacity(timeLeftSeconds) {
    const ratio = timeLeftSeconds / FULL_OPACITY_SECONDS;
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
