import taskModel from '../models/taskM.js'
import { checkToken } from '../utils/checkAuth.js'
import { createError } from '../utils/error.js'


export const taskCreate = async (req, res, next) => {
    let imgName
    try {
        let imageSave
        if (req?.files?.image) {
            imgName = randomKey() + req?.files?.image?.name
            imageSave = await fileUpload(imgName, req.files.image)
            if (!imageSave) return next(createError(400, "Filied to upload profile please try agin"))
        }
        const newTask = taskModel({
            ...req.body,
            user_id: req.user.id,
            image: imgName,
            dld: imgName,
            coverimage: imgName,
            gallary1: imgName,
            gallary2: imgName,
            gallary3: imgName,
        })
        await newTask.save()
        res.status(200).json({success:true,message:'Task Created'})
    } catch (err) {
        next(createError(400, err.message))
    }
}

export const updateTask = async (req, res, next) => {
    let imgName, taskUpdate
    try {
        let imageSave
        if (req?.files?.image) {
                    imgName = randomKey() + req?.files?.image?.name
            imageSave = await fileUpload(imgName, req.files.image)
            if (!imageSave) return next(createError(400,
                        "Filied to upload profile please try agin"))
                }
        const todo = await taskModel.findById(req.params.id)

        if (todo.user_id !== req.user.id) {
            return next(createError(400,'You are not autherized'))
        }
        taskUpdate = await taskModel.
            findByIdAndUpdate(req.params.id, {
            $set:{
                ...req.body,
                    image: imgName,
                    dld: imgName,
                    coverimage: imgName,
                    gallary1: imgName,
                    gallary2: imgName,
                    gallary3: imgName,
            }
        }, { new: false })
        if (imageSave)
            await fileDelete(taskUpdate?.image);
        res.status(200).json({success:true,message:'project Upadated'})
    }catch(err){ 
        if (taskUpdate)
            await taskModel.findByIdAndUpdate(req.params.id,
            {
                $set: { ...taskUpdate }
            })
        next(createError(400,err.message))
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const taskDeleted = await userModel.findByIdAndDelete(req.params.id);
        console.log(taskDeleted)
        res.status(200).json({ sucess: true, message: "Deleted project successfully" })
    } catch (err) {
        next(createError(400, err.message))
    }
}

// export const statusInprocess = async (req, res, next) => {
//     try {
//         const inprogressStatus = await taskModel.findByIdAndUpdate(req.params.value,
//             {
//                 $set: {
//                     status: {
//                         incomplete: true,
//                         inprogress: true
//                     }
//                 }
//             },
//         {new:true}
//         )
//         console.log(inprogressStatus)
//         res.status(200).json('status updated')
        
//     } catch (err) {
//         next(createError(400, err.message))
//     }
// }

// export const statusCompleted = async (req, res, next) => {
//     try {
//         const completedStatus = taskModel.findByIdAndUpdate(req.params.value,
//         {
//             $set: {
//                 status: {
//                     completed: true,
//                     inprogress: false,
//                     incomplete: false
//                 }
//             }
//         })
        
//         res.status(200).json('status updated')
        
//     } catch (err) {
//         next(createError(400, err.message))
//     }
// }

export const getTask = async (req, res, next) => {
    try {
        const taskGet = await taskModel.find({user_id:req?.user?.id})
        res.status(200).json({success:true,data:taskGet})
    } catch (err) {
        next(createError(400, err.message))
    }
}