const User = require('../../models/users/user')
const {Admin} = require('../../models/users/admin')


const controllerUser = {

        create: async (req, res) => {
        try {
            const {userName,userImg,email,password,admin , typEntitySocialActor, companyNameOrentity, phoneNumber, years, ethnicity, person} = req.body
            const adminFound = await Admin.find({ name: { $in: admin } })

            const user = new User({
                userName,
                userImg,
                email,
                password,
                typEntitySocialActor,
                companyNameOrentity,
                phoneNumber,
                years,
                ethnicity,
                person,
                admin: adminFound.map((admins) => admins._id)
            })

            user.password = await User.encryptPassword(user.password)

            const savedUser = await user.save()

            return res.status(200).json({
                _id: savedUser._id,
                userName: savedUser.userName,
                email: savedUser.email,
                password: savedUser.password,
                roles: savedUser.roles,
            })

        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },

    getUser: async (req, res) => {
        try {
            const users = await User.find({})
            res.json(users.reverse())
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },

    getUserById: async (req, res) => {
        try {
            const { id } = req.params
            const user = await User.findById(id)
            res.json(user)
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },

    updateUser: async (req, res) => {
        try {
            const { id } = req.params
            const updateData = req.body
            await User.findByIdAndUpdate(id,updateData)
            res.status(200).json({ msg: 'update' })
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params
            await User.findByIdAndDelete(id)
            res.json({ msg: 'Delete' })
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    }
}

module.exports = controllerUser
