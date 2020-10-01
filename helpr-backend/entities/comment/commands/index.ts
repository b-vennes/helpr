import { CreateCommentHandler } from "./handler/create-comment.handler";
import { IncrementLikesHandler } from "./handler/increment-likes.handler";

export const CommandHandlers = [IncrementLikesHandler, CreateCommentHandler];