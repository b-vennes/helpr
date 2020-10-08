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