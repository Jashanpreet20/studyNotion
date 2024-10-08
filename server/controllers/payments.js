const { mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {paymentSuccessEmail} =require('../mail/template/paymentSuccessEmail');
const {courseEnrollmentEmail} =require('../mail/template/courseEnrollmentEmail')
const crypto=require('crypto')
const CourseProgress =require('../models/CourseProgess');

  
  exports.capturePayment = async(req, res) => {

    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0) {
        return res.json({success:false, message:"Please provide Course Id"});
    }

    let totalAmount = 0;

    for(const course_id of courses) {
        let course;
        try{
           
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(200).json({success:false, message:"Could not find the course"});
            }

            const uid  = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({success:false, message:"Student is already Enrolled"});
            }

            totalAmount += course.price;
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }

}


//verify the payment
exports.verifySignature = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature) {
            //enroll karwao student ko
            await enrollStudents(courses, userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        return res.status(200).json({success:"false", message:"Payment Failed"});

}


const enrollStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(500).json({success:false,message:"Course not Found"});
        }

        const courseProgress = await CourseProgress.create({
            courseId:courseId,
            userId:userId,
            completedVideos: [],
        })


        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                courses: courseId,
                courseProgress: courseProgress._id,
            }},{new:true})
            
        ///bachhe ko mail send kardo
        const emailResponse = await mailSender(
            enrollStudents.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
        )    
        //console.log("Email Sent Successfully", emailResponse.response);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.firstName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}

// exports.capturePayment = async (req, res) => {
//   try {
//     // get courseid and userid
//     const { courseId } = req.body;
//     const userId = req.user.id;
//     // validation
//     // valid courseid
//     if (!courseId) {
//       return res
//         .statsu(401)
//         .json({ success: false, message: "provide valid course id" });
//     }

//     // valid coursedetail
//     let course;
//     try {
//       course = await Course.findById(courseId);
//       if (!course) {
//         return res
//           .statsu(401)
//           .json({ success: false, message: "could not find course details" });
//       }

//       // user already pay for the same course
//       const uid = new mongoose.Types.ObjectId(userId); // convert string into object id
//       if (Course.studentsEnrolled.includes(uid)) {
//         return res
//           .status(200)
//           .json({ success: false, message: "student is already enrolled" });
//       }

//       // order create

//       const amount = Course.price;
//       const currency = "INR";

//       const options = {
//         amount: amount * 100,
//         currency: currency,
//         reciept: Math.random(Date.now()).toString(),
//         notes: {
//           courseId: courseId,
//           userId,
//         },
//       };

//       // initiate the payment usinr razorpay

//       const payment = await instance.orders.create(options);
//       console.log(payment);

//       res.status(200).json({
//         success: true,
//         message: "created order",
//         courseName: Course.courseName,
//         courseDescription: Course.courseDescription,
//         thumnail: Course.thumnail,
//         orderId: payment.id,
//         currency: payment.currency,
//         amount: payment.amount,
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: "something wrong in capture payment",
//       });
//     }
//     //
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "something wrong in capture payment" });
//   }
// };

// // verify signatute

// exports.verifySignature = async (req, res) => {
//   try {
//     const webHookSecret = "12345678";
//     const signatute = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webHookSecret);
//     shasum.update(JSON.stringify(req.body));

//     const digest = shasum.digest("hex");

//     if (signatute === digest) {
//       console.log("payment is authorized");

//       const { courseId, userId } = req.body.payload.payment.entity.notes;
//       try {
//         // find the course and student ko enroll krdo
//         const enrolledCourse = await Course.findByIdAndUpdate(
//           { _id: courseId },
//           { $push: { studentsEnrolled: userId } },
//           { new: true }
//         );

//         if (!enrolledCourse) {
//           return res
//             .status(500)
//             .json({ success: false, message: "failed in enrolled course" });
//         }

//         console.log(enrolledCourse);

//         // find the student course update krdo list hai enrolled list hai student ki
//         const enrolledStduent = await User.findOneAndReplace(
//           { _id: userId },
//           { $push: { courses: courseId } },
//           { new: true }
//         );

//         // mail krdo student ko confirmation mail
//         const mailResponse = await mailSender(
//           enrolledStduent.email,
//           "congrats",
//           "congrats"
//         );
//         console.log(mailResponse);

//         return res
//           .status(200)
//           .json({
//             success: false,
//             message: "course added and signature verified",
//           });
//       } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//           success: false,
//           message: "something wrong in signauture verify",
//         });
//       }
//     }else{
//       return res.status(500).json({
//         success: false,
//         message: "signaute does not match with digest",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "something wrong in signauture verify",
//     });
//   }
// };
