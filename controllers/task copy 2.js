import taskModel from '../models/taskM.js'
import { checkToken } from '../utils/checkAuth.js'
import { createError } from '../utils/error.js'
import { fileDelete, fileUpload, randomKey } from '../utils/fileUploader.js'



export const taskCreate = async (req, res, next) => {
    let imgName, dldName, coverName, gallary1Name, gallary2Name, gallary3Name
    try {
        let imageSave, dldSave, coverSave, gallary1Save, gallary2Save, gallary3Save
        if (req?.files?.image) {
            imgName = randomKey() + req?.files?.image?.name
            dldName = randomKey() + req?.files?.image?.name
            coverName = randomKey() + req?.files?.image?.name
            gallary1Name = randomKey() + req?.files?.image?.name
            gallary2Name = randomKey() + req?.files?.image?.name
            gallary3Name = randomKey() + req?.files?.image?.name

            imageSave = await fileUpload(imgName, req.files.image)
            dldSave = await fileUpload(dldName, req.files.image)
            coverSave = await fileUpload(coverName, req.files.image)
            gallary1Save = await fileUpload(gallary1Name, req.files.image)
            gallary2Save = await fileUpload(gallary2Name, req.files.image)
            gallary3Save = await fileUpload(gallary3Name, req.files.image)

            if (!imageSave, !dldSave, !coverSave, !gallary1Save, !gallary2Save, !gallary3Save) return next(createError(400, "Filied to upload profile please try agin"))
        }
        const newTask = taskModel({
            ...req.body,
            user_id: req.user.id,
            image: imgName,
            dld: dldName,
            coverimage: coverName,
            gallary1: gallary1Name,
            gallary2: gallary2Name,
            gallary3: gallary3Name,
        })
        await newTask.save()
        res.status(200).json({success:true,message:'project Created'})
    } catch (err) {
        next(createError(400, err.message))
    }
}

export const updateTask = async (req, res, next) => {
    let imgName, dldName, coverName, gallary1Name, gallary2Name, gallary3Name, taskUpdate
    try {
        let imageSave, dldSave, coverSave, gallary1Save, gallary2Save, gallary3Save
        if (req?.files?.image) {
            console.log('aaaaaaaaaa')
            imgName = randomKey() + req?.files?.image?.name
            dldName = randomKey() + req?.files?.image?.name
            coverName = randomKey() + req?.files?.image?.name
            gallary1Name = randomKey() + req?.files?.image?.name
            gallary2Name = randomKey() + req?.files?.image?.name
            gallary3Name = randomKey() + req?.files?.image?.name


            imageSave = await fileUpload(imgName, req.files.image)
            dldSave = await fileUpload(dldName, req.files.image)
            coverSave = await fileUpload(coverName, req.files.image)
            gallary1Save = await fileUpload(gallary1Name, req.files.image)
            gallary2Save = await fileUpload(gallary2Name, req.files.image)
            gallary3Save = await fileUpload(gallary3Name, req.files.image)

            if (!imageSave, !dldSave, !coverSave, !gallary1Save, !gallary2Save, !gallary3Save) return next(createError(400,
                        "Filied to upload profile please try agin"))
        }
        const todo = await taskModel.findById(req.params.id);
        if (!todo) {
            return next(createError(404, 'project not found'))
        }

        if (todo.user_id.toString() !== req.user.id.toString()) {
            return next(createError(400,'You are not authorized to update this task'))
        }
        
        taskUpdate = await taskModel.
            findByIdAndUpdate(req.params.id, {
            $set:{
                ...req.body,
                    image: imgName, dld: dldName, coverimage: coverName, gallary1: gallary1Name, gallary2: gallary2Save, gallary3: gallary3Save
            }
            }, { new: false })
        
        if (imageSave, dldSave, coverSave, gallary1Save, gallary2Save, gallary3Save) {
            await fileDelete(taskUpdate?.image);
        }
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
        if (!taskDeleted) {
            return next(createError(404, 'Task not found'));
        }

        if (taskDeleted.image) {
            await fileDelete(taskDeleted.image);
        }

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