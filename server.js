import express from 'express';
import dbConnection from './db.js';
import User from './model.js';

const app = express();

dbConnection();
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
    console.log(req.method, req.url, req.headers);
    next();
});

// 🔹 GET: Retrieve All Users with Pagination
app.get('/api/get', async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const users = await User.find().skip(skip).limit(limit);
        const total = await User.countDocuments();

        res.json({ success: true, total, page, limit, users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 🔹 GET: Retrieve a User by ID
app.get('/api/get/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid user ID" });

        const user = await User.findOne({ id });
        if (!user) return res.status(404).json({ success: false, message: "User does not exist" });

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 🔹 POST: Add a New User (Prevent Duplicates)
app.post('/api/add', async (req, res) => {
    try {
        const { name, age, college } = req.body;
        if (!name || !age || !college) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const user = new User({ name, age, college });
        await user.save();
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 🔹 PATCH: Update Specific Fields
app.patch('/api/chan/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid user ID" });

        const updates = req.body;
        const user = await User.findOneAndUpdate({ id }, { $set: updates }, { new: true });

        if (!user) return res.status(404).json({ success: false, message: "User does not exist" });

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 🔹 PUT: Complete Update (All Fields Required)
app.put('/api/chan/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid user ID" });

        const { name, age, college } = req.body;
        if (!name || !age || !college) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await User.findOneAndUpdate({ id }, { name, age, college }, { new: true });

        if (!user) return res.status(404).json({ success: false, message: "User does not exist" });

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 🔹 DELETE: Remove a User by ID
app.delete('/api/delete/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid user ID" });

        const user = await User.findOneAndDelete({ id });
        if (!user) return res.status(404).json({ success: false, message: "User does not exist" });

        res.json({ success: true, message: "User deleted successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/',(req,res)=>{
    document.write('api working......')
})

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
