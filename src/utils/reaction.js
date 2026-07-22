import { getNickname, saveNickname } from './nickname';

const LABEL = { fan: '공감', wood: '비공감' };

// 닉네임 가져오기
function getOrAskNickname() {
    const saved = getNickname();
    if (saved) return saved;

    const input = window.prompt('활동할 닉네임을 입력해주세요! (최대 6자)');
    if (!input) return null;

    return saveNickname(input);
}

// 공감비공감
export function canReact(feedId, type) {
    const myNick = getOrAskNickname();
    if (!myNick) return false;

    const opposite = type === 'fan' ? 'wood' : 'fan';
    const myKey = `${type}_${myNick}_${feedId}`;
    const oppositeKey = `${opposite}_${myNick}_${feedId}`;

    const myCount = parseInt(sessionStorage.getItem(myKey) || 0);
    const oppositeCount = parseInt(sessionStorage.getItem(oppositeKey) || 0);



    if (oppositeCount > 0) {
        window.alert(`이미 ${LABEL[opposite]}을 누르셔서 ${LABEL[type]}을 누를 수 없습니다!`);
        return false;
    }


    if (myCount >= 3) {
        window.alert(`${LABEL[type]}은 최대 3번까지만 가능합니다!`);
        return false;
    }

    

    sessionStorage.setItem(myKey, myCount + 1);
    return true;
}
