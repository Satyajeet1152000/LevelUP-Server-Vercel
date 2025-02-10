import mongoose, { Document, Schema } from 'mongoose';

// Interface for Course
export interface ICourse extends Document {
    courseName: string;
    category: string;
}

// Schema for Course
const CourseSchema: Schema = new Schema(
    {
        courseName: {
            type: String,
            required: [true, 'Course name is required'],
            unique: true,
            trim: true,
            maxlength: [50, 'Course name cannot exceed 50 characters'],
        },

        category: {
            type: String,
            enum: {
                values: ['coding', 'dsa', 'csbt'],
                message: 'Category is not valid',
            },
            required: [true, 'Category is required'],
            trim: true,
        },
    },
    { timestamps: true }
);

//a unique index for courseName
CourseSchema.index({ courseName: 1 }, { unique: true });

const Course = mongoose.model<ICourse>('Course', CourseSchema);

export default Course;
