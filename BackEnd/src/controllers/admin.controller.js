import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Contact } from "../models/contact.model.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  if (!users || users.length === 0) {
    throw new ApiError(404, "NO Users found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users data fetched successfully"));
});

const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  if (!contacts || contacts.length === 0) {
    throw new ApiError(404, "NO Contacts found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, contacts, "User contacts fetched successfully"));
});

const getUserToUpdate = asyncHandler(async(req, res)=>{
  const id = req.params.id;

  const user = await User.findOne({_id:id}).select('-password')

  if(!user){
    throw new ApiError(404, "NO Userfound");
  }
  return res
  .status(200)
  .json(new ApiResponse(200, user, "User Updated successfully"));
})

const updateUser = asyncHandler ( async (req, res) =>{
  const id = req.params.id;

  const updatedUserData = req.body;
  
  const user = await User.updateOne({_id : id}, {
    $set: updatedUserData
  })
  return res
  .status(200)
  .json(new ApiResponse(200, user, "User Updated successfully"));

})

const deleteUser = asyncHandler(async (req, res) =>{

  const id = req.params.id;
  
  const user = await User.deleteOne({_id: id});

  if(!user){
    throw new ApiError(404, "NO User found");
  }
  return res
  .status(200)
  .json(new ApiResponse(200, user, "User Deleted successfully"));
})

const deleteContact = asyncHandler (async (req, res)=>{
    const id = req.params.id;
    const user = await Contact.deleteOne({_id: id});

    if(!user){
      throw new ApiError(404, "NO contact found");
    }
    return res
    .status(200)
    .json(new ApiResponse(200, user, "Contact Deleted successfully"));
})
export { getAllUsers, getAllContacts, deleteUser, getUserToUpdate,updateUser, deleteContact };
