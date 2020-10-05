<template>
    <div class="navigation-component" v-if="load">
        <ul>
            <li><a @click="switchView(1)">Requests</a></li>
            <li><a @click="switchView(2)">Messages</a></li>
            <li><a @click="switchView(3)">Contact</a></li>
            <li class="right"><a @click="logout()">Logout</a></li>
            <li class="right"><a @click="switchView(4)">Profile</a></li>
        </ul>

        <div v-if="view === 1">
            <Home></Home>
        </div>
        <div v-else-if="view === 2">
            Messages
        </div>
        <div v-else-if="view === 3">
            Another thing 3
        </div>
        <div v-else-if="view === 4">
            Profile
        </div>
    </div>
</template>

<script>
import Home from './Home';

export default {
    data: function() {
        return {
            view: 1,
            load: false
        }   
    },
    components: {
        Home
    },
    methods: {
        switchView: function(switchValue) {
            console.log("switch view" + switchValue);
            if (switchValue === 1) {
                this.view = 1;
            } else if (switchValue === 2) { 
                this.view = 2;
            } else if ( switchValue === 3) {
                this.view = 3;
            } else if ( switchValue === 4) {
                this.view = 4;
            }
        },
        logout: function() {
            localStorage.setItem('requiresAuth', 'userIsNotAuthorized')
            localStorage.clear()
            this.load = false;
            window.location.replace("http://localhost:8080");
        }
    },
    mounted: function() {
        if (localStorage.getItem('requiresAuth') === "userIsAuthorized") {
            this.load = true;
        }
    }
}
</script>

<style lang="scss">
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

.right {
    float: right;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #111;
}
</style>