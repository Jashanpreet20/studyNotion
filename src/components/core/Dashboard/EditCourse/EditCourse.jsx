import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../../../../services/operations/CourseDetailApi";
import { setCourse, setEditCourse } from "../../../../slices/CourseSlice";
import RenderSteps from "../AddCourse/RenderSteps";
export default function EditCourse() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const { courseId } = useParams();

  const [loading, setLoading] = useState(false);

  const populateCourseDetails = async () => {
    setLoading(true);

    const result = await getFullDetailsOfCourse(courseId, token);
    if (result?.courseDetails) {
      dispatch(setEditCourse(true));
      dispatch(setCourse(result?.courseDetails));
    }
    setLoading(false);
  };
  useEffect(() => {
    populateCourseDetails();
  }, []);

  return (
    <div>
      <h1>Edit Course</h1>
      <div>{course ? <RenderSteps></RenderSteps> : <p>No course found</p>}</div>
    </div>
  );
}
