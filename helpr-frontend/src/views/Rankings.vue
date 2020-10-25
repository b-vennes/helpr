<template>
    <div class="rankingsContainer">
        <Navbar class="navbar"></Navbar>

    </div>
</template>

<script>
import UserService from '../services/user.service.js';
//import UserProfileService from '../services/userprofile.service.js';
import LoggerService from '../services/logger.service.js';
import Navbar from "@/components/Navbar";

const userService = new UserService();
//const userProfileService = new UserProfileService();
const loggerService = new LoggerService();

export default {
    data: function() {
        return {
            paginatedUsers: [],
            paginationLimit: 5,
            paginationPage: 1
        }
    },
    components: {
        Navbar
    },
    methods: {
        async getUsersByPagination() {
            const paginationDto = {
                limit: this.paginationLimit,
                page: this.paginationPage
            };

            await userService.getUsersByPagination(paginationDto)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log("yes");
                } else {
                    const log = {
                        success: false,
                        message: "Get request unsuccessful in Rankings/getUsersByPagination()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            })
        }
    },
    async mounted() {
        await this.getUsersByPagination();
    }
}
</script>


<style lang="scss" scoped>
.navbar {
    position: absolute;
    width: 100vw;
}

.rankingsContainer {

}
</style>