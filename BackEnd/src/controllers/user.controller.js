import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { Contact } from "../models/contact.model.js"


//Register User
const registerUser = asyncHandler(async (req, res) => {
  //Get registraion Data
  const { username, email, phone, password } = req.body;

  //check for validation ->i will do this in another file

  //Check email existence
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User with email already exist");
  }

  //hash password -> already done in user model

  //store data in db
  const user = await User.create({
    username,
    email,
    phone,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, {createdUser, token: await createdUser.generateAccessToken()}, "User registered successfully"));
});

//Login User
const loginUser = asyncHandler(async(req,res) => {
  //  Get user data
     const {email, password} = req.body;


  //  Verify the email existence
    const user = await User.findOne({email})

    if(!user){
    throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = user.isPasswordCorrect(password)

    if(!isPasswordValid){
      throw new ApiError(401, "Invalid User Credentials")
     }
    
    return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {user, token: await user.generateAccessToken()},
        "User logged in Successfully"

      )
    )
})

const user = asyncHandler(async(req, res)=>{
  return res
  .status(200)
  .json(new ApiResponse(200, req.user, "current user fetched successfully"))
})

const contactForm = asyncHandler(async(req, res)=>{
   const response = req.body;

  if(!response){
     throw new ApiError(500, "No message found")
   }
   
   const user = await Contact.create(response);
   return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user,
        "Message send successfully"
      )
    )
})

export { registerUser, loginUser, contactForm, user };
