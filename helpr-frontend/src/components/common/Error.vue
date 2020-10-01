<template>
    <div class="error-card">
        <div class="message">
            <h3 class="text-sm-left"> {{errorMessage}} </h3>
        </div>
        <div class="clear">
            <a @click="clearErrorMessage">Clear</a>
        </div>
    </div>
</template>

<script>
import { emitter } from './event-bus';

export default { 
    name: 'ErrorDisplay',
    data() {
        return {

        }
    },
    methods: {
        clearErrorMessage() {
            emitter.emit('error-display-event');
        }
    },
    props: {
        errorMessage: String
    },
    mounted: function() {
        
    },
    beforeUnmount: function() {
    }
}
</script>

<style scoped lang="scss">
.error-card {
    width: 70%;
    background-color: #F1F1F1;
    border-radius: 8px;
    align-items: center;
    margin-top: 8px;
    border-style: solid;
    border-color: red;
    display: flex;

    .message {
        margin-left: 8px;
    }

    .clear {
        background-color: #1de9b6;
        padding: 12px 18px;
        border-radius: 8px;
        margin: 0 24px 0 auto;
        cursor: pointer;
    }
}
</style>