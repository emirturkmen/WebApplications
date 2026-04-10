import express from 'express'
import morgan from 'morgan'
import {check, validationResult} from 'express-validator'; // validation middleware
import FilmDBOps from "./db_films.js"// module for accessing the films table in the DB
import Film from "./film.js";
import UserDBOps from "./db_user.js"

const app = express()

const filmDBOps = new FilmDBOps();
const userDBOps = new UserDBOps();

const log = morgan('dev')
app.use(log)

app.use(express.json())

app.get('/api/films', (req, res) => {
    filmDBOps.getFilms().then( (films) => res.json(films));
});

app.get('/api/films/:id', (req, res) => {
    const filmId = req.params["id"];
    filmDBOps.getFilmById(filmId).then(film => res.json(film));
});

app.post('/api/films', (req, res) => {
    const params = req.body;
    console.log(params);
    const film = new Film(undefined, params["title"], params["favorite"], params["userId"], params["watchDate"], params["rating"])
    filmDBOps.addFilm(film).then(film => res.json(film));
});

app.put('/api/films/:id', (req, res) => {
    const filmId = req.params["id"];
    const params = req.body;
    const film = new Film(filmId, params["title"], params["favorite"], params["userId"], params["watchDate"], params["rating"]);
    filmDBOps.updateFilm(film).then(film => res.json(film));
});

app.put('/api/films/:id/rating', (req, res) => {
    const id = parseInt(req.params.id);
    const { rating } = req.body;
    filmDBOps.updateRating(id, rating).then(status => res.json(status));

});

app.put('/api/films/:id/favorite', (req, res) => {
    const id = parseInt(req.params.id);
    const { favorite } = req.body;
    filmDBOps.changeFavorite(id, favorite).then(status => res.json(status));
});


app.delete('/api/films/:id', (req, res) => {
    const id = parseInt(req.params.id);
    filmDBOps.deleteFilm(id).then(status => res.json(status));
})




app.listen(3000, () => { console.log('server started')})