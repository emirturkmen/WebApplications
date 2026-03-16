const dayjs = require("dayjs");
const sqlite3 = require('sqlite3').verbose();

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
    const db = new sqlite3.Database("./films.db");

    this.addFilm = (id, title, fav=false, userId=1, date=null, rating=null) => {
        return new Promise((resolve, reject) => {
            db.all("INSERT INTO films (id, title, isFavorite, rating, watchDate, userId) VALUES (?,?,?,?,?,?)",
                [id, title, fav ? 1:0, rating, date, userId],(err, rows) => {
                    if (err) reject(`Error: ${err}`);
                    else {
                        resolve("Successfully added");
                    }
                });
        })
    };

    this.favoriteFilms = () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM films WHERE isFavorite = 1", (err, rows) => {
                if (err) reject(err);
                else {
                    let favFilms = []
                    for (const row of rows) {
                        let film = new Film(row["id"], row["title"], row["isFavorite"], row["userId"], row["watchDate"], row["rating"])
                        favFilms.push(film);
                    }
                    resolve(favFilms);
                }
            });
        });
    };

    this.dateFilter = (date) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM films WHERE watchDate < ?", date, (err, rows) => {
                if (err) reject(err);
                else {
                    let favFilms = []
                    for (const row of rows) {
                        let film = new Film(row["id"], row["title"], row["isFavorite"], row["userId"], row["watchDate"], row["rating"])
                        favFilms.push(film);
                    }
                    resolve(favFilms);
                }
            });
        });
    }

    this.deleteFilm = (filmId) => {
        return new Promise((resolve, reject) => {
            db.all("DELETE FROM films WHERE id LIKE ?", [filmId], (err, rows) => {
                if (err) reject(err);
                else resolve(filmId);  // eklenen kaydın id'si
            });
        });
    };

    this.getFilms = () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM films", (err, rows) => {
                if (err) reject(err);
                else {
                    let films = []
                    for (const row of rows) {
                        let film = new Film(row["id"], row["title"], row["isFavorite"], row["userId"], row["watchDate"], row["rating"])
                        films.push(film);
                    }
                    resolve(films);
                }
            });
        });
    }

    this.searchTitle = (title) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM films WHERE title LIKE ?", [`%${title}%`], (err, rows) => {
                if (err) reject(err);
                else {
                    let films = []
                    for (const row of rows) {
                        let film = new Film(row["id"], row["title"], row["isFavorite"], row["userId"], row["watchDate"], row["rating"])
                        films.push(film);
                    }
                    resolve(films);
                }
            });
        });
    }

    this.deleteDates = () => {
        return new Promise((resolve, reject) => {
            db.all("UPDATE films SET watchDate = NULL", (err, rows) => {
                if (err) reject(err);
                else resolve("success");
            });
        });
    };
}


let fm = new FilmLibrary();

fm.getFilms().then((res) => {
    for (const film of res) {
        console.log(film.toString());
    }
    console.log("------");
});

fm.favoriteFilms().then((res) => {
    for (const film of res) {
        console.log(film.toString());
    }
    console.log("------");
});

fm.dateFilter("2026-03-20").then((res) => {
    for (const film of res) {
        console.log(film.toString());
    }
    console.log("------");
});

fm.searchTitle("Fiction").then((res) => {
    for (const film of res) {
        console.log(film.toString());
    }
    console.log("------");
});

fm.addFilm(6, "Harry Potter", false, 4, "2026-03-29", 4).then((res) => {
    console.log(res);
    console.log("------");
}).catch((err) => {
    console.log(err);
    console.log("------");
})

fm.deleteFilm(4).then((res) => {
    console.log(`Deleted ${res}`);
    console.log("------");
}).catch((err) => {
    console.log(err);
    console.log("------");
})

fm.deleteDates().then((res) => {
    console.log(`Deleted dates`);
}).catch((err) => {
    console.log(err);
})
