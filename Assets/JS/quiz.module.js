// <reference types="../../@types/jquery "/>

export class Quiz {
    constructor(resp) {
      // Declare Properties
      this.response = resp;
      this.questionLength = resp.length;
      this.curentIndex = 0;
      this.score = 0;
      this.correctAns;
      this.percentage=0;
      this.from = document.getElementById("from");

      //Function(s) that runs Immediately
      //console.log('hello Quiz');
      this.displayQuestion();

      //Events
      //console.log(this.response);
      $('#to').html(this.questionLength);
      document.getElementById("nextQuestion").addEventListener("click", ev => this.nextQuestion(ev));
      document.getElementById("end").addEventListener("click", ev => this.tryAgain(ev));
    }

    displayQuestion() {
        this.from.innerHTML = this.curentIndex + 1;
        const curentQuestion = this.response[this.curentIndex]; // {}
  
        $("#questionTitle").html(curentQuestion.question);
  
        const randomNumber = Math.ceil(Math.random() * this.response.length); // random number to shuffle array of answers
  
        this.correctAns = curentQuestion.correct_answer;
        const answers = [...curentQuestion.incorrect_answers];
  
        answers.splice(randomNumber, 0, this.correctAns);
  
        let questions = ``;
  
        answers.forEach((answer) => {
           questions += `
           
           <li class="my-3 animate__animated animate__fadeInUp">
           <div class="pretty p-default p-round p-smooth">
              <input type="radio" name="answer" value="${answer}" />
              <div class="state p-danger-o">
                 <label> ${answer} </label>
              </div>
           </div>
        </li>
           
           `;
        });
  
        $("#questionContent").html(questions);
     }


     nextQuestion() {
        const curentAns = $('[name="answer"]:checked')?.val();
  
        if (curentAns != null) {
           $("#alertAns").fadeOut(200);
  
           if (curentAns === this.correctAns) {
              this.score++;
              $("#correct").fadeIn(0);
              setTimeout(() => {
                 $("#correct").fadeOut(0);
              }, 500);
           } else {
              $("#inCorrect").fadeIn(0);
              setTimeout(() => {
                 $("#inCorrect").fadeOut(0);
              }, 500);
           }
  
           this.curentIndex++;
           
  
           if (this.curentIndex > this.response.length - 1) {
              $("#quiz").removeClass("show");
              $("#finsish").addClass("show");
              $("#score").html(this.score);
              this.percentage = 100 * this.score / this.questionLength;
              //console.log(this.percentage);
              if(this.percentage >= 75 ){
                $("#celeb").removeClass("d-none");  
                document.getElementById('winCeleb').play();
              }

           } else {
              this.displayQuestion();
           }
        } else {
           $("#alertAns").fadeIn(200);
        }
     }

     tryAgain() {
        $("#finsish").removeClass("show");
        $("#setting").addClass("show");
        $('#celeb').addClass('d-none');
        document.getElementById('winCeleb').pause();
        //location.reload();
        this.curentIndex = 0;
        this.score = 0;
        this.percentage=0;
        // console.log(this.curentIndex,this.score,this.percentage)
        
     }
  
}


