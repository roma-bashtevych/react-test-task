import {FC} from "react";
import {TodoItem} from './TodoItem'
import {ITodo} from "../types/data";

interface ITodoLostProps {
    items: ITodo[],
    toggleTodo: (id: number) => void;
    removeTodo: (id:number) => void;
}


export const TodoList: FC<ITodoLostProps> = (props) => {

    const {items, removeTodo, toggleTodo} = props;

    return (
        <div>
            {
                items.map(item => <TodoItem
                    key={item.id}
                    toggleTodo={toggleTodo}
                    removeTodo={removeTodo}
                    {...item}/>)
            }
        </div>
    )
}
