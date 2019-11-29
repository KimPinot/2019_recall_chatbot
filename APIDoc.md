1)챗봇

- 개인 키 바인딩

  - GET /user/getkey

  - Response : 200

    ```json
    {
        "personal-key" : String
    }
    ```
  
    

- 리콜 조회 : 

  - GET /user/requset/{content}

  - Response : 200

    ```json
{[
        {
        	"Title" : String,
      	 	"Content" : String,
            "Idx" : String,
        	"Similarity" : Number
    	}
    ]}
    ```



- 리콜 신청 : 

  - POST /user/application/{content}

  - Request

    ```json
    {
        "idx" : String,
        "userid" : String,
        "car-reg-num" : String,
        "Key" : String
    }
    ```
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