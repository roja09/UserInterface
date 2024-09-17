export interface Post {
    _id: number;
    title: string;
    movieName: string;
    cast: string;
    director: string;
    releaseDate: string;
    duration: string;
    songs: string;
    genre: string;
    description: string;
    body: string;
  }
  export interface Review {
    content: string;
    id: string;
    movieId: number;
    timestamp: Date;
  }
  export interface User {
    id: string;
    username : string;
    name: string;
    password: string;
    timestamp: Date;

  }