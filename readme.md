# Recall_ChatBot

* 일시 : 2019-11-30 (13:00) ~ 2019-12-01 (18:00)
* 장소 : 중앙대학교
* 개발 분야 : 챗봇 구현(기획, 디자인, 프로그래밍)
* 결과 : 우수상
* 스택 : 자바스크립트 (ES6 형식으로 개발함) + 미들웨어 (Koa.JS + promise request.js)



## 스크린샷

![1575140907148](./doc_img/1575140907148.png)

메인 페이지



## 사용자

![1575140958379](./doc_img/1575140958379.png)

챗봇 처음 접속 시 화면 (웰컴 메시지 + 신청한 리콜 목록)



![1575141090487](./doc_img/1575141090487.png)

자연어 처리를 하여 예상된 결과를 보여주는 모습



![1575141156724](./doc_img/1575141156724.png)

`(자동차)[현대자동차(주)] [현대] 베뉴 등 4차종 - 휠 너트 관련 리콜-1`에 대한 리콜 세부 정보 불러오기

`자세히보기`를 누르면 '열린소비자포털' 에서 해당 리콜과 관련된 정보를 보여준다.



![1575141169497](./doc_img/1575141169497.png)

리콜 신청 폼

고유번호에는 해당 상품을 식별할 수 있는 모든 것 (차대 번호, 상품 바코드 외)을 입력할 수 있음.



![1575141216714](./doc_img/1575141216714.png)

리콜 신청이 완료된 모습



## 공급자

![1575141477998](./doc_img/1575141477998.png)

공급자 대시보드

현재 리콜해야 하는 목록과, `view`를 눌러 선택된 리콜의 세부적인 사항을 확인할 수 있다.



![1575141571039](./doc_img/1575141571039.png)

공급자 측에서 할 수 있는 내용

* 리콜 수락
* 리콜 조치 입력
* 감독기관에 보고 + 사용자 평가 대기



## 사용자

![1575141631541](./doc_img/1575141631541.png)

신청한 리콜 내역에 ` (자동차)[현대자동차(주)] [현대] 베뉴 등 4차종 - 휠 너트 관련 리콜-1`이 추가된 모습



![1575141748105](./doc_img/1575141748105.png)

해당 리콜과 관련된 내용을 다시 한번 상기시켜줌.



![1575141776373](./doc_img/1575141776373.png)

`리콜 현황 조회하기`를 눌렀을 때 나오는 응답. `finish_request`를 눌러 리콜에 대한 피드백을 할 수 있음.



![1575141814197](./doc_img/1575141814197.png)

리콜의 결과를 평가하는 폼.

`평가 점수 입력` 부분은 1부터 5까지의 숫자로 지정할 수 있음.



![1575141870225](./doc_img/1575141870225.png)

리콜 평가가 완료(폼의 내용이 전송)된 바로 직후의 모습



## 공급자

![1575141919251](./doc_img/1575141919251.png)

공급자는 `특이사항`의 코멘트에서 피드백을 얻을 수도 있음.



## 감독 기관

![1575141999538](./doc_img/1575141999538.png)

대시보드

주관 부서가 "국토교통부"인 모든 리콜 목록을 보여준다.



![1575142045057](./doc_img/1575142045057.png)

가장 최근에 처리된 리콜들의 현황을 보여 줌.



### 응답되는 데이터 예시

```json
  {
    "Gubun": "3",
    "idx": 43,
    "Company": "kisa",
    "System": "recall",
    "Question": "(자동차)[현대자동차(주)] [현대] i30 - 계기판 관련 리콜-1",
    "Answer": "하이빔 보조(HBA) 표시등 LED가 장착되지 않아 해당 기능 작동 시 하이빔 보조 기능은 정상 작동하나 하이빔 보조 표시등이 계기판 내 점등되지 않을 수 있는 가능성에 따른 리콜 (안전기준 제38조 부적합)",
    "Link_Gubun": "RCLL_000000000019505", 
    "Link": "www.consumer.go.kr/user/ftc/consumer/recallInfo/629/selectRecallInfoInternalDetail.do?recallSn=RCLL_000000000019505",
    "Question_Nouns": "자동차 현대 자동차 주 현대 I 계기판 관련 리콜",
    "Use_Yn": "b",
    "AVG_Cnt": 0.7460528308511207,
    "Cnt": 0.7844645405527361,
    "Cnt2": 0.7076411211495055
  },
```

| 선택자   | 설명                    | 기타 |
| -------- | ----------------------- | ---- |
| Question | 챗봇이 나타낸 예상 질문 |      |
| Answer   | 예상 질문에 대한 답변   |      |
|  Link_Gubun        |리콜문서 키값                |      |
|  Link        |리콜문서 링크                |      |

