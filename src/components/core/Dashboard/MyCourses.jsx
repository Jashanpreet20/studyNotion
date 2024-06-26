import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../slices/AuthSlice";
import { VscAdd } from "react-icons/vsc";
import { fetchInstructorCourses } from "../../../services/operations/CourseDetailApi";
import CourseTable from "./InstructorCourses/CourseTable";
import IconButton from "../../Common/IconButton";
export default function MyCourses() {
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const fetchCourse = async () => {
    setLoading(true);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourse();
  }, []);
  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconButton
          text="Add Courses"
          onclick={() => navigate("/dashboard/add-course")} 
        >
    
          <VscAdd />
        </IconButton>
      </div>
      {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  );
}
