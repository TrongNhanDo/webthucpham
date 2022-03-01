import Category from '../models/categoryModel.js'

const categoryCtrl = {
    getCategories: async(req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    createCategory: async(req, res) => {
        try {
            // chỉ có admin mới có quyền thêm mới loại sản phẩm
            const { name } = req.body
            const category = await Category.findOne({ name })
            if (category) return res.status(400).json({ msg: "This category already exists!" })
            const newCategory = new Category({ name })

            await newCategory.save()
            res.json({ msg: "Created a new category" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteCategory: async(req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a category" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updateCategory: async(req, res) => {
        try {
            const { name } = req.body
            await Category.findByIdAndUpdate({ _id: req.params.id }, { name })

            res.json({ msg: "Updated a category!" })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

export default categoryCtrl