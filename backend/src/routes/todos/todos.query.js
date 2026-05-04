const db = require("../../config/db");


function gettodos(req, res) {
    db.query("SELECT * FROM todo", (err, result) => {
        if (err) return res.status(500).json({ msg: "Internal server error" });
        res.status(200).json(result);
    });
}


function todosid(req, res) {
    const { id } = req.params;

    db.query("SELECT * FROM todo WHERE user_id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ msg: "Internal server error" });
        if (result.length === 0) return res.status(404).json({ msg: "Not found" });

        res.status(200).json(result);
    });
}


function posttodos(req, res) {
    const { title, description, due_time, user_id, status } = req.body;

    if (!title || !description || !due_time || !user_id) {
        return res.status(400).json({ msg: "Bad parameter" });
    }

    const validStatuses = ["not started", "todo", "in progress", "done"];
    const todoStatus = status || "not started";

    if (!validStatuses.includes(todoStatus)) {
        return res.status(400).json({ msg: "Bad parameter" });
    }

    db.query(
        "INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)",
        [title, description, due_time, user_id, todoStatus],
        (err, result) => {
            if (err) return res.status(500).json({ msg: "Internal server error" });

            db.query("SELECT * FROM todo WHERE id = ?", [result.insertId], (err2, newTodo) => {
                if (err2) return res.status(500).json({ msg: "Internal server error" });

                res.status(201).json(newTodo[0]);
            });
        }
    );
}


function puttodosid(req, res) {
    const { id } = req.params;
    const { title, description, due_time, user_id, status } = req.body;

    if (!title || !description || !due_time || !user_id || !status) {
        return res.status(400).json({ msg: "Bad parameter" });
    }

    const validStatuses = ["not started", "todo", "in progress", "done"];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ msg: "Bad parameter" });
    }

    db.query(
        "UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?",
        [title, description, due_time, user_id, status, id],
        (err, result) => {
            if (err) return res.status(500).json({ msg: "Internal server error" });

            if (result.affectedRows === 0)
                return res.status(404).json({ msg: "Not found" });

            db.query("SELECT * FROM todo WHERE id = ?", [id], (err2, updated) => {
                if (err2) return res.status(500).json({ msg: "Internal server error" });

                res.status(200).json(updated[0]);
            });
        }
    );
}


function deletetodos(req, res) {
    const { id } = req.params;

    db.query("DELETE FROM todo WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ msg: "Internal server error" });

        if (result.affectedRows === 0)
            return res.status(404).json({ msg: "Not found" });

        res.status(200).json({ msg: `Successfully deleted record number: ${id}` });
    });
}

module.exports = {
    gettodos,
    todosid,
    posttodos,
    puttodosid,
    deletetodos
};
