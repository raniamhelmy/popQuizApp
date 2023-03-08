// <reference types="../../@types/jquery "/>

import { Quiz } from "./quiz.module.js";

export class Setting {
  constructor() {
    // Declare Properties

    //document.getElementById("start").addEventListener("click", this.startQuiz.bind(this));

    //If you want to get rid of (bind), use the arrow Function that uses the same {this}
    document.getElementById("start").addEventListener("click", ev => this.startQuiz(ev));
  }

  async startQuiz() {
    const category = $("#category").val();
    const difficulty = $("input[name=difficulty]:checked").val();
    const numOfQ = $("#amount").val();

    //console.log(category, difficulty, numOfQ);

    const response = await this.getQuestions(numOfQ, category, difficulty);

    if (numOfQ > 0) {
      $("#setting").removeClass("show");
      $("#quiz").addClass("show");
      const quiz = new Quiz(response);
    } else {
      //$("#alertNumber").addClass("show");
      $("#alertNumber").show();
    }
  }

  async getQuestions(amount, category, difficulty) {
    const apiResponse = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
    );
    const response = await apiResponse.json();
    return response.results;
  }

  
}


// //press enter to add a new user
//   function keyBoardClicked(e) {
//     if (e.keyCode === 13) {
//         const setting = new Setting();
//         setting.startQuiz();
//         // alert('clicked')
//     }
//   }

//   //fire the keyBoardLogIn function when a specific key is Pressed Down
//    document.addEventListener("keydown", keyBoardClicked);
