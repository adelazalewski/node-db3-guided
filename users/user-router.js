const express = require("express")
const db = require("../data/config")
const userModel = require("./user-model")
const { validateUserId } = require("./user-middleware")

const router = express.Router()

router.get("/users", async (req, res, next) => {
	try {
		res.json(await db("users"))
	} catch(err) {
		next(err)
	}
})

router.get("/users/:id", validateUserId(), async (req, res, next) => {
	try {
		res.json(req.user)
	} catch(err) {
		next(err)
	}
})

router.post("/users", async (req, res, next) => {
	try {
		const [id] = await db("users").insert(req.body)
		const user = await db("users").where({ id }).first()

		res.status(201).json(user)
	} catch(err) {
		next(err)
	}
})

router.put("/users/:id", validateUserId(), async (req, res, next) => {
	try {
		const { id } = req.params
		await db("users").where({ id }).update(req.body)
		const user = await db("users").where({ id }).first()
		
		res.json(user)
	} catch(err) {
		next(err)
	}
})

router.delete("/users/:id", validateUserId(), async (req, res, next) => {
	try {
		const { id } = req.params
		await db("users").where({ id }).del()

		res.status(204).end()
	} catch(err) {
		next(err)
	}
})
router.get("/users/:id/posts", async (req, res, next) => {
	try{
		//select * from poata where user_id = ?
const posts = await userModel.findPostByUserId(req.params.id)

res.json(posts)
	}catch(err){
		next(err)
	}
})

module.exports = router
