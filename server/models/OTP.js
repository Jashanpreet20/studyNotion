const mongoose=require('mongoose');
const mailSender=require('../utils/mailSender');
const emailTemplate=require('../mail/template/emailVerificationTemplate');
const OTPschema=new mongoose.Schema({
   email:{
    type:String,
    required:true,
   },
   otp:{
    type:String,
    required:true,
   },
   createAt:{
    type:Date,
    default:Date.now(),
    expires:5*60,
   }
})

async function sendVerificationEmail(email,otp){
   try {
      
      const mailresponse= await mailSender(email,"verificationemail from study-ntion",emailTemplate(otp));
      console.log("email sent successfully",mailresponse.response);

   } catch (error) {
      console.log("something wrong in sendverification method",error);
      throw error; 
   }
}


OTPschema.pre("save",async function(next){
   // Only send an email when a new document is created
   if(this.isNew){
      await sendVerificationEmail(this.email,this.otp);
   }
   next();
})



const OTP = mongoose.model("OTP", OTPschema);

module.exports = OTP;