<template>
    <div class="container">
        <Navbar class="navbar"></Navbar>
        <div class="profileContainer" v-if="!isEditUserProfile">
            <div class="content">
                <div class="top">
                    <router-link to="/requests">
                        <div class="back">
                            <img src="../assets/left-chevron.svg">
                        </div>
                    </router-link>
                    <div class="tooltipEdit">
                        <div @click="editProfile" class="editProfileIcon">
                            <span class="tooltiptextEdit">Edit</span>
                            <img src="https://img.icons8.com/material-sharp/24/000000/edit.png">
                        </div>
                    </div>
                    <div class="helprHistory" @click="helprHistoryDisplay()">
                        Helpr History
                    </div>
                    <div class="ranking">
                        <div class="rankBronze" v-if="points <= 500">
                            Bronze Helpr
                        </div>
                        <div class="rankSilver" v-else-if="points > 500 && points <= 2000">
                            Silver Helpr
                        </div>
                        <div class="rankGold" v-else-if="points > 2000 && points <= 3500">
                            Gold Helpr
                        </div>
                        <div class="rankPlatinum" v-else-if="points > 3500 && points <= 5000">
                            Platinum Helpr
                        </div>
                        <div class="rankDiamond" v-else-if="points > 5000">
                            Diamond Helpr
                        </div>
                    </div>
                </div>
                <div class="main">
                    <div class="header">
                        <img :src="photo">
                        <div class="points">
                            {{ points }}
                        </div>
                    </div>
                    <div class="name">
                        {{ name }}
                    </div>
                    <div class="title">
                        {{ title }}
                    </div>
                    <div class="tags">
                        <div v-for="userTag in userTags" v-bind:key="userTag.id">
                            {{ userTag.tagName }}
                        </div>
                    </div>
                    <div class="description">
                        <div>
                            {{ description }}
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="helprRequests" @click="helprRequestsDisplay()">
                        Helpr Requests
                    </div>
                    <div class="helprFriends" @click="helprFriendsDisplay()">
                        Helpr Friends
                    </div>
                </div>
            </div>
            <transition name="fade">
                <div class="userHistoryCard" v-if="showUserHistory">
                    <History
                        v-bind:userId="userId"
                    ></History>
                </div>
            </transition>
            <transition name="fade">
                <div class="userRequestsCard" v-if="showUserRequests">
                    <Requests
                        v-bind:userId="userId"
                    ></Requests>
                </div>
            </transition>
            <transition name="fade">
                <div class="userFriendsCard" v-if="showUserFriends">
                    <Friends
                        v-bind:userId="userId"
                    ></Friends>
                </div>
            </transition>
            <div class="userHistoryHovered" v-if="isUserInfoHover && userInfoHover">
                <div class="userHistoryHoveredCard">
                    <div class="userHistoryPhoto">
                        <img v-bind:src="userInfoHover.user.photo">
                    </div>
                    <div class="userHistoryInformation">
                        <div class="userHistoryName">
                            {{userInfoHover.user.firstname}} {{userInfoHover.user.lastname}}
                        </div>
                        <div class="userHistoryTitle">
                            {{ userInfoHover.userProfile.title }}
                        </div>
                    </div>
                    <div class="userHistoryRanking">
                        <div class="userHistoryRankBronze" v-if="userInfoHover.userProfile.points <= 500">
                            Bronze Helpr
                        </div>
                        <div class="userHistoryRankSilver" v-else-if="userInfoHover.userProfile.points > 500 && userInfoHover.userProfile.points <= 2000">
                            Silver Helpr
                        </div>
                        <div class="userHistoryRankGold" v-else-if="userInfoHover.userProfile.points > 2000 && userInfoHover.userProfile.points <= 3500">
                            Gold Helpr
                        </div>
                        <div class="userHistoryRankPlatinum" v-else-if="userInfoHover.userProfile.points > 3500 && userInfoHover.userProfile.points <= 5000">
                            Platinum Helpr
                        </div>
                        <div class="userHistoryRankDiamond" v-else-if="userInfoHover.userProfile.points > 5000">
                            Diamond Helpr
                        </div>
                    </div>
                    <div class="userHistoryComment">
                        {{ userInfoHover.commentFromUser }}
                    </div>
                </div>
            </div>
        </div>
        <div class="profileContainer" v-if="isEditUserProfile">
            <div class="tooltip">
                <div @click="editName" class="editNameIcon" v-if="!isEditTitle && !isEditDescription && !isEditTags">
                    <span class="tooltiptext">Edit to edit name</span>
                    Edit Name
                </div>
                <div class="editNameIconDisabled" v-else>
                    <span class="tooltiptext">Edit to edit name</span>
                    ...
                </div>
            </div>
            <div class="tooltipLeft">
                <div @click="editTitle" class="editTitleIcon" v-if="!isEditName && !isEditDescription && !isEditTags">
                    <span class="tooltiptextLeft">Click to edit title</span>
                    Edit Title
                </div>
                <div class="editTitleIconDisabled" v-else>
                    <span class="tooltiptextLeft">Click to edit title</span>
                    ...
                </div>
            </div>
            <div class="tooltip">
                <div @click="editDescription" class="editDescriptionIcon" v-if="!isEditName && !isEditTitle && !isEditTags">
                    <span class="tooltiptext">Click to edit description</span>
                    Edit Description
                </div>
                <div class="editDescriptionIconDisabled" v-else>
                    <span class="tooltiptext">Click to edit description</span>
                    ...
                </div>
            </div>
            <div class="tooltip">
                <div @click="editTags" class="editTagsIcon" v-if="!isEditName && !isEditTitle && !isEditDescription">
                    <span class="tooltiptext">Click to edit tags</span>
                    Edit Tags
                </div>
                <div class="editTagsIconDisabled" v-else>
                    <span class="tooltiptext">Click to edit tags</span>
                    ...
                </div>
            </div>
            <div class="content">
                <div class="top">
                    <router-link to="/requests">
                        <div class="back">
                            <img src="../assets/left-chevron.svg">
                        </div>
                    </router-link>
                    <div class="tooltipEdit">
                        <div @click="saveProfileEdit" class="editProfileIcon" v-if="!isEditName && !isEditTitle && !isEditDescription && !isEditTags">
                            <span class="tooltiptextEdit">Save Changes</span>
                            <img src="https://img.icons8.com/material/24/000000/save--v1.png"/>
                        </div>
                        <div class="editProfileIconDisabled" v-else>
                            <span class="tooltiptextEdit">Save Changes</span>
                            <img src="https://img.icons8.com/material/24/000000/save--v1.png"/>
                        </div>
                    </div>
                    <div class="helprHistory" @click="helprHistoryDisplay()">
                        Helpr History
                    </div>
                    <div class="ranking">
                        <div class="rankBronze" v-if="points <= 500">
                            Bronze Helpr
                        </div>
                        <div class="rankSilver" v-else-if="points > 500 && points <= 2000">
                            Silver Helpr
                        </div>
                        <div class="rankGold" v-else-if="points > 2000 && points <= 3500">
                            Gold Helpr
                        </div>
                        <div class="rankPlatinum" v-else-if="points > 3500 && points <= 5000">
                            Platinum Helpr
                        </div>
                        <div class="rankDiamond" v-else-if="points > 5000">
                            Diamond Helpr
                        </div>
                    </div>
                </div>
                <div class="main">
                    <div class="header">
                        <img :src="photo">
                        <div class="points">
                            {{ points }}
                        </div>
                    </div>
                    <div class="name" v-if="!isEditName">
                        {{ name }}
                    </div>
                    <div class="name" v-else>
                        <input v-model="editedName" :placeholder="name" />
                    </div>
                    <div class="title" v-if="!isEditTitle">
                        {{ title }}
                    </div>
                    <div class="title" v-else>
                        <input v-model="editedTitle" :placeholder="title" />
                    </div>
                    <div class="tags" v-if="!isEditTags">
                        <div v-for="userTag in userTags" v-bind:key="userTag.id">
                            {{ userTag.tagName }}
                        </div>
                    </div>
                    <div v-else class="editTags">
                        <div class="tags">
                            <div v-for="userTag in userTags" v-bind:key="userTag.id">
                                {{ userTag.tagName }}
                            </div>
                        </div>
                        <div id="v-model-select-dynamic" class="selectTags">
                            <select v-model="selectedTag" @change="onSelected()">
                                <option disabled value="">Select a Tag</option>
                                <option v-for="tag in tagSelectList" v-bind:key="tag.id">
                                    {{ tag.name }}
                                </option>
                            </select>
                        </div>
                        <div class="selectedTagsFromList">
                            <div class="userTagsToAdd" v-for="selectedTag in selectedTags" v-bind:key="selectedTag.id">
                                {{selectedTag.name}}
                            </div>
                        </div>
                    </div>
                    <div class="description" v-if="!isEditDescription">
                        <div>
                            {{ description }}
                        </div>
                    </div>
                    <div class="description" v-else>
                        <textarea  v-model="editedDescription" :placeholder="description" />
                    </div>
                </div>
                <div class="bottom">
                    <div class="helprRequests" @click="helprRequestsDisplay()">
                        Helpr Requests
                    </div>
                    <div class="helprFriends" @click="helprFriendsDisplay()">
                        Helpr Friends
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserProfileService from '../services/userprofile.service.js';
import UserTagService from '../services/usertag.service.js';
import TagService from '../services/tag.service.js';
import LoggerService from '../services/logger.service.js';
import Navbar from "@/components/Navbar";
import UserService from '../services/user.service.js';
import History from '../components/profile-components/History';
import Requests from '../components/profile-components/Requests';
import Friends from '../components/profile-components/Friends';
import { emitter } from '../components/common/event-bus';

