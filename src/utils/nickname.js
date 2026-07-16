// 로그인이 없어서 닉네임을 프론트가 만들어 주기
// 닉네임 = 6

export function getNickname() {

  const saved = localStorage.getItem("nickname");

  if (saved) 
    return saved;


  const number = Math.floor(Math.random() * 1000000);

  const nickname = String(number).padStart(6,"0");

  localStorage.setItem("nickname", nickname);
  return nickname;
}
