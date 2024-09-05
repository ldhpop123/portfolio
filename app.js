const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();
const pageRouter = require('./routes/page');

// express 애플리케이션 생성
const app = express();

app.set('port', process.env.PORT || 8003);
app.set('view engine', 'html');

// 넌적스
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app,
    watch: true,
})

app.use(morgan('dev')); // HTTP 요청 로그를 출력하는 미들웨어 추가
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 제공을 위한 디렉토리 설정
app.use(express.json()); // JSON 형식의 요청 본문을 파싱하기 위한 미들웨어 추가
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 요청을 본문을 파싱하기 위한 미들웨어 추가
app.use(cookieParser(process.env.COOKIE_SECRET)); // 서명된 쿠키를 파싱하기 위한 미들웨어 추가

app.use( // deserializeUser 설정
    session({
        // store: new RedisStore({ client: redisClient }),
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true, // 클라이언트에서 쿠키를 자바스크립트로 접근하지 못하도록 설정
            secure: false, // HTTPS가 아닌 환경에서 쿠키가 전송되도록 설정
        },
    })
)

app.use('/', pageRouter); // '/' 경로로 들어오는 요청을 pageRouter로 처리하도록 설정

// 요청한 라우터가 없을 경우 404 에러를 처리하는 미들웨어 추가
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error); // 에러를 다음으로 미들웨어로 전달
});

// 에러를 처리하는 미들웨어 추가
app.use((err, req, res, next) => {
    res.locals.message = err.message // 에러 메시지를 로컬 변수에 설정
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 개발 환경에서만 에러 스택 노출
    res.status(err.status || 500); // 에러 상태 코드 설정
    res.render('error'); // error 템플릿 랜더링
})

// 설정한 포트에서 서버를 시작하고 대기
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중'); // 서버 대기 중인 포트 출력
})