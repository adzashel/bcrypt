const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
const port = 3000;

const users = [

]

app.post('/signup', async (req, res) => {
    const { email , password } = req.body;
    
    const hashed = await bcrypt.hash(password , 13);
    
    const newUser = {
        email,
        password: hashed
    };
    
    users.push(newUser);
    console.log(newUser);
    res.send('OK!');
});

app.post('/login', async (req, res) => {
    const { email , password } = req.body;
    const user = users.find(user => user.email === email);
    if(!user) {
        return res.status(401).send('User not found!');
    }

    const passwordValid = await bcrypt.compare(password , user.password);
    if(!passwordValid) {
        return res.status(401).send('Invalid password!');
    }
    
    res.send('OK!');
})

app.listen(port , () => {
    console.log(`Server running at http://localhost:${port}`);
})