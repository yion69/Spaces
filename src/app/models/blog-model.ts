import { model, models, Schema } from "mongoose";

const BlogSchema = new Schema({
    blog_author: {
        type: String,
        require: true
    },
    blog_title: {
        type: String,
        require: true
    },
    blog_content: {
        type: Object,
        require: true
    },
    blog_tag: {
        type: String,
        require: true
    },
    blog_upvotes: {
        type: Number,
        require: false,
        default: 0
    },
    blog_comments: {
        type: Array,
        require: false,
        default: []
    }
}, { timestamps: true });

export const BlogModel = models.blog || model('blog', BlogSchema)