# INCINER (인시너) - Frontend

> "내일이면 사라질, 가장 솔직한 기록" — 24시간 뒤 사라지는 익명 감정 소각장

## 기술 스택 (공용)

- React 19 + Vite
- react-router-dom (라우팅 — 설치만 되어 있음, 구성은 직접)
- CSS Modules (스타일)

## 시작하기 (팀원 공용)

```bash
git clone https://github.com/likelion-hufs-14th/project-mini-team2-FE.git
cd project-mini-team2-FE
npm install      # 패키지 설치
npm run dev      # 개발 서버 실행 (http://localhost:5173)
```

## 스크립트

| 명령어          | 설명           |
| --------------- | -------------- |
| `npm run dev`   | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드  |

## 협업 규칙

- 컴포넌트와 스타일은 `Xxx.jsx` + `Xxx.module.css`를 같은 폴더에 둔다.
- 브랜치는 `feat/기능명` 형태로 파고, main에 직접 push 금지 → PR로 머지.

> 폴더 구조(pages/components 등)와 라우팅 구성은 두 분이 함께 정한 뒤 채워주세요.
> 현재 레포에는 **공통 환경 세팅만** 들어있습니다.
