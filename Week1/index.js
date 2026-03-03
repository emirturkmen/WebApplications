// Week 1 - Web Applications
const dayjs = require("dayjs");

function Question(question, questionerId, date, listOfAnswers = []){
    this.question = question;
    this.questionerId = questionerId;
    this.date = dayjs(date);
    this.listOfAnswers = listOfAnswers;

    this.addAnswer = (answer) => {
        this.listOfAnswers.push(answer);
    }

    this.getAnswers = (userId) => {
        return this.listOfAnswers.filter( (answer) => answer.respondentId === userId )
    }

    this.listByDate = () => {
        return this.listOfAnswers.sort((a, b) => a.date.subtract(b.date))
    }

    this.listByScore = () => {
        return this.listOfAnswers.sort((a, b) => b.score - a.score );
    }

    this.afterDate = (date) => {
        return listOfAnswers.filter( (answer) => answer.date.isAfter(date) )
    }
}

function Answer(response, respondentId, date, score = 0, ){
    this.response = response;
    this.respondentId = respondentId;
    this.score = score;
    this.date = dayjs(date);
}

const q1 = new Question("How long is this exercise?", 1, "2026-02-27T14:00");
console.log(q1);

const a1 = new Answer("too much", 2, "2026-02-27T16:00", 10);
const a2 = new Answer("10 minutes", 3, "2026-02-27T15:00",15);
const a3 = new Answer("15 minutes", 2, "2026-02-27T17:00",25);
const a4 = new Answer("30 minutes", 2, "2026-02-26T12:00", 12);

q1.addAnswer(a1);
q1.addAnswer(a2);
q1.addAnswer(a3);
q1.addAnswer(a4);

console.log(q1);

const user3a = q1.getAnswers(3);
const yesterday = dayjs("2026-02-26");
const scoreSort = q1.listByScore();
const dateSort = q1.listByDate();

const answersAfterYesterday = q1.afterDate(yesterday);
console.log("----")
//console.log (answersAfterYesterday);
//console.log(user3a)
//console.log(scoreSort);
console.log(dateSort);