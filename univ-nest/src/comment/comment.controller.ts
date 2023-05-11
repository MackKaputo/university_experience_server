import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('api/comments')
export class CommentController {
    constructor(private commentService: CommentService){}
    @Get("")
    getComments(){
        return this.commentService.getComments()
    }

    @Post("")
    createComment(@Body() dto:CommentDto){
        return this.commentService.createComment(dto)
    }
}
