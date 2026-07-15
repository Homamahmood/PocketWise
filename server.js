const express = require("express");
const app= express();
app.use(express.json());
const PORT= 3000;
const expenses =[
    {"id":1,
    "title":"Buy Chocolate",
    "amount": 300,
    "category":"food",
    "date":"2026-07-12"
    },
{"id":2,
    "title":"Buy Books",
    "amount": 500,
    "category":"good",
    "date":"2026-07-12"
    }

];

app.get("/", (req,res) =>
{
    res.send("PocketWise API is Running!");
});

app.get("/expenses", (req,res)=>{
    res.json(expenses);
});

app.post("/expenses", (req,res) =>{
    const title=req.body.title;
    const amount=req.body.amount;
    const category=req.body.category;
    const date=req.body.date;
    if(!title ||title.trim()===""){
        return res.status(400).json({
            message:"Title is required"
        });
    };
    const newExpense ={
        id:expenses.length+1,
        title,
        amount,
        category,
        date
    };
    expenses.push(newExpense);
    return res.status(201).json({
    message: "Expense added successfully",
    expense: newExpense
});
})

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});