const userProfileService = new UserProfileService();
const userTagService = new UserTagService();
const userService = new UserService();
const tagService = new TagService();
const loggerService = new LoggerService();

export default {
    data: function() {
        return {
            userTags: [],
            name: "",
            photo: "",
            email: "",
            description: "",
            title: "",
            points: 0,
            userId: 0,
            userProfileId: 0,
            isEditUserProfile: false,
            firstName: "",
            lastName: "",
            isEditName: false,
            isEditDescription: false,
            isEditTitle: false,
            isEditTags: false,
            editedName: "",
            editedTitle: "",
            editedDescription: "",
            tagSelectList: [],
            tags: [],
            selectedTags: [],
            selectedTag: '',
            showUserHistory: false,
            showUserRequests: false,
            showUserFriends: false,
            isUserInfoHover: false,
            userInfoHover: {}
        }
    },
    components: {
        Navbar,
        History,
        Requests,
        Friends
    },
    methods: {
        async setData() {
            this.firstName = localStorage.getItem('firstname');
            this.lastName = localStorage.getItem('lastname');
            
            this.name = this.firstName + " " + this.lastName;
            this.photo = localStorage.getItem('photo');
            this.email = localStorage.getItem('email');
            this.userId = localStorage.getItem('userId');
        },
        async getUserProfileData() {
            await userProfileService.getUserProfileById(this.userId)
            .then(response => {
                if (response.status === 200) {
                    this.points = response.data.points;
                    this.title = response.data.title;
                    this.description = response.data.aboutMe;
                    this.userProfileId = response.data.id;
                } else {
                    const log = {
                        success: false,
                        message: "Get request unsuccessful in Profile/getUserProfileData()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            })
        },
        async getUserTags() {
            await userTagService.getUserTagsById(this.userId)
            .then(response => {
                if (response.status === 200) {
                    this.userTags = response.data;
                } else {
                    const log = {
                        success: false,
                        message: "Get request unsuccessful in Profile/getUserTags()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            })
        },
        async getTags() {
            await tagService.getAllTags()
            .then(response => {
                if (response.status === 200) {
                    this.tagSelectList = response.data;
                    this.tags = response.data;
                } else {
                    const log = {
                        success: false,
                        message: "Get request unsuccessful in Profile/getTags()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            })
        },
        async saveProfileEdit() {
            localStorage.setItem('firstname', this.name.split(' ')[0]);
            localStorage.setItem('lastname', this.name.split(' ')[1]);
            const user = { 
                userId: parseInt(this.userId),
                firstname: this.name.split(' ')[0],
                lastname: this.name.split(' ')[1]
            };

            const userProfile = {
                id: this.userProfileId,
                points: this.points,
                title: this.title,
                aboutMe: this.description,
                userId: parseInt(this.userId)
            }

            await userService.updateUser(user)
            .then(response => {
                if (response.status !== 200) {
                    const log = {
                        success: false,
                        message: "Could not update User in Profile/saveProfileEdit()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            });

            await userProfileService.update(userProfile)
            .then(response => {
                if (response.status !== 200) {
                    const log = {
                        success: false,
                        message: "Could not update UserProfile in Profile/saveProfileEdit()",
                        httpStatusCode: response.status,
                        isBackEnd: false,
                        isFrontEnd: true,
                        timestamp: new Date()
                    };

                    loggerService.createLog(log);
                }
            });

            for (var selectedTag of this.selectedTags) {
                const userTag = {
                    userId: parseInt(this.userId),
                    tagId: selectedTag.id,
                    isDeleted: 0
                };

                await userTagService.createUserTag(userTag)
                .then(response => {
                    if (response.status !== 200) {
                        const log = {
                            success: false,
                            message: "Could not create a Helpr Tag in Profile/createComment()",
                            httpStatusCode: response.status,
                            isBackEnd: false,
                            isFrontEnd: true,
                            timestamp: new Date()
                        };

                        loggerService.createLog(log);
                    }
                });
            }

            this.isEditUserProfile = false;
        },
        editProfile() {
            this.isEditUserProfile = true;
        },
        editName() {
            if (!this.isEditName) {
                this.isEditName = true;
            } else {
                if (this.editedName !== "") {
                    this.name = this.editedName;
                    this.editedName = "";
                }
                this.isEditName = false;
            }
        },
        editDescription() {
            if (!this.isEditDescription) {
                this.isEditDescription = true;
            } else {
                if (this.editedDescription !== "") {
                    this.description = this.editedDescription;
                    this.editedDescription = "";
                }
                this.isEditDescription = false;
            }
        },
        editTitle() {
            if (!this.isEditTitle) {
                this.isEditTitle = true;
            } else {
                if (this.editedTitle !== "") {
                    this.title = this.editedTitle;
                    this.editedTitle = "";
                }
                this.isEditTitle = false;
            }
        },
        editTags() {
            if (!this.isEditTags) {
                this.isEditTags = true;
            } else {
                if (this.selectedTags !== []) {
                    for (var selectedTag of this.selectedTags) {
                        const tempTag = {
                            id: selectedTag.id,
                            tagName: selectedTag.name
                        };

                        this.userTags.push(tempTag);
                    }
                }

                this.isEditTags = false;
            }
        },
        helprHistoryDisplay() {
            this.showUserHistory = !this.showUserHistory;
            this.showUserRequests = false;
            this.showUserFriends = false;
        },
        helprRequestsDisplay() {
            this.showUserRequests = !this.showUserRequests;
            this.showUserHistory = false;
            this.showUserFriends = false;
        },
        helprFriendsDisplay() {
            this.showUserFriends = !this.showUserFriends;
            this.showUserRequests = false;
            this.showUserHistory = false;
        },
        onSelected() {
            let tagToRemove = {};
            for (var tag of this.tags) {
                if (tag.name === this.selectedTag) {
                    tagToRemove = tag;
                    this.selectedTags.push(tag);
                    break;
                }
            }

            var index = this.tagSelectList.indexOf(tagToRemove);
            this.tagSelectList.splice(index, 1);
            this.selectedTag = '';
        }
    },
    async mounted() {
        await this.setData();
        await this.getUserProfileData();
        await this.getUserTags();
        await this.getTags();

        emitter.on('user-hover-info-event', event => {
            this.isUserInfoHover = event.isUserInfoHover;
            this.userInfoHover = event.userInfoHover
        });

        emitter.on('user-leave-hover-info-event', () => {
            this.isUserInfoHover = false;
            this.userInfoHover = {};
        });
    },
    beforeUnmount: function() {
        emitter.off('user-hover-info-event', () => {});
        emitter.off('user-leave-hover-info-event', () => {});
    }
}
</script>

<style scoped lang="scss">
.navbar {
  position: absolute;
  width: 100vw;
}

.tooltip {
    position: relative;
    display: inline-block;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 150px;
    background-color: white;
    color: #42b983;
    border-style: solid;
    border-color: #42b983;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    border-width: 3px;
    position: absolute;
    top: -35px;
    left: 115%;
    z-index: 1;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}

.tooltipLeft {
    position: relative;
    display: inline-block;
}

.tooltipLeft .tooltiptextLeft {
    visibility: hidden;
    width: 150px;
    background-color: white;
    color: #42b983;
    border-style: solid;
    border-color: #42b983;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    border-width: 3px;
    position: absolute;
    top: -45px;
    left: -160px;
    z-index: 1;
}

.tooltipLeft:hover .tooltiptextLeft {
    visibility: visible;
}

.profileContainer {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: black;
    height: 100vh;

    .editNameIcon {
        position: fixed;
        right: 900px;
        top: 600px;
        background-color: #f1f1f1;
        border-radius: 24px;
        border-style: solid;
        border-color: #42b983;
        border-width: 3px;
        padding: 3px;
        width: 100px;
        font-family: 'Patrick Hand SC', cursive;
        font-size: 20px;
        font-weight: 400;
        -webkit-user-select: none;  
        -moz-user-select: none;
        -ms-user-select: none;

        &:hover {
            background-color: #fafafa;
            cursor: pointer;
        }
    }

    .editNameIconDisabled {
        position: fixed;
        right: 900px;
        top: 600px;
        background-color: #f1f1f1;
        border-radius: 24px;
        border-style: inset dotted;
        border-color: #42b983;
        border-width: 3px;
        padding: 3px;
        width: 100px;
        font-family: 'Patrick Hand SC', cursive;
        font-size: 20px;
        font-weight: 400;
        -webkit-user-select: none;  
        -moz-user-select: none;
        -ms-user-select: none;

        &:hover {
            cursor: pointer;
        }
    }

    .editTitleIcon {
        position: fixed;
        left: 860px;
        top: 645px;
        background-color: #f1f1f1;
        border-radius: 24px;
        border-style: solid;
        border-color: #42b983;
        border-width: 3px;
        padding: 3px;
        width: 140px;
        font-family: 'Patrick Hand SC', cursive;
        font-size: 20px;
        font-weight: 400;
        -webkit-user-select: none;  
        -moz-user-select: none;
        -ms-user-select: none;

        &:hover {
            background-color: #fafafa;
            cursor: pointer;
        }
    }

    .editTitleIconDisabled {
        position: fixed;
        left: 860px;
        top: 645px;
        background-color: #fafafa;
        border-radius: 24px;
        border-style: inset dotted;
        border-width: 3px;
        border-color: #42b983;
        padding: 3px;
        width: 140px;
        font-family: 'Patrick Hand SC', cursive;
        font-size: 20px;
        font-weight: 400;
        -webkit-user-select: none;  
        -moz-user-select: none;
        -ms-user-select: none;
        
        &:hover {
            cursor: pointer;
        }
    }

    .editDescriptionIcon {
        position: fixed;
        left: 860px;
        top: 835px;
        background-color: #f1f1f1;
        border-radius: 24px;
        border-style: solid;
        border-color: #42b983;
        border-width: 3px;
        padding: 3px;
        width: 140px;
        font-family: 'Patrick Hand SC', cursive;
        font-size: 20px;
        font-weight: 400;
        -webkit-user-select: none;  
        -moz-user-select: none;
        -ms-user-select: none;

        &:hover {
            background-color: #fafafa;
            cursor: pointer;
        }
    }

    .editDescriptionIconDisabled {
        position: fixed;
        left: 860px;
        top: 835px;
        background-color: #f1f1f1;
        border-radius: 24px;
        border-style: inset dotted;
        border-color: #42b983;
        border-width: 3px;
        padding: 3px;
        width: 140px;
        font-family: 'Patrick Hand SC', cursive;
        font-size: 20px;
        font-weight: 400;
        -webkit-user-select: none;  
        -moz-user-select: none;
        -ms-user-select: none;

        &:hover {
            cursor: pointer;
        }
    }

    .editTagsIcon {
        position: fixed;
        right: 860px;
        top: 680px;
        background-color: #f1f1f1;
        border-radius: 24px;
        border-style: solid;
        border-color: #42b983;
        border-width: 3px;
        padding: 3px;
        width: 140px;
        font-family: 'Patrick Hand SC', cursive;
        font-size: 20px;
        font-weight: 400;
        -webkit-user-select: none;  
        -moz-user-select: none;
        -ms-user-select: none;

        &:hover {
            background-color: #fafafa;
            cursor: pointer;
        }
    }

    .editTagsIconDisabled {
        position: fixed;
        right: 860px;
        top: 680px;
        background-color: #f1f1f1;
        border-radius: 24px;
        border-style: inset dotted;
        border-color: #42b983;
        border-width: 3px;
        padding: 3px;
        width: 140px;
        font-family: 'Patrick Hand SC', cursive;
        font-size: 20px;
        font-weight: 400;
        -webkit-user-select: none;  
        -moz-user-select: none;
        -ms-user-select: none;

        &:hover {
            cursor: pointer;
        }
    }



    .content {
        display: flex;
        align-items: flex-start;
        flex-direction: column;

        .top {
            width: 100%;
            display: flex;
            justify-content: center;
            font-size: 28px;

            a {
                display: flex;
                align-items: center;
                justify-content: center;
                left: -5px;
                position: relative;

                .back {
                    background-color: #f1f1f1;
                    border-radius: 50%;
                    height: 40px;
                    margin: 0 8px 8px 0;
                    width: 40px;

                    img {
                        height: 15px;
                    }

                    &:hover {
                        background-color: #fafafa;
                        cursor: pointer;
                    }
                }
            }

            .tooltipEdit {
                position: relative;
                display: inline-block;
            }

            .tooltipEdit .tooltiptextEdit {
                visibility: hidden;
                font-size: 15px;
                width: 150px;
                background-color: white;
                color: #42b983;
                border-style: solid;
                border-color: #42b983;
                text-align: center;
                padding: 5px 0;
                border-radius: 6px;
                border-width: 3px;
                position: absolute;
                top: -45px;
                left: 105%;
                z-index: 1;
            }

            .tooltipEdit:hover .tooltiptextEdit {
                visibility: visible;
            }

            .editProfileIcon {
                position: relative;
                left: -5px;
                background-color: #f1f1f1;
                border-radius: 50%;
                height: 40px;
                margin: 0 8px 8px 0;
                width: 40px;

                img {
                    height: 15px;
                }

                &:hover {
                    background-color: #fafafa;
                    cursor: pointer;
                }
            }

            .editProfileIconDisabled {
                position: relative;
                left: -5px;
                background-color: #fafafa;
                border-radius: 50%;
                height: 40px;
                margin: 0 8px 8px 0;
                width: 40px;

                img {
                    height: 15px;
                }

                &:hover {
                    cursor: pointer;
                }
            }

            .helprHistory {
                padding: 3px;
                margin-bottom: 7px;
                position: relative;
                font-family: 'Patrick Hand SC', cursive;
                width: 200px;
                left: 0;
                font-size: 25px;
                font-weight: 600;
                border-radius: 24px;
                background-color: #42b983;

                &:hover {
                    cursor: pointer;
                }
            }

            .ranking {
                position: relative;
                left: 5px;
                width: 200px;
                font-size: 25px;
                font-weight: 600;
                font-family: 'Patrick Hand SC', cursive;

                .rankBronze {
                    padding: 3px;
                    border-radius: 24px;
                    background-color: #CD7F32;
                }

                .rankSilver {
                    padding: 3px;
                    border-radius: 24px;
                    background-color: #C0C0C0;
                }

                .rankGold {
                    padding: 3px;
                    border-radius: 24px;
                    background-color: #FFD700;
                }

                .rankPlatinum {
                    padding: 3px;
                    border-radius: 24px;
                    background-color: #b19cd9;
                }

                .rankDiamond {
                    padding: 3px;
                    border-radius: 24px;
                    background-color: #b9f2ff;
                }
            }
        }

        .main {
            display: flex;
            flex-direction: column;
            background-color: #F1F1F1;
            background-image: url("../assets/card-background.svg");
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 40px;
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
            height: 40rem;
            padding: 12px;
            width: 30rem;

            .header {
                margin: 24px 0 0 0;

                img {
                    height: 225px;
                    border-radius: 50%;
                }

                .points {
                    position: absolute;
                    left: 14rem;
                    top: 15rem;
                    background-color: #D25982;
                    width: 3rem;
                    border-radius: 24px;
                    padding: 8px;
                    margin: auto;
                    font-weight: 600;
                }
            }

            .name {
                margin-top: 12px;
                font-size: 55px;
                line-height: 50px;
                font-family: 'Patrick Hand SC', cursive;

                input {
                    text-align: center;
                    border: none;
                    background-color: transparent;
                    font-size: 40px;
                    font-family: 'Patrick Hand SC', cursive;
                    outline: none;
                }
            }
            
            .title {
                font-size: 25px;
                font-family: 'Patrick Hand SC', cursive;

                input {
                    text-align: center;
                    border: none;
                    background-color: transparent;
                    font-size: 25px;
                    font-family: 'Patrick Hand SC', cursive;
                    outline: none;
                }
            }

            .tags {
                display: flex;
                justify-content: center;

                div {
                    margin: 12px 6px;
                    background-color: #FFEE58;
                    padding: 4px 8px;
                    border-radius: 8px;
                }
            }

            .selectedTagsFromList {
                display: flex;
                justify-content: center;

                .userTagsToAdd {
                    margin: 12px 6px;
                    background-color: lightyellow;
                    padding: 4px 8px;
                    border-radius: 8px;
                }
            }

            .description {
                padding: 15px;
                margin-top: 15px;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                font-family: 'Patrick Hand SC', cursive;

                div {
                    text-align: left;
                }

                textarea {
                    width: 100%;
                    height: 150px;
                    text-align: left;
                    border: none;
                    background-color: transparent;
                    font-size: 20px;
                    font-family: 'Patrick Hand SC', cursive;
                    outline: none;
                }
            }
        }

        .bottom {
            width: 100%;
            display: flex;
            justify-content: center;
            font-size: 28px;
            margin-top: 10px;

            .helprRequests {
                padding: 3px;
                margin-right: 5px;
                margin-bottom: 7px;
                position: relative;
                font-family: 'Patrick Hand SC', cursive;
                width: 50%;
                left: 0;
                font-size: 25px;
                font-weight: 600;
                border-radius: 24px;
                background-color: #42b983;

                &:hover {
                    cursor: pointer;
                }
            }

            .helprFriends {
                padding: 3px;
                margin-bottom: 7px;
                position: relative;
                font-family: 'Patrick Hand SC', cursive;
                width: 50%;
                left: 0;
                font-size: 25px;
                font-weight: 600;
                border-radius: 24px;
                background-color: #42b983;

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .userHistoryCard {
        position: fixed;
        left: 1550px;
    }

    .userRequestsCard {
        position: fixed;
        left: 1550px;
    }

    .userFriendsCard {
        position: fixed;
        left: 1550px;
    }

    .userHistoryHovered {
        .userHistoryHoveredCard {
            position: fixed;
            top: 275px;
            right: 290px;
            height: 400px;
            width: 300px;
            background-color: white;
            border-style: solid;
            border-color: #1de9b6;
            border-radius: 12px;

            img {
                margin-top: 10px;
                height: 120px;
                border-radius: 12px;
            }

            .userHistoryRanking {
                position: relative;
                left: 55px;
                width: 180px;
                height: 30px;
                font-size: 25px;
                font-weight: 600;
                font-family: 'Patrick Hand SC', cursive;
                
                .userHistoryRankBronze {
                    border-radius: 24px;
                    background-color: #CD7F32;
                }

                .userHistoryRankSilver {
                    border-radius: 24px;
                    background-color: #C0C0C0;
                }

                .userHistoryRankGold {
                    border-radius: 24px;
                    background-color: #FFD700;
                }

                .userHistoryRankPlatinum {
                    border-radius: 24px;
                    background-color: #b19cd9;
                }

                .userHistoryRankDiamond {
                    border-radius: 24px;
                    background-color: #b9f2ff;
                }
            }

            .userHistoryComment {
                margin-top: 15px;
                font-size: 20px;
                font-family: 'Patrick Hand SC', cursive;
            }

            .userHistoryInformation {
                .userHistoryName {
                    font-size: 35px;
                    font-family: 'Patrick Hand SC', cursive;
                }

                .userHistoryTitle {
                    margin-top: -5px;
                    font-size: 25px;
                    font-family: 'Patrick Hand SC', cursive;
                }
            }
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

// Remove the underline from the router button.
a { text-decoration: none;}
</style>
