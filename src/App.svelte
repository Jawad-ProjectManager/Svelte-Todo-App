<script>
  import { todos } from "./store.js";

  var todotext = "";
  var selected_category = "";

  var AddTodo = () => {
    if(todotext.length > 1 && selected_category.length > 4) {
      $todos = [...$todos, {
        text: todotext,
        category: selected_category
      }]
      todotext = "";
    }
    else {
      alert("You must select a category and type todo!");
    }
  }

  var DeleteTodo = (todoindex) => {
    $todos.splice(todoindex, 1);
    $todos = $todos;
  }

  var EditTodo = (todoindex) => {
    var newtext = prompt("Enter New Todo Text >> ");

    if(newtext.length > 1) {
      $todos[todoindex].text = newtext;
      $todos = $todos;
    }
  }
</script>

<svelte:head>
  <title>Todo App</title>
</svelte:head>


<div class="container my-5">
  <h2 class="title">What's Up</h2>
  <p class="createtodotext mt-4">Create A Todo</p>
  <p class="whatsonyourtodo mt-1">What's on your todo?</p>
  <form on:submit|preventDefault={() => AddTodo()}>
    <input 
      type="text" 
      class="form-control mt-2 py-2"
      placeholder="e.g. Get some milk"
      bind:value={todotext}
    >

    <p class="whatsonyourtodo mt-4">Pick a category</p>
    <div class="d-flex gap-3 mt-2 flex-wrap">
      <div class="category_card shadow-sm" on:click={() => selected_category = "business"}>
        <div 
          class="blue_category__circle" 
          style="background-color: {selected_category == "business" ? "#96afdb" : "transparent"}"
        >
        </div>
        <p class="category_text">Business</p>
      </div>

      <div class="category_card shadow-sm" on:click={() => selected_category = "personal"}>
        <div 
          class="pink_category__circle"
          style="background-color: {selected_category == "personal" ? "var(--pink-color)" : "transparent"}"
        ></div>
        <p class="category_text">Personal</p>
      </div>
    </div>

    <button type="submit" class="btn mt-4 addtodo_btn">ADD TODO</button>
  </form>

  <p class="mt-4 createtodotext">TODO LIST</p>
  {#if $todos.length > 0}
    {#each $todos as todo,index}
      <div class="todo shadow-sm rounded mt-3">
        {#if todo.category == "personal"}
          <div class="pink_category__circle"></div>
        {:else if todo.category == "business"}
          <div class="blue_category__circle"></div>
        {/if}
        <p class="todo_text">{todo.text}</p>
        <div class="d-flex gap-2">
          <button class="btn edit_button" on:click={() => EditTodo(index)}>Edit</button>
          <button class="btn delete_button" on:click={() => DeleteTodo(index)}>Delete</button>
        </div>
      </div>
    {/each}
  {:else}
    <h5 class="mt-2 text-center">No Todo Found...</h5>
  {/if}
</div>


<style>
  /*
  Text Color: #837f83; 
  card color: #fffdff;
  */

  :root {
    --text-color: #837f83;
    --pink-color: #e840a3;
  }

  p, h2 {
    margin-bottom: 0;
  }

  :global(body) {
    background: #eeedef;
  }

  .container {
    max-width: 550px;
  }

  .title {
    color: #39334a;
    font-weight: bolder;
  }

  .createtodotext {
    font-size: 1.1rem;
    text-transform: uppercase;
    color: var(--text-color);
    font-weight: 400;
  }

  .whatsonyourtodo {
    font-weight: bolder;
    color: var(--text-color);
  }

  .category_card {
    background-color: #fffdff;
    padding: 25px;
    width: 255px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    transition: 0.5s ease-out scale;
    border-radius: 5px;
  }

  .category_card:hover {
    scale: 1.1;
  }

  .blue_category__circle {
    min-width: 25px;
    min-height: 25px;
    width: 25px;
    height: 25px;
    max-width: 25px;
    max-height: 25px;
    background-color: transparent;
    border: 4px solid #96afdb;
    border-radius: 50%;
  }

  .pink_category__circle {
    min-width: 25px;
    min-height: 25px;
    width: 25px;
    height: 25px;
    max-width: 25px;
    max-height: 25px;
    background-color: transparent;
    border: 4px solid var(--pink-color);
    border-radius: 50%;
  }

  .category_text {
    font-size: 1.1rem;
    letter-spacing: 2px;
    margin-top: 15px;
  }

  .addtodo_btn {
    background-color: var(--pink-color);
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    width: 100%;
    padding: 12px 0;
    outline: none;
    border: none;
    transition: 0.5s ease-in-out background-color;
  }

  .addtodo_btn:hover {
    background-color: #c42d85;
  }

  .todo {
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px;
    gap: 10px;
  }

  .todo_text {
    font-size: 1.1rem;
    word-break: break-all;
  }

  .edit_button {
    background-color: var(--pink-color);
    color: white;
    font-weight: 500;
  }

  .delete_button {
    background-color: #f85d5c;
    color: white;
    font-weight: 500;
  }
</style>