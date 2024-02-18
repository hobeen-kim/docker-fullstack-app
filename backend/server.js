//필요한 모듈들을 가져오기
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

// Express 서버를 생성
const app = express();

//json 형태로 오는 요청의 본문을 해석할 수 있게 등록
app.use(bodyParser.json());

// 테이블 생성하기
// db.pool.query(`CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// )`, (err, results, fields) => {
//     console.log('results', results);
// });

app.listen(5000, () => 
    console.log('서버가 5000번 포트에서 실행중입니다.')
);

app.get('/api/values', function(req, res) {
    // 데이터베이스에서 모든 정보 가져오기
    db.pool.query('SELECT * FROM lists;',
        (err, rows, fields) => {
            if(err)
                return res.status(500).send(err);
            else
                return res.send(rows);
        }
    );
});

app.post('/api/value', function(req, res, next) {
    // 데이터베이스에 값 넣기
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}");`,
        (err, rows, fields) => {
            if(err)
                return res.status(500).send(err);
            else
                return res.status(200).json({ success: true, value: req.body.value });
        }
    );
});