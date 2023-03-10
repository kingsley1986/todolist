const mongoose = require("mongoose");
const Todo = require("../models/todolist")
let express = require("express")
var router = express.Router();


// router.post('/create', (req, res) => {
//     const { title, description, date } = req.body;
//     const post = new Todo({ title, description, date });
//     post.save().then(() => {
//       res.redirect("/todos")
//     }).catch((err) => {
//         console.error(err);
//       res.status(500).send(err.message);
//     });
//   });

router.post("/create", async (req, res) => {
    const { title, description, date } = req.body;
  
    try {
      const newTodo = new Todo({
        title,
        description,
        date,
      });
  
      await newTodo.save();
  
      res.send(newTodo);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });
  
  



router.get("/", (req, res) => { 
    Todo.find((error, todos) => { 
        if(error) { 
            console.log(error);
            res.redirect("todolist/new.ejs")
        }else {
            res.render("todolist/index.ejs", {
                todos: todos
            })
        }
    })

})


router.get("/:id/edit", (req, res)  =>{ 
    Todo.findById(req.params.id, (error, todo) => { 
        if(error) {
            res.status(500).send({ error: "Something went wrong" });
        } else {
            res.render("todolist/edit", { 
               todo: todo 
            }, (err, html) => {
                if(err) {
                    res.status(500).send({ error: "Something went wrong" });
                    console.log("Hi")
                } else {
                    res.send(html);
                }
            });
        }
    });
});



// router.post('/:id/update', (req, res) => {

//     Todo.findById((req.params.id), (err, data) => { 

//         data.title = req.body.title 
//         data.description = req.body.description
//         data.date = req.body.date

//         Todo.updateOne({_id: req.params.id}, data).then (() => { 
//             res.redirect("/todos")
//         }).catch((err) => {
//             if(err) {
//                 console.log(err)
//                 res.redirect("/todos/" + req.params.id + "/edit")
//             }

//         })
//     })
// })


router.post('/:id/update', (req, res) => {
    console.log("kdajkdajkdjakj")
    Todo.findById(req.params.id, (err, data) => { 
        data.title = req.body.title 
        data.description = req.body.description
        data.date = req.body.date

        Todo.updateOne({_id: req.params.id}, data).then (() => { 
            Todo.find({}, (err, todos) => {
                if (err) {
                    console.log(err);
                } else {
                    // Return the updated todo list data as HTML
                    res.render('todolist/index', { todos: todos });
                }
            });
        }).catch((err) => {
            if (err) {
                console.log(err);
            }
        });
    });
});




router.delete('/:id/delete', async (req, res) => {
    const articleId = req.params.id;
  
    try {
      // Find and delete the article
      const deletedArticle = await Todo.findByIdAndDelete(articleId);
      res.status(200).json({ message: 'Article deleted successfully', deletedArticle });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router
