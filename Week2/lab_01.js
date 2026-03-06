const dayjs = require("dayjs");

function Film(filmId, title, favorite=false, userId=1, date = null, rating=null){
    this.filmId = filmId;
    this.title = title;
    this.favorite = favorite;
    this.userId = userId;
    this.date = date ? new dayjs(date) : null;
    this.rating = rating;


    this.toString = () => {
        const formattedDate = this.date ? this.date.format("MMMM D, YYYY") : null;
        return "Id: " + this.filmId + ", Title: " + this.title +
           ", Favorite: " + this.favorite + ", Watch date: " + formattedDate +
           ", Rating: " + this.rating + ", User id: " + this.userId
    }
}

function FilmLibrary(){
    this.films = [];

    this.addFilms = (film) => {
      this.films.push(film);
    };

    this.printFilms = () => {
        this.printFilmsParam(this.films);
    };

    this.printFilmsParam = (films= []) => {
        films.forEach((film) => console.log(film.toString()));
    }

    this.sortByDate = () => {
        let sortedFilms = this.films.sort((f1, f2) => {
          if (f1.date === null && f2.date === null){
              return 0;
          }
          else if (f1.date === null){
              return 1;
          }
          else if (f2.date === null){
              return -1;
          }
          else{
              return f1.date.isBefore(f2.date) ? -1 : 1;
          }
        });
        this.printFilmsParam(sortedFilms);
    };

    this.sortByRating = () => {
        let sortedFilms = this.films.sort((f1, f2) => {
            if (f1.rating === null && f2.rating === null){
                return 0;
            }
            else if (f1.rating === null){
                return 1;
            }
            else if (f2.rating === null){
                return -1;
            }
            else{
                return f2.rating - f1.rating;
            }
        });
        this.printFilmsParam(sortedFilms);
    };

    this.removeFilm = (filmId) => {
        const removeIndex = this.films.findIndex((film) => film.filmId === filmId);
        this.films.splice(removeIndex, 1);
    };

    this.updateRating = (filmId, rating) => {
        const toUpdateFilm = this.films.find((film) => film.filmId === filmId)
        toUpdateFilm.rating = rating;
    };
}

const f1 = new Film(1, "Pulp Fiction", true, 1, "2025-03-10", 5);
const f2 = new Film(2, "21 Grams", true, 1, "2025-03-17", 4);
const f3 = new Film(3, "Star Wars", false, 1);
const f4 = new Film(4, "Matrix", false, 1);
const f5 = new Film(5, "Shrek", false, 1, "2025-03-21", 3);

const filmsArr = [f1, f2, f3, f4, f5];
const fl = new FilmLibrary();
filmsArr.forEach((film) => fl.addFilms(film));

fl.printFilms();
console.log("----");
fl.sortByDate();
console.log("----");
fl.sortByRating();
console.log("----");
fl.removeFilm(2);
fl.printFilms();
console.log("----");
fl.updateRating(3, 4);
fl.printFilms();