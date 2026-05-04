const db = require('../../config/db');
const bcrypt = require("bcryptjs");


function getUser(req, res) {
    const id = req.user.id;

    db.query(
        "SELECT * FROM user WHERE id = ?",
        [id],
        (err, result) => {
            if (err) return res.status(500).json({ msg: "Internal server error" });
            if (result.length === 0) return res.status(404).json({ msg: "Not found" });

            res.status(200).json(result[0]);
        }
    );
}


function getUserTodos(req, res) {
    const id = req.user.id;

    db.query(
        "SELECT * FROM todo WHERE user_id = ?",
        [id],
        (err, result) => {
            if (err) return res.status(500).json({ msg: "Internal server error" });
            res.status(200).json(result);
        }
    );
}


function getUserByIdOrEmail(req, res) {
    const { identifier } = req.params;

    const sql = isNaN(identifier)
        ? "SELECT * FROM user WHERE email = ?"
        : "SELECT * FROM user WHERE id = ?";

    db.query(sql, [identifier], (err, result) => {
        if (err) return res.status(500).json({ msg: "Internal server error" });

        if (result.length === 0)
            return res.status(404).json({ msg: "Not found" });

        res.status(200).json(result[0]);
    });
}


function updateUserById(req, res) {
    const { id } = req.params;
    const { email, password, firstname, name } = req.body;

    if (!email || !password || !firstname || !name) {
        return res.status(400).json({ msg: "Bad parameter" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    db.query(
        `UPDATE user
         SET email = ?, password = ?, firstname = ?, name = ?
         WHERE id = ?`,
        [email, hashedPassword, firstname, name, id],
        (err, result) => {
            if (err) return res.status(500).json({ msg: "Internal server error" });

            if (result.affectedRows === 0)
                return res.status(404).json({ msg: "Not found" });

            db.query("SELECT * FROM user WHERE id = ?", [id], (err2, updated) => {
                if (err2) return res.status(500).json({ msg: "Internal server error" });

                res.status(200).json(updated[0]);
            });
        }
    );
}


function deleteUserById(req, res) {
    const { id } = req.params;

    db.query("DELETE FROM user WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ msg: "Internal server error" });

        if (result.affectedRows === 0)
            return res.status(404).json({ msg: "Not found" });

        res.status(200).json({ msg: `Successfully deleted record number: ${id}` });
    });
}

module.exports = {
    getUser,
    getUserTodos,
    getUserByIdOrEmail,
    updateUserById,
    deleteUserById
};
