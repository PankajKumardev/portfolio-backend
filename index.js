const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = express();
const port = 3000;
const zod = require('zod');
const { User } = require('./db'); 
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const userSchema = zod.object({
    email: zod.string().email(),
    name: zod.string(),
    description: zod.string(),
});

app.post('/', async (req, res) => {
  
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Invalid input data",
            errors: result.error.errors,
        });
    }

    try {

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            description: req.body.description,
        });

        res.status(201).json({
            message: "Message sent successfully",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});

app.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});


app.listen(port);
