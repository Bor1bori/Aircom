# Aircom Backend server
Aircom 프로젝트 백엔드 서버  
[API 문서](https://vineyard.postman.co/collections/7914230-d2545d49-7997-4478-b6f9-1279b034212e?version=latest&workspace=ce4d2197-2170-4c6f-b12b-a4f4c01cb231)

### 빌드 환경
Node v10.16.3

### 필요 파일
- .env.local: 로컬 환경 실행시
- .env.development: development 실행시
- .env.production: production 실행시
- .env.* 파일은 .env.exam 참조
### 빌드 방법
npm install  
npm run build

### 실행
- local 환경: npm run local_dev
- development: npm run dev
- production: npm run start