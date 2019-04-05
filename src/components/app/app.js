import React from 'react';
import './app.css'
import AppHeader from "../app-header/AppHeader";
import SearchPanel from "../search-panel/SearchPanel";
import ItemStatusFilter from "../item-status-filter/ItemStatusFilter";
import TodoList from "../todo-list/TodoList";
import AddItem from "../addItem/AddItem";


export default class App extends React.Component {
    counter = 1;

    state = {
        todoData: [
            this.createTodoItem('drink coffee'),
            this.createTodoItem('lunch'),
            this.createTodoItem('app')],
        term: '',
        filter: 'all' //active, all, done
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.counter++
        }
    }


    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const index = todoData.findIndex((el) => el.id === id);

            const newArr = [
                ...todoData.slice(0, index),
                ...todoData.slice(index + 1)
            ];
            return {
                todoData: newArr
            }
        });
    };

    onItemAdded = (text) => {
        const newEl = this.createTodoItem(text);
        this.setState(({todoData}) => {
            const newArr = [...todoData, newEl];
            return {todoData: newArr}
        });
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, "important")
            }
        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, "done")
            };
        });
    };

    toggleProperty = (arr, id, property) => {
        const index = arr.findIndex((el) => el.id === id);
        const oldItem = arr[index];
        const newItem = {...oldItem, [property]: !oldItem[property]};
        return [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index + 1)
        ];
    };
    onSearchChange = (term) => {
        this.setState({term});
    };

    filter = (items, filter) => {
        switch (filter) {
            case 'active':
                return items.filter(item => !item.done);
            case 'done':
                return items.filter(item => item.done);
            default:
                return items;
        }
    };

    search = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(el => el.label
            .toLowerCase()
            .indexOf(term.toLowerCase()) >= 0);
    };
    onFilterChange = (filter) => {
        this.setState({filter});
    };

    render() {
        const {todoData, term, filter} = this.state;
        const visibleItems = this.filter(
            this.search(todoData, term), filter);
        const doneCount = todoData.filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (

            <div className='todo-app'>
                <AppHeader todo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter}
                                      onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList todos={visibleItems}
                          onDeleted={(id) => this.deleteItem(id)}
                          onToggleImportant={(id) => this.onToggleImportant(id)}
                          onToggleDone={(id) => this.onToggleDone(id)}/>

                <AddItem onItemAdded={(text) => this.onItemAdded(text)}/>
            </div>
        );
    }
};
