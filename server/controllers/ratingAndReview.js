const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose=require("mongoose");
exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;

    const courseDetail = await Course.findOne(
      { _id: courseId },
      { studentsEnrolled: { $elemMatch: { $eq: userId } } }
    );

    if (!courseDetail) {
      return res
        .status(400)
        .json({ success: false, message: "Student is not enrolled in the course" });
    }

    const alreadyReview = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReview) {
      return res
        .status(403)
        .json({ success: false, message: "course is already review" });
    }

    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    const updateCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      { $push: { ratingAndReviews: ratingReview._id } },
      { new: true }
    );

    console.log(updateCourseDetails);

    return res
      .status(200)
      .json({ success: true, message: "rating and review added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "somethong wrong in createRating" });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    // getcourse id
    const courseId = req.body.courseId;
    // calculate average rating

    const result = await RatingAndReview.aggregate([
      {
        $match: { course: mongoose.Types.ObjectId(courseId) },
      },
      {
        $group: { _id: null, averageRating: { $avg: "$rating" } },
      },
    ]);
    // return rating

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: "average rating mil gyi hai",
        averageRating: result[0].averageRating,
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "no rating till now", averageRating: 0 });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "somethong wrong in average rating " });
  }
};

exports.getAllRating = async (req, res) => {
  try {
    const allRating = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({ path: "user", select: "firstName lastName email image" })
      .populate({ path: "course", select: "courseName" })
      .exec();

    return res
      .status(200)
      .json({ success: true, message: "all review fetched", data: allRating });
      
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "somethong wrong in getallrating " });
  }
};
