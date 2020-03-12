<!-- most important stuff up top -->

<p align="center">
  <!--a href="https://circleci.com/gh/paperclip/vue/tree/dev">
    <img src="https://img.shields.io/circleci/project/github/paperclip/paperclip/dev.svg" alt="Build Status">
  </a-->
  <a href="https://www.npmjs.com/package/paperclip">
    <img src="https://img.shields.io/npm/l/paperclip.svg" alt="License">
  </a>
  <!-- TODO: change to chat.paperclip.dev -->
  <a href="https://discord.gg/H6wEVtd">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg" alt="Chat">
  </a>
</p>

> ⚠️ Note that Paperclip is currently in Alpha, so expect a few bugs!

# Resources

- [Getting started](./documentation/Getting%20Started)
- [Download the VS Code extension](https://marketplace.visualstudio.com/items?itemName=crcn.paperclip-vscode-extension)
- [Syntax](./documentation/Syntax)
- [Contributing](./documentation/Contributing)
- [Examples](./examples)
  - [React counter](./examples/react-counter)
  - [React TodoMVC](./examples/react-todomvc)
  - [React Calculator](./examples/react-calculator)

<!--

Notes:

- need to express that it's lightweight
-->

# Build UIs in real-time ⚡️

<!-- No more juggling between the coding & debugging in the browser. Paperclip provides tooling that allows  -->

Paperclip is a platform-agnostic language for stylizing components, directly within VS Code.

<!-- Tooling is provided that brings a real-time preview of your application directly into your code editor. -->

<!-- Paperclip is a template language that runs while you're writing in it, so you can see a preview of exactly what you're creating in real-time. -->

<!-- No more wasted time juggling between the browser & code! -->


<!-- Paperclip code runs while you're writing it, so you never have to leave the IDE. UI files also compile down directly to React code. -->

<!-- Write your UIs and see a live preview of them directly within your IDE. Paperclip templates also compile to React code, so you can use them in your React app.  -->

<!-- Paperclip runs while you're writing it, so you never have to leave the IDE. UI files also compile down directly to React code.  -->

<!-- Paperclip code runs while you're writing it, so you can build features more quickly. UIs also compile down to application code, so you can use Paperclip in your existing codebase (currently React). -->


<!-- _See_ UIs that you're creating in real-time, directly within your code editor. Designed to integrate with your existing codebase (currently just React for now). -->

<!--
Templates are also designed to compile down to your application framework of choice (currently only React).
-->

<!-- 
_See_ UIs that you're creating in real-time, directly within your code editor. Paperclip comes with primitive UI behavior that allows you to setup the _bones_ UI 

-->

<!-- Paperclip comes with a runtime for VSCode that shows you a preview of UIs as  -->


<!--  that runs _while_ you write in it, and compiles down to application code in the framework of your choice. -->

![VSCode Demo](https://user-images.githubusercontent.com/757408/75412579-f0965200-58f0-11ea-8043-76a0b0ec1a08.gif)

## Why? 

My biggest problem with UI development over the years has been the _speed_ of creating them. It's a time sink, especially as applications get bigger. And because user interface development is such as iterative process, waiting around for UIs to reload can be a real problem for productivity. 


I built Paperclip as a lightweight approach for ceating presentational components. It's not intended to replace code, but instead allow you to focus on the just the basic construction of your user interfaces, without the heaviness that additional logic brings. This allows Paperclip to be fast, and _remain_ fast as a project grows in size. 

#### Goals


- Shorten the gap between design -> code by bringing more design tooling into web development.
- Provide safety around building user interfaces, especially for large projects. This is helped with type safety, and visual regression tooling. 
- Have a platform & language agnostic approach for building user interfaces. 

<!-- #### Non-goals

- Turring-completeness. Paperclip will only provide features for expressing_ user interfaces that can be used in code. -->

## Features ✨

- Just covers presentational components.
- Real-time previews in VS Code (more code editors to come).
- Super fast, even for large codebases. 
- Templates compile to plain, strongly typed code. No library necessary!
- Works with Webpack.

## What does a template look like?

```html
<!-- todo-list.pc -->

<!--
Styles are scoped to this file, so you don't have to worry about them leaking out.
-->

<style>
  * {
    font-family: Helvetica;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  li[data-done] {
    text-decoration: line-through;
  }
</style>

<!-- Parts are building blocks that are individually used in application code (more information below). -->
<li export component as="TodoItem" data-done={done}>
  <input type="checkbox" checked={done} onClick={onDoneClick}>

  <!-- You can also define slots where text & elements are inserted into. -->
  {label}
</li>

<fragment export component as="TodoList">
  <h1>Todos:</h1>
  <input type="text" onKeyPress={onNewTodoKeyPress} placeholder="Add a new todo..." >
  <ul>
    {todoItems}
  </ul>
</fragment>

<!-- 
  This renders a preview of TodoLis
 -->
<TodoList todoItems={<fragment>
  <TodoItem label="Feed cat" done />
  <TodoItem label="Take out trash" />
  <TodoItem label="Walk dog" done />
</fragment>} />
```

> ☝🏻This example uses just about all of the features that Paperclip has to offer. No logic, just syntax for describing how your UI looks. 

Here's what you see in VS Code as you type away:

![Simple todo preview](https://user-images.githubusercontent.com/757408/75791302-ff866580-5d31-11ea-8da9-1c43631f0626.gif)


## How do I add logic? 

Templates compile directly to highly optimized code. For example:

<!-- Using our list example above, here's how you might use it in a React app: -->

```javascript

// <part /> elements are exposed as React components.
import { TodoList, TodoItem } from "./list.pc";
import React, { useState } from "react";

export default () => {
  const [todos, setTodos] = useState([
    { label: "Clean car" },
    { label: "Eat food", done: true },
    { label: "Sell car" }
  ]);

  const onNewInputKeyPress = (event) => {
    if (event.key === "Enter" && value) {
      setTodos([...todos, { label: event.target.value }]);
      event.target.value = "";
    }
  };

  const onDoneClick = (todo: Todo) => {
    setTodos(
      todos.map(oldTodo => {
        return oldTodo.id === todo.id
          ? {
              ...oldTodo,
              done: !oldTodo.done
            }
          : oldTodo;
      })
    );
  };

  // The attribute bindings & slots that were defined are
  // exposed as props for each <part /> component.
  return (
    <TodoList
      onNewTodoKeyPress={onNewInputKeyPress}
      todoItems={todos.map(todo => {
        return (
          <TodoItem
            done={todo.done}
            onDoneClick={() => onDoneClick(todo)}
            label={todo.label}
            key={todo.id}
          />
        );
      })}
    />
  );
};
```

> The code for this example is also [here](./examples/react-simple-todo-list).

> More compiler targets are planned for other languages and frameworks. React is just a starting point ✌🏻.

<!-- 
As you might have noticed, Paperclip just exports building blocks for your component. All of the logic remains in your application code, so you don't have to worry about  -->

## Strongly typed 🦺

Templates compile down to strongly typed code. Here's a generated TypesScript definition of our React app above:

```typescript
import {ReactNode, ReactHTML, Factory, InputHTMLAttributes, ClassAttributes} from "react";

type ElementProps = InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement>;

export declare const styled: (tag: keyof ReactHTML | Factory<ElementProps>, defaultProps?: ElementProps) => Factory<ElementProps>;

type TodoItemProps = {
  done: String | boolean | Number | Object | ReactNode,
  onDoneClick: Function,
  label: String | boolean | Number | Object | ReactNode,
};

export const TodoItem: Factory<TodoItemProps>;

type TodoListProps = {
  onNewTodoKeyPress: Function,
  todoItems: String | boolean | Number | Object | ReactNode,
};

export const TodoList: Factory<TodoListProps>;
```

<!-- ### What makes Paperclip special?

Paperclip's syntax allows you to express _most_ of you user interface in a "dumb" way. -->


<!-- The current process around developing UIs is incredibly slow, especially as codebases scale. Paperclip was created -->


<!--UI development is a bit slow & inneficient, especially as projects scale, and code complexity kicks in. So I developed Paperclip to be a lightweight, and fast alternative for creating UIs that helps get the job done faster. 

The template language is limited -->

<!--

Points:

- lightwight
- bones of the UI

-->


## Roadmap 🌄

This is just the beginning! Here are just a few planned features:

- Minimal setup automated visual regression testing. Just plug in your Paperclip files.
- More compiler targets: Ruby, PHP, VueJS, AngularJS, and others.
- More code editor integrations: Sublime, Atom.
- More visual tooling in the preview, so you can make visual changes directly.
- Preview against different browsers directly within your code editor.
