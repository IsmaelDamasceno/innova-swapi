<style scoped>
.loading-container {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.page-bar {
    margin: 8px 0;
}

#goto {
    width: 10vw;
}
</style>
<template>
    <main>
        <div class="input-group mb-3 w-100">
            <input @keyup.enter="getCharacters" v-model="searchName" type="text" class="form-control"
                placeholder="Character's name" aria-label="Character's name" aria-describedby="button-addon2">
            <button @click.prevent="getCharacters" class="btn btn-primary" type="button" id="button-addon2">Search</button>
        </div>

        <div class="w-100 d-flex justify-content-between page-bar" v-if="characters.length > 0">
            <p class="flex-fill">showing {{ results }} results from page {{ currentPage }} out of {{ totalPages }}</p>
            <div class="w-30 d-flex justify-content-between">
                <button @click="changePage(-1)" class="btn btn-primary">&lt;</button>
                <input id="goto" @keyup.enter="goToPage" v-model="targetPage" type="text" class="form-control"
                    placeholder="go to..." aria-label="go to..." aria-describedby="button-addon2">
                <button @click="changePage(1)" class="btn btn-primary">&gt;</button>
            </div>
        </div>

        <div class="row" v-if="characters.length > 0">
            <div class="col-md-3" v-for="(character, i) in characters" :key="i">
                <RouterLink :to="'/character/' + character.name" style="text-decoration: none; color: inherit;">
                    <CharCard :data="character" />
                </RouterLink>
            </div>
        </div>

        <div class="loading-container" v-if="results==0 && !loading">
            <h1>No Results...</h1>
        </div>
        <div v-if="loading" class="loading-container">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </main>
</template>
<script>
import CharCard from "./CharCard.vue";
export default {
    // eslint-disable-next-line
    name: "Home",
    data() {
        return {
            characters: [],
            targetPage: 1,
            lastSearch: "blank",
            searchName: "",
            loading: true,
            currentPage: 1,
            totalPages: -1,
            results: -1,
        }
    },
    components: {
        CharCard,
    },
    methods: {
        getCharacters(event, pageChange = false) {
            if (this.lastSearch === this.searchName && !pageChange) {
                return;
            }

            this.loading = true;
            this.characters = [];

            if (this.searchName === "") {
                if (!pageChange) {
                    this.currentPage = 1;
                }
                this.doSearch(`https://swapi.dev/api/people/?page=${this.currentPage}`);
            }
            else {
                if (!pageChange) {
                    this.currentPage = 1;
                }
                this.doSearch(`https://swapi.dev/api/people/?search=${this.searchName}&page=${this.currentPage}`);
            }
            this.lastSearch = this.searchName;
        },
        changePage(page) {
            if (this.currentPage + page <= 0 || this.currentPage + page > this.totalPages) {
                return;
            }

            this.currentPage += page;
            this.getCharacters(null, true);
        },
        goToPage() {
            this.targetPage = Math.min(Math.max(this.targetPage, 1), this.totalPages);
            if (this.targetPage === this.currentPage) {
                return;
            }

            this.currentPage = this.targetPage;
            this.getCharacters(null, true);
        },
        populatePlanetNames() {
            this.characters.forEach(character => {
                const planetUrl = character.homeworld;
                character.homeworld = "...";
                fetch(planetUrl)
                    .then(data => data.json())
                    .then(content => {
                        character.homeworld = content.name;
                    });
            });

        },
        doSearch(url) {
            fetch(url)
                .then(data => data.json())
                .then(content => {
                    this.characters = content.results;
                    this.populatePlanetNames();
                    this.loading = false;
                    this.results = content.results.length;
                    this.totalPages = Math.ceil(content.count / 10);
                    this.targetPage = Math.min(Math.max(this.targetPage, 1),this.totalPages);
                });
        }
    },
    mounted() {
        this.getCharacters(null);
    },
};
</script>
