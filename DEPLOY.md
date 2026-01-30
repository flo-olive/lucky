# Vercel 배포 가이드

## 빠른 배포 (Vercel CLI 사용)

### 1. Vercel CLI 설치 (처음 한 번만)
```bash
npm install -g vercel
```

### 2. Vercel 로그인
```bash
vercel login
```

### 3. 프로젝트 디렉토리로 이동
```bash
cd flog-lucky
```

### 4. 배포 실행
```bash
vercel
```

처음 배포 시 몇 가지 질문이 나옵니다:
- **Set up and deploy?** → `Y` 입력
- **Which scope?** → 본인의 계정 선택
- **Link to existing project?** → `N` 입력 (새 프로젝트)
- **Project name?** → 엔터 (기본값 사용) 또는 원하는 이름 입력
- **Directory?** → `./` 입력 (현재 디렉토리)
- **Override settings?** → `N` 입력

### 5. 프로덕션 배포
```bash
vercel --prod
```

## 배포 후

배포가 완료되면 Vercel이 배포 URL을 제공합니다.
예: `https://flog-lucky-xxxxx.vercel.app`

## 업데이트 배포

코드를 수정한 후 다시 배포하려면:
```bash
vercel --prod
```

## 참고사항

- `vercel.json` 파일이 이미 생성되어 있어 추가 설정 없이 배포 가능합니다.
- 빌드 명령어: `npm run build`
- 출력 디렉토리: `dist`
- SPA 라우팅을 위한 rewrites 설정이 포함되어 있습니다.

