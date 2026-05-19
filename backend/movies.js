// movies.js - Sample movie data (acts as our "database")
const movies = [
  {
    id: "1",
    title: "Inception",
    genre: ["Action", "Sci-Fi"],
    rating: 8.8,
    year: 2010,
    duration: "2h 28m",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    poster:
      "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
    director: "Christopher Nolan",
    featured: true
  },
  {
    id: "2",
    title: "The Dark Knight",
    genre: ["Action", "Drama"],
    rating: 9.0,
    year: 2008,
    duration: "2h 32m",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/nMKdUFyrkzwLCoBJVUJQqblVtEt.jpg",
    trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    director: "Christopher Nolan",
    featured: true
  },
  {
    id: "3",
    title: "Interstellar",
    genre: ["Sci-Fi", "Drama"],
    rating: 8.6,
    year: 2014,
    duration: "2h 49m",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. When Earth becomes uninhabitable, they must find a new world beyond our galaxy.",
    poster:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    director: "Christopher Nolan",
    featured: false
  },
  {
    id: "4",
    title: "Pulp Fiction",
    genre: ["Drama", "Crime"],
    rating: 8.9,
    year: 1994,
    duration: "2h 34m",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption in Los Angeles.",
    poster:
      "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    trailer: "https://www.youtube.com/embed/s7EdQ4FqbhY",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson", "Bruce Willis"],
    director: "Quentin Tarantino",
    featured: false
  },
  {
    id: "5",
    title: "The Grand Budapest Hotel",
    genre: ["Comedy", "Drama"],
    rating: 8.1,
    year: 2014,
    duration: "1h 39m",
    description:
      "A writer encounters the owner of an aging European hotel between the wars and learns of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    poster:
      "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/bGSkNec5njzMDj0fzWVaKPf6sEt.jpg",
    trailer: "https://www.youtube.com/embed/1Fg5iWmQjwk",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    cast: ["Ralph Fiennes", "Tony Revolori", "Saoirse Ronan", "F. Murray Abraham"],
    director: "Wes Anderson",
    featured: false
  },
  {
    id: "6",
    title: "Parasite",
    genre: ["Drama", "Thriller"],
    rating: 8.5,
    year: 2019,
    duration: "2h 12m",
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    poster:
      "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/ApiBzeaa95TNYLSt5lDMnSXoEBD.jpg",
    trailer: "https://www.youtube.com/embed/5xH0HfJHsaY",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
    director: "Bong Joon-ho",
    featured: true
  },
  {
    id: "7",
    title: "The Matrix",
    genre: ["Action", "Sci-Fi"],
    rating: 8.7,
    year: 1999,
    duration: "2h 16m",
    description:
      "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth — the life he knows is the elaborate deception of an evil cyber-intelligence.",
    poster:
      "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/hEpWvX6Bp79eLxY1kX5ZZJcme5U.jpg",
    trailer: "https://www.youtube.com/embed/vKQi3bBA1y8",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"],
    director: "The Wachowskis",
    featured: false
  },
  {
    id: "8",
    title: "Coco",
    genre: ["Animation", "Family"],
    rating: 8.4,
    year: 2017,
    duration: "1h 45m",
    description:
      "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    poster:
      "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/askg3SMvhqEl4OL52YuvdtY40Yb.jpg",
    trailer: "https://www.youtube.com/embed/Ga6RYejo6Hk",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    cast: ["Anthony Gonzalez", "Gael García Bernal", "Benjamin Bratt", "Alanna Ubach"],
    director: "Lee Unkrich",
    featured: false
  },
  {
    id: "9",
    title: "Get Out",
    genre: ["Horror", "Thriller"],
    rating: 7.7,
    year: 2017,
    duration: "1h 44m",
    description:
      "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
    poster:
      "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/b8OkHnuEBhgUbMFNiIqt4vKJPV8.jpg",
    trailer: "https://www.youtube.com/embed/DzfpyUB60YY",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford", "Catherine Keener"],
    director: "Jordan Peele",
    featured: false
  },
  {
    id: "10",
    title: "Spirited Away",
    genre: ["Animation", "Fantasy"],
    rating: 8.6,
    year: 2001,
    duration: "2h 5m",
    description:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
    poster:
      "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/bSXfU4dwZyBA1vMmXvejdRXBvuF.jpg",
    trailer: "https://www.youtube.com/embed/ByXuk9QqQkk",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    cast: ["Daveigh Chase", "Suzanne Pleshette", "Miyu Irino", "Rumi Hiiragi"],
    director: "Hayao Miyazaki",
    featured: true
  }
];

module.exports = movies;
