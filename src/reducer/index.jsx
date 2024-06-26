import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "../slices/AuthSlice";
import CartSlice from "../slices/CartSlice";
import ProfileSlice from "../slices/ProfileSlice";
import CourseSlice from '../slices/CourseSlice';
import ViewCourseSlice from "../slices/ViewCourseSlice";

const rootReducer = combineReducers({
  auth:AuthSlice,
  cart:CartSlice,
  profile:ProfileSlice,
  course:CourseSlice,
  viewCourse:ViewCourseSlice
});

export default rootReducer;
