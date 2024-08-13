const mongoose = require('mongoose');

    mongoose.connect('mongodb+srv://admin:admin123@cluster0.ymhuljk.mongodb.net/portfolio-message');

   

const userSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
});

const User = mongoose.model("User",userSchema);

module.exports = {
    User
}
