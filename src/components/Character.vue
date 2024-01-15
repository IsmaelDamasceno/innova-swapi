<style scoped>
.main-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.info {
    width: 30vw;
    padding: 6px;
}

.films-container {
    width: 50vw;
}

.film-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.film {
    display: flex;
    flex-direction: column;
    width: 22vw;
    height: 20vh;
    padding: 4px;
}

@media (max-width: 783px) {
    .main-container {
        flex-direction: column;
        justify-content: center;
    }

    .info {
        width: 80%;
        margin: auto;
    }

    .films-container {
        width: 80%;
        margin: auto;
    }

    .film {
        display: flex;
        flex-direction: column;
        width: 22vw;
        height: 25vh;
    }
}

@media (max-width: 452px) {
    .film {
        width: 100%;
    }

    .info {
        width: 100%;
    }

    .films-container {
        width: 100%;
    }

    .film-list {
        display: block;
        width: 100%;
    }
}
</style>
<template>
    <main>
        <div class="main-container">
            <div class="info">
                <h1>{{ name }}</h1>
                <p>Born in {{ loaded ? birthYear : "..." }}</p>
                <p>Gender: {{ loaded ? gender : "..." }}</p>
                <p>Eye color: {{ loaded ? eyeColor : "..." }}</p>
            </div>

            <div class="films-container">
                <h1>Films</h1>
                <div v-if="films.length > 0" class="row">
                    <ul class="film-list">
                        <li class="film" v-for="(film, i) in films" :key="i">
                            <p>{{ film.title }}</p>
                            <p>Released date: {{ film.release_date.split("-").reverse().join("/") }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
export default {
    // eslint-disable-next-line
    name: "Character",
    data() {
        return {
            name: "",
            birthYear: "",
            gender: "",
            eyeColor: "",
            films: [],
            loaded: false
        }
    },
    methods: {
        getData() {
            fetch(`https://swapi.dev/api/people/?search=${this.name}`)
                .then(data => data.json())
                .then(content => {
                    const character = content.results[0];
                    this.birthYear = character.birth_year;
                    this.gender = character.gender;
                    this.eyeColor = character.eye_color;
                    this.getFilms(character.films);

                    this.loaded = true;
                });
        },
        getFilms(urlArray) {
            urlArray.forEach(url => {
                this.getFilm(url)
            });
        },
        async getFilm(url) {
            fetch(url)
                .then(response => response.json())
                .then(content => {
                    this.films.push(content);
                });
        },
    },
    mounted() {
        this.name = this.$route.params.name;
        this.getData();
    }
}
</script>
