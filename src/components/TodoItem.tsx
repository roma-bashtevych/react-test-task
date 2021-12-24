import {FC} from "react";
import {ITodo} from "../types/data";

interface ITodoItem extends ITodo{
    removeTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
}

export const TodoItem: FC<ITodoItem> = (props) => {
        const {id, title, complete, toggleTodo, removeTodo} = props;
    return (
        <div>
            <input
                type='checkbox'
                checked={complete}
                onChange={() => toggleTodo(id)}
            />
            {title}
            <button
            onClick={() => removeTodo(id)}
            >delete</button>
        </div>
    )
}
