import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailSideBar";
import { getFullDetailsOfCourse } from "../services/operations/CourseDetailApi";
import {
  setCourseSectionData,
  setEntireCourseData,
  setCompletedLectures,
  setTotalNoOfLectures,
} from "../slices/ViewCourseSlice";

export default function ViewCourse() {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseData = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      console.log("data", courseData);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));

      let lectures = 0;

      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });

      dispatch(setTotalNoOfLectures(lectures));
    };

    setCourseData();
  }, []);

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)] ">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}
