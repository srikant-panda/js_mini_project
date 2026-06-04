# Bank system for practice functions,callbacks...
    - Today i am building a simple baning system using plain functions to practice the functios and callbackes.

    - The system simply does three things in cycle 
            ```javascript
                function main(){
                    //take input from cli
                }
                function create_request(){
                    // creates a simple http like req
                        ```json
                        method: 'POST',
                        path: '/login',
                        body: {
                            ...
                        }
                        ```
                }
                function bank_simulator(){
                    //call all service function and give them this req and take the res and format the res then give it to main to display it.

                    //simple res format like http
                    ```json
                    status: number,
                    success: boolean,
                    body:{
                        ...
                    }
                }
            ```
During this mini project i have face a lot of problem . not problems i guess it's challenges.

Like:-
    
    - getting input from cli is not that simple like other languages. i user 'readline library' and it's readline property is an async process and then a prompt and callback .
    - That's it this callback thing screwed my thing.
    But dealing with it again and again with claude, now i can simply not full but simply understanded it and believe me it is incrediable.
