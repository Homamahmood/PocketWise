const express = require("express");
const connection = require("./db");
const app= express();
app.use(express.json());
const PORT= 3000;
 
app.get("/", (req,res) =>
{
    res.send("PocketWise API is Running!");
});

app.get("/expenses", (req, res) => {

    connection.query("SELECT * FROM expenses", (err, results) => {

        if (err) {S
            return res.status(500).json({
                message: "Database error"
            });
        }

        return res.json(results);

    });

});

app.post("/expenses", (req, res) => {
    const title = req.body.title;
    const amount = req.body.amount;
    const category = req.body.category;
    const date = req.body.date;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    connection.query(
        "INSERT INTO expenses (title, amount, category, date) VALUES (?, ?, ?, ?)",
        [title, amount, category, date],
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            return res.status(201).json({
    message: "Expense added successfully",
    id: results.insertId
});
        }
    );
});

app.put("/expenses/:id", (req, res) => {
    const expenseId = Number(req.params.id);
    const title = req.body.title;
    const amount = req.body.amount;
    const category = req.body.category;
    const date = req.body.date;

    connection.query(
        "UPDATE expenses SET title = ?, amount = ?, category = ?, date = ? WHERE id = ?",
        [title, amount, category, date, expenseId],
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: "Expense not found"
                });
            }

            return res.status(200).json({
                message: "Expense updated successfully"
            });
        }
    );
});

app.delete("/expenses/:id",(req,res) =>{
    const expenseId=Number(req.params.id);
    connection.query(
    "DELETE FROM expenses WHERE id = ?", 
    [expenseId],
    (err, results) => {
        if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }
    
    if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: "Expense not found"
                });
            }
            return res.status(200).json({
                message: "Expense deleted successfully"
            });
        }
);
    
})

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});