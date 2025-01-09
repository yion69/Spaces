import { Schema, model, models } from "mongoose";

const resourceSchema = new Schema({
    resource_author: {
        type: String,
        require: true,
    },
    resource_type: {
        type: String,
        require: true
    },
    resource_tag: {
        type: String,
        require: true
    },
    resource_content: {
        type: Object,
        require: true
    }
}, { timestamps: true })

const ResourceModel = models.new_resource || model('new_resource', resourceSchema);

export default ResourceModel;