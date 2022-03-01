import express from 'express'
import categoryCtrl from '../controllers/categoryCtrl.js'
import auth from '../middleware/auth.js'
import authAdmin from '../middleware/authAdmin.js'

const router = express.Router()

// get : ds loại sản phảm ; post : thêm loại sản phẩm mới
router.route("/category").get(categoryCtrl.getCategories).post(auth, authAdmin, categoryCtrl.createCategory)
    // xóa loại sản phẩm ; sửa loại sản phẩm
router.route("/category/:id").delete(auth, authAdmin, categoryCtrl.deleteCategory).put(auth, authAdmin, categoryCtrl.updateCategory)

export default router