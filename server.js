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

app.put("/expenses/:id",(req,res)=>{
    const expenseId=Number(req.params.id);
    const expense=expenses.find(expense=>expense.id===expenseId);
    const title = req.body.title;
    const amount = req.body.amount;
    const category = req.body.category;
    const date = req.body.date;
    if (!expense) {
    return res.status(404).json({
        message: "Expense not found"
    });
} 
    expense.title = title;
    expense.amount = amount;
    expense.category = category;
    expense.date = date;

    return res.status(200).json({
         message: "Expense updated successfully",
         expense
         

   
}); 
})

app.delete("/expenses/:id",(req,res) =>{
    const expenseId=Number(req.params.id);
    const index=expenses.findIndex(expense => expense.id === expenseId);
    if(index===-1){
        return res.status(404).json({
            message:"Expense not found"
        });
    }
    expenses.splice(index,1);
    return res.status(200).json({
        message:"Expense Deleted Successfully",
        

    });
    
})

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});