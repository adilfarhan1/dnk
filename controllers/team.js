import teamModel from '../models/teamM.js'
import { createError } from '../utils/error.js'
import { fileDelete, profileUpload, randomKey } from '../utils/fileUploader.js'

export const teamCreate = async (req, res, next) => {
    let employeImage
    try {
        let profileSave
        if (req?.files?.image) {
            employeImage = randomKey() + req?.files?.image?.name
            profileSave = await profileUpload(employeImage, req.files.image)
            if (!profileSave)
                return next(createError(400, "Filied to upload profile please try agin"))
        }
        const newTeam = teamModel({
            ...req.body,
            user_id: req.user.id,
            image: employeImage,
        })
        await newTeam.save()
        res.status(200).json({ success: true, message: 'Task Created' })
    } catch (err) {
        next(createError(400, err.message))
    }
};

export const updateTeam = async (req, res, next) => {
    let employeImage, teamUpdated
    try {
        let profileSave
        if (req?.files?.image) {
            employeImage = randomKey() + req?.files?.image?.name
            profileSave = await profileUpload(employeImage, req.file.image)
            if (!profileSave) return next(createError(400,
                "Filied to upload profile please try agin"
            ))

            teamUpdated = await teamModel.
                findByIdAndUpdate(req, user.id,
                    {
                        $set: {
                            ...req.body, image: employeImage
                        }
                    }, { new: false })
            if (profileSave)
                await fileDelete(teamUpdated?.image);

            res.status(200).json({ success: true, message: 'User upadated' })
        }

    } catch (err) {
        if (teamUpdated)
            await teamModel.findByIdAndUpdate(req.res.id,
                {
                    $set: {
                        ...teamUpdated
                    }
                })
        next(createError(400, err.message))

    }
};

export const deleteTeam = async (req, res, next) => {
    try {
        const teamDeleted = await teamModel.findByIdAndDelete(req.params.id);
        console.log(teamDeleted);
        res.status(200).json({ success: true, message: "Deleted user successfully" });
    } catch (err) {
        next(createError(400, err.message))
    }
};

export const getTeam = async (req, res, next) => {
    try {
        const teamGet = await teamModel.find({ user_id: req?.user?.id })
        res.status(200).json({ success: true, data: teamGet })
    } catch (err) {
        next(createError(400, err.message))
    }

}


export const getTeamById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const team = await teamModel.findById(id);

        if (!team) {
            return next(createError(404, 'Team not found'))
        }

        res.status(200).json({ success: true, data: team });
    
    } catch (err) {
        
        next(createError(400, err.message))
    
    }
}