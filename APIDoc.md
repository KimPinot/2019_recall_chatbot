1)챗봇

- 개인 키 바인딩

  - GET 
  - getkey
  - user_gubun = '소비자'
    user_gubun = '공급자'
    user_gubun = '감독기관'
  - 개인 어드레스 리턴
  - [{'user_id': '0xe292c994516c8b35c9743b260ec2086d1a47e14d', 'user_name': '소비자', 'user_gubun': '소비자'}]
  - 실행방법 : https://recall.run.goorm.io/getkey?user_gubun=%EC%86%8C%EB%B9%84%EC%9E%90
    

- 리콜 조회 : 

  - GET
  - callNLPJSON
  - var1 = '현대자동차'
https://recall.run.goorm.io/callNLPJSON?company=kisa&system=recall&classgubun=ALL&var1=%ED%98%84%EB%8C%80%EC%9E%90%EB%8F%99%EC%B0%A8


- 리콜 이력(히스토리) 조회 : 

  - GET
  - recall_history
 [파라미터 정의]
    infoId ="RCLL_000000000019416"
    
https://recall.run.goorm.io/recall_history?infoId=RCLL_000000000019416

- 리콜 신청 / 접수 / 수리내역 입력 / 완료 / 거절 : 

  - POST
  - recall_request <---리콜 신청, 접수, 이력, 완료 하나로 다 함
    [파라미터 정의]
    infoId ="RCLL_000000000019416"
    user_id = "0xe292c994516c8b35c9743b260ec2086d1a47e14d"
    
    user_gubun = '소비자'
    user_gubun = '공급자'
    user_gubun = '감독기관'
    
    serialno = "chadeonumber_xxx"
    request_remarks = parse.quote("현대차 리콜 요청합니다.")
    
    status = "request" 리콜 신청
    status = "accept" 리콜 접수
    status = "producer_reject" 공급자 거절
    status = "fixing" 리콜 수행
    status = "consumer_reject" 소비자 거절
    status = "finish_request" 공급자 완료 처리 요청
    status = "finish" 소비자 승인 완료
    
   - 실행방버 : https://recall.run.goorm.io/recall_request?infoId=RCLL_000000000019416&user_id=0xe292c994516c8b35c97
43b260ec2086d1a47e14d&serialno=chadeonumber_xxx&request_remarks=현대차 리콜 요청합니다.&status=request'
   -return : complete
  ```
  
  - Response : 201
  ```



- 리콜 현황 조회 : 

  - GET /user/requset/{content}/status

  - Response (리콜 현황이 있는 경우) : 200

    ```json
    {
        "Title" : String,
        "Content" : String,
        "Current-Status" : Boolean
    }
    ```
  ```
  
  - Response (리콜 현황이 없는 경우) : 404
  ```



- 리콜 평가 :

  - PUT /user/requset/{content}

  - Requset

    ```json
    {
        "Target" : Number,
        "Score" : Number,
        "Comment" : String,
        "Key" : String
    }
    ```
    
  - Response (신청한 유저의 경우) : 201
  
  - Response (신청하지 않은 유저의 경우) : 403



2)공급자

  - 공급자 전용 키 바인딩

      - GET /supplier/getkey
      - Response : 200

    ```json
    {
        "supplier-key" : String
    }
    ```



  - 리콜 정보 조회

      - GET /supplier/requset/{content}
      - Response : 200
      - 위부터 조치 건수, 신청 건수, 평가 점수

    Response : 200

    ```json
    {
        "Title" : String,
        {
        	"Action-Cycle" : Number,
        	"Applications" : Number,
        	"Score" : Number
    	},
    	"Applications-list" : [
            {
                "idx" : String,
                "Author" : String,
                "Content" : String
            }
        ]
    }
    ```

    

- 리콜 신청 수락

  - POST /supplier/request/{content}/apply

  * Requset

  ```json
  {
      "idx" : Number,
      "comment" : "",
      "Current-Status" : False
  }
```
  
  * Response : 201



- 리콜 조치 이력 입력 :

  - PUT  /supplier/requset/{content}/apply
  - Requset

  ```json
  {
      "idx" : Number,
      "comment" : String
  }
  ```

  - Response : 201



- 리콜 조치 완료 :

  - PUT /supplier/request/{content}/apply
  - Request

  ```json
  {
      "idx" : Number,
      "Current-Status" : True
  }
  ```

  - Response : 201



3)감독기관

- 감독기관 버튼 클릭시 Private key 값 바인딩
- 공급자별 리콜신청 건수 / 조치건수 / 평가점수 현황 정보 조회
- 지연이 될 경우 업체에 대해서 패널티 부여 -> 블록체인 업체 페널티 기록`
