
var closeFormAndButton = document.getElementById('close-form');

// formIput.style.display = 'none';

closeFormAndButton.style.display = 'none';


var showForm = document.getElementById("show-form");

var TheForm = document.getElementById("form-container-create");

TheForm.style.display = "none"



showForm.addEventListener("click", function (e) {
    TheForm.style.display = "block";

    showForm.style.display = 'none';
    
    closeFormAndButton.style.display = 'block';
})



closeFormAndButton.addEventListener("click", function (e) {
    TheForm.style.display = "none";

    closeFormAndButton.style.display = 'none';
    showForm.style.display = 'block';
})


// add an event listener to the form submit button
// Find the form and add an event listener
const form = document.getElementById("form-container-create");
form.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the values of the input fields
  const title = document.getElementById("titleInput").value;
  const description = document.getElementById("descriptionInput").value;
  const date = document.getElementById("datetimeInput").value;

  // Send a POST request to the server
  $.ajax({
    url: "/todos/create",
    method: "POST",
    data: {
      title,
      description,
      date,
    },
    success: function(newTodo) {
      // Create a new todo item and append it to the DOM
      const todoItem = `
        <div class="todo-item">
          <h3 class="text-${newTodo.color}">${newTodo.title}</h3>
          <p>${newTodo.description}</p>
          <span class="text-secondary">Due on: ${newTodo.date}</span>
        </div>
      `;
      $(".todo-list").append(todoItem);
      
      // Clear the input fields
      form.reset();
    },
    error: function(error) {
      console.log(error);
    }
  });
});

const deleteBtns = document.querySelectorAll('#todo-delete');

deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const articleEl = e.target.parentNode.parentNode;
    fetch(e.target.href, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        articleEl.parentNode.removeChild(articleEl);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  });
});



$(document).ready(function() {
    $('.edit-todo').on('click', function(e) {
      e.preventDefault();
      var url = $(this).attr('href');
      $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
          console.log('Ajax request successful');
          $('#edit-form-container').html(data);
        },
        error: function(xhr, status, error) {
          console.log('Ajax request failed');
          console.log(xhr.responseText);
        }
      });
    });
  });
  
  
  $(document).on('submit', '#edit-todo-form', function(e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    $.ajax({
        type: 'POST',
        url: url,
        data: form.serialize(),
        success: function(data) {
            // Update the todo list in the DOM with the new data
            $('.todo-list').html(data);
        }
    });
});




//   $(document).ready(function() {
//     $('#edit-form-container').submit(function(event) {
//         alert(event)
//       event.preventDefault(); // Prevent the default form submission behavior
  
//       // Make an Ajax post request to the server
//       $.post('/todos/create', $(this).serialize(), function(data) {
//         // Render the new data in the DOM
//         $('.todo-list').html(data);
//       });
//     });
//   });
  