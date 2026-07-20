// 로그인이 없어서 닉네임을 프론트가 받아 주기
// 닉네임 = 최대 6글자


const KEY = "my_nickname";

export function getNickname() {
    return sessionStorage.getItem(KEY);
}

export function saveNickname(name) {
    const clean = name.trim();

    if (!clean) {
        window.alert("닉네임을 입력해주세요.");
        return;
    }

    if (clean.length > 6) {
        window.alert("닉네임은 최대 6글자까지 가능합니다.");
        return;
    }

    
    sessionStorage.setItem(KEY, clean);
    return clean;
}
