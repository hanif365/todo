import React, { useEffect, useState } from 'react';
import './ToDoList.css';
import todoLogo from '../../Assets/Images/todoLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';


// Get Data from Local Storage
const getLocalTasks = () => {
    let tasks = localStorage.getItem('todoTasks');
    // console.log(tasks);

    if (tasks) {
        return JSON.parse(tasks);
    } else {
        return [];
    }

}

const ToDoList = () => {
    const [inputData, setInputData] = useState("");
    const [tasks, setTasks] = useState(getLocalTasks());
    const [completeTask, setCompleteTask] = useState([]);

    // Add Task
    const addTask = () => {
        console.log("Input Data: ", inputData);
        console.log("Tasks: ", tasks);

        // Check if duplicate task in the list. Duplicate task can't be added.
        const duplicate = tasks.includes(inputData);
        console.log(duplicate);

        if (duplicate) {
            alert("This Task Already Exists!");
            setInputData('');

        }
        else if (!inputData) {
            alert("Please input a task!");
            setInputData('');
        }
        else {
            setTasks([...tasks, inputData]);
            setInputData('');
        }
    }

    // Delete Task
    const deleteTask = (id) => {
        // console.log(id);
        const updatedTasks = tasks.filter((element, ind) => {
            return id !== ind;
        })
        // console.log(updatedTasks);

        setTasks(updatedTasks);


    }

    // Clear all Task
    const clearAllTask = () => {
        setTasks([]);
    }

    // Complete Task
    const checkTask = (checkedOrNot, id) => {

        console.log("Complete Task: ", checkedOrNot);
        console.log("Complete Task ID : ", id);

        // const compTasks = tasks.filter((e, i, a) => {
        //     return i === id;
        // })

        // if (checkedOrNot) {
        //     setCompleteTask([...completeTask, compTasks]);
        // } else {
        //     alert("Duplicate");

        // }

    }

    // Store Data in Local Storage
    useEffect(() => {
        localStorage.setItem('todoTasks', JSON.stringify(tasks))
    }, [tasks])





    return (
        <div className='container-fluid py-5 todoContainer'>
            {completeTask}
            <div className="row">
                <div className="col-md-6 bg-light todoDiv m-auto py-5">
                    <div className='text-center'>
                        <figure>
                            <img src={todoLogo} alt="todoLogo" className='todoLogo' />
                        </figure>
                        <figcaption className='todoTitle'>To Do List</figcaption>
                    </div>

                    <div className='d-flex py-5 mx-5'>
                        <input type="text" className="form-control me-3 inputField" placeholder='Add Your New todo' value={inputData} onChange={(e) => setInputData(e.target.value)} />
                        <FontAwesomeIcon icon={faSquarePlus} className='addBtn' onClick={() => addTask()} />
                    </div>

                    <div className='mx-5'>
                        {
                            tasks.map((task, index) => {
                                return (
                                    <div className=' my-2 ' key={index}>
                                        <a href="#" className="list-group-item list-group-item-action list-group-item-primary d-flex justify-content-between show-field"><span><input className="form-check-input" type="checkbox" onChange={(e) => checkTask(e.target.checked, index)}></input> {task}</span> <span><FontAwesomeIcon icon={faPenToSquare} className="inner-fw-edit me-2" /> <FontAwesomeIcon icon={faTrash} className="inner-fw-delete" onClick={() => deleteTask(index)} /> </span></a>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className='mx-5 py-5 d-flex justify-content-between'>
                        <h6>You have {tasks.length - completeTask.length} pending task</h6>
                        <button className='btn btn-danger' onClick={clearAllTask}>Clear All Task</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ToDoList;