<template>


    <div :class="ui.darkMode ? 'stickyDark' : 'sticky'">
        <button class="btn btn-outline-black btn-lg float-start btnMenu text-success" type="button"
            data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">

            <i class="bi bi-list"></i>
        </button>

        <p class="me-4">
            <!-- <p class="text-center align-content-center me-4"> -->

            <img src="../../../assets/lechitapp.svg" alt="bebe" class="img-responsive imgBebe">
            <span class="float-end align-content-center mt-3 badge bg-success">{{ dateTimeNow }}</span>
        </p>


        <div class="offcanvas offcanvas-start" :class="ui.darkMode ? 'bg-dark' : 'bg-success'" tabindex="-1"
            id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel"
                    :class="ui.darkMode ? 'text-success' : 'text-white'">
                    <strong>MENÚ</strong>
                </h5>
                <button type="button" class="btn-close text-reset"
                    :class="ui.darkMode ? 'btn-close-dark' : 'btn-close-white'" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="menu-offcanvas">

                    <div v-for="item in menuItems" class="mb-3">
                        <template v-if="item.to">
                            <router-link :to="{ name: item.to }" @click="close"
                                :class="ui.darkMode ? 'text-success' : ''"><i :class="item.icon"></i> {{ item.text }}
                            </router-link>
                        </template>
                        <template v-else>
                            <router-link :to="{}" @click="handleSalir" :class="ui.darkMode ? 'text-success' : ''"><i
                                    :class="item.icon"></i> {{ item.text }}</router-link>
                        </template>
                    </div>

                    <div class="m-3 fixed-bottom">

                        <template v-if="!ui.darkMode">
                            <router-link :to="{}" @click="handleDarkMode" :class="ui.darkMode ? 'text-success' : ''"><i
                                    class="bi bi-moon-stars-fill"></i> Modo Oscuro</router-link>


                        </template>
                        <template v-else>
                            <router-link :to="{}" @click="handleDarkMode" :class="ui.darkMode ? 'text-success' : ''"><i
                                    class="bi bi-brightness-high-fill"></i> Modo Claro</router-link>

                        </template>


                    </div>
                </div>


            </div>
        </div>

    </div>
    <div id="contenido">
        <router-view></router-view>

    </div>

</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { auth } from '../../../firebase';
import { useUiStore } from '../../../store/uiStore';
import { menuItems } from '../helpers/menu';
import dayjs from 'dayjs';
import { ref } from 'vue';

const ui = useUiStore();

const router = useRouter();

const dateTimeNow = ref<string>(dayjs().format('DD-MM-YYYY HH:mm:ss'))

setInterval(() => {
    dateTimeNow.value = dayjs().format('DD-MM-YYYY HH:mm:ss');
}, 1000);

const close = (): void => {

    let closeCanvas = document.querySelector('[data-bs-dismiss="offcanvas"]') as HTMLButtonElement;
    closeCanvas.click();
}

const handleDarkMode = (): void => {
    ui.setDarkMode(!ui.darkMode);

    if (ui.darkMode) {

        document.querySelector('body')!.className = 'container bg-dark text-info'
    } else {
        document.querySelector('body')!.className = 'container bg-light'

    }

    close();
}

const handleSalir = async (): Promise<void> => {
    await auth.signOut();

    console.log('saliendo...');

    router.push({ name: 'login' });




}


</script>

<style scoped>
.sticky {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #F8FAEF;
    border-color: #F8FAEF;
    margin-left: -10px;
}

.stickyDark {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #17242c;
    border-color: #17242c;
    margin-left: -10px;
}



@media only screen and (min-width: 768px) {
    .imgBebe {
        max-width: 10%;
        padding-top: 5px;

        margin-bottom: 5px;
    }
}

@media only screen and (max-width: 768px) {
    .imgBebe {
        max-width: 25%;
        padding-top: 5px;
        margin-top: 5px;
        margin-bottom: 5px;

    }
}


a {
    color: #ffffff;
    text-decoration: none;
}


#contenido,
.offcanvas-body,
.offcanvas-header {
    font-family: 'Fira Sans', sans-serif;

}

.menu-offcanvas {
    font-weight: bold;
}

.btnMenu:focus,
.btnMenu:active {
    outline: none !important;
    box-shadow: none;
}
</style>






