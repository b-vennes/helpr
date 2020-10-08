<template>
    <div class="commentsContainer">
        <div class="comments" v-for="comment of comments" v-bind:key="comment.id">
            {{comment.description}}
        </div>
    </div>
</template>

<script>
import CommentService from '../services/comment.service.js';

const commentService = new CommentService();

export default {     
    data: function() {
        return {
            comments: []
        }
    },
    props: {
        requestId: Number
    },
    methods: {
        async getCommentsByRequestId() {
            await  commentService.getCommentsByRequestId(this.requestId)
            .then(data => {
                this.comments = data;
            });
        }
    },
    async mounted() {
        await this.getCommentsByRequestId();
    }
}
</script>

<style lang="scss" scoped>
.commentsContainer {
    display: block;

    .comments {
        padding: 16px;
        border-radius: 24px;
        display: block;
        text-align: left;
        font-size: 18px;
        margin-bottom: 15px;
        border-color: #90EE90;
        border-style: solid;
    }
}


</style>