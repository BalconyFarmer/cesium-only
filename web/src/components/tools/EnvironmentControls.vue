<template>
    <div class="env">
        <div class="button addMaterial" @mousedown="handleEnvironmentEffect('Night')">Night</div>
        <div class="button addMaterial" @mousedown="handleEnvironmentEffect('Rain')">Rain</div>
        <div class="button addMaterial" @mousedown="handleEnvironmentEffect('Snow')">Snow</div>
        <div class="button addMaterial" @mousedown="handleEnvironmentEffect('Frog')">Frog</div>
    </div>
</template>

<script>
export default {
    name: 'EnvironmentControls',
    data() {
        return {
            cApp: null
        }
    },
    methods: {
        handleEnvironmentEffect(effectType) {
            switch (effectType) {
                case 'Night':
                    this.cApp.environment.addDarckNessEff();
                    break;
                case 'Rain':
                    this.cApp.environment.addRain();
                    break;
                case 'Snow':
                    this.cApp.environment.addSnow();
                    break;
                case 'Frog':
                    this.cApp.environment.addFrog();
                    break;
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.cApp = window.cApp;
        }, 1000);
    }
}
</script>

<style scoped>
.env {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #333;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.button {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #fff;
    border-radius: 10px;
    background-color: #444;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
}

.button:hover {
    background-color: #555;
    transform: scale(1.1);
}

.addMaterial {
    background-size: cover;
}
</style>
