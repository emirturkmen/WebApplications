import dayjs from 'dayjs'

export default function Film(filmId, title, favorite=false, userId=1, watchDate = null, rating=null){
    this.filmId = filmId;
    this.title = title;
    this.favorite = favorite;
    this.userId = userId;
    this.watchDate = watchDate && dayjs(watchDate);
    this.rating = rating;


    this.toString = () => {
        const formattedDate = this.watchDate ? this.watchDate.format("MMMM D, YYYY") : null;
        return "Id: " + this.filmId + ", Title: " + this.title +
            ", Favorite: " + this.favorite + ", Watch date: " + formattedDate +
            ", Rating: " + this.rating + ", User id: " + this.userId
    }

    this.toJSON = () => {
        return {
            ...this,
            watchDate: this.watchDate ? this.watchDate.format("YYYY-MM-DD") : null,
        };
    };
}
