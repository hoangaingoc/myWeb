const fs = require('fs');
const filePath = 'users.json';

const readFile = () => {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    }
    return [];
};

const writeFile = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

const register = (username, password, dob, image) => {
    const users = readFile();
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return {success: false, message: 'Username already exists'};
    }

    const user = {username, password, dob, image};
    users.push(user);
    writeFile(users);

    return {success: true, user};
};

const login = (username, password) => {
    const users = readFile();
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        return {success: true, message: 'Success', data: user};
    }
    return {success: false, message: 'Invalid credentials'};
};
const resetPassword = (username) => {
    const users = readFile();
    const user = users.find(user => user.username === username);

    if (!user) {
        return {success: false, message: 'Username not found'};
    }

    user.password = '123456'; // Đặt lại mật khẩu
    writeFile(users);

    return {success: true, message: 'Password reset successful', newPassword: '123456'};
};

const updateUser = (username, newData) => {
    const users = readFile();
    const userIndex = users.findIndex(user => user.username === username);

    if (userIndex === -1) {
        return {success: false, message: 'User not found'};
    }

    users[userIndex] = {...users[userIndex], ...newData};
    writeFile(users);

    return {success: true, user: users[userIndex]};
};

const getAllUsers = () => {
    return readFile(); // Returns all users from the JSON file
};

// Get a user by username
const getUserByUsername = (username) => {
    const users = readFile();
    const user = users.find(user => user.username === username);
    return user || null; // Returns null if no user is found
};

module.exports = {
    register,
    login,
    resetPassword,
    updateUser,
    getAllUsers,     // Export the new function
    getUserByUsername // Export the new function
};
