# data 처리

### 데이터 예시
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

