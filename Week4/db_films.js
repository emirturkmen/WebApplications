import {db} from "./db.js";
import Film from "./film.js";

function mapRowsToFilms(rows) {
    return rows.map(row => new Film(row.id, row.title, row.isFavorite === 1, row.watchDate, row.rating, row.userId));
}

export default function FilmDBOps(){
    this.addFilm = (film) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO films (title, isFavorite, rating, watchDate, userId) VALUES(?, ?, ?, ?, ?)';
            const watchDate = film.watchDate ? film.watchDate.format("YYYY-MM-DD") : null;
            let rating;
            if (!film.rating || film.rating < 1 || film.rating > 5)
                rating = null;
            else
                rating = film.rating;

            db.run(query, [film.title, film.favorite, rating, watchDate, film.userId], function (err) {
                if (err) {
                    reject(err);
                }
                film.id = this.lastID;
                resolve(film);
            });
        });
    };

    this.updateFilm = (film) => {
        return new Promise((resolve, reject) => {
            const watchDate = film.watchDate ? film.watchDate.format("YYYY-MM-DD") : null;
            let rating;
            if (!film.rating || film.rating < 1 || film.rating > 5)
                rating = null;
            else
                rating = film.rating;
            db.all("UPDATE films SET title=?, isFavorite=?, rating=?, watchDate=? WHERE id = ?",
                [film.title, film.favorite, rating, watchDate, film.filmId],(err, rows) => {
                    if (err) reject(`Error: ${err}`);
                    else {
                        resolve(film);
                    }
                });
        })
    }

    this.favoriteFilms = () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM films WHERE isFavorite = 1", (err, rows) => {
                if (err) reject(err);
                else {
                    resolve(mapRowsToFilms(rows));
                }
            });
        });
    };


    this.deleteFilm = (filmId) => {
        return new Promise((resolve, reject) => {
            db.all("DELETE FROM films WHERE id = ?", [filmId], (err, rows) => {
                if (err) reject(err);
                else resolve("Film " + filmId + " is successfully deleted");
            });
        });
    };

    this.getFilms = () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM films", (err, rows) => {
                if (err) reject(err);
                else {
                    resolve(mapRowsToFilms(rows));
                }
            });
        });
    }

    this.getFilmById = (filmId) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM films WHERE id = ?", [filmId], (err, rows) => {
                if (err) reject(err);
                else {
                    const row = rows[0];
                    let film = new Film(row["id"], row["title"], row["isFavorite"], row["userId"], row["watchDate"], row["rating"])
                    resolve(film);
                }
            });
        });
    }

    this.updateRating = (filmId, rating) => {
        return new Promise((resolve, reject) => {
            db.all("UPDATE films SET rating = ? WHERE id = ? ", [rating, filmId], (err, rows) => {
                if (err) reject(err);
                else resolve("success");
            });
        });
    }

    this.changeFavorite = (filmId, isFav) => {
        return new Promise((resolve, reject) => {
            console.log(isFav ? 1:0);
            db.all("UPDATE films SET isFavorite = ? WHERE id = ? ", [isFav ? 1:0, filmId], (err, rows) => {
                if (err) reject(err);
                else resolve("success");
            });
        });
    }
}