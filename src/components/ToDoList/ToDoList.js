import React, { useState } from 'react';
import './ToDoList.css';
import todoLogo from '../../Assets/Images/todoLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faDeleteLeft, faPenToSquare, faPlus, faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const ToDoList = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState([]);

    // Add Item
    const addItem = () => {
        console.log("Input Data: ", inputData);
        console.log("Items: ", items);

        // Check if duplicate item in the list. Duplicate item can't be added.
        const duplicate = items.includes(inputData);
        console.log(duplicate);
        
        if (!inputData || duplicate) {
            alert("This Item Already Exists!");
            setInputData('');

        } else {
            setItems([...items, inputData]);
            setInputData('');
        }
    }

    // Delete Item
    const deleteItem = (id) => {
        // console.log(id);
        const updatedItems = items.filter((element, ind) => {
            return id !== ind;
        })
        // console.log(updatedItems);

        setItems(updatedItems);
        
        
    }

    // Clear all Item
    const clearAllItem = () => {
        setItems([]);
    }

    console.log(items);

    return (
        <div className='container-fluid py-5 todoContainer'>
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
                        <FontAwesomeIcon icon={faSquarePlus} className='addBtn' onClick={() => addItem()} />
                    </div>

                    <div className='mx-5'>
                        {
                            items.map((item, index) => {
                                return(
                                    <div className=' my-2 ' key={index}>
                                        <a href="#" className="list-group-item list-group-item-action list-group-item-primary d-flex justify-content-between show-field">{item} <span><FontAwesomeIcon icon={faPenToSquare} className="inner-fw-edit me-2" /> <FontAwesomeIcon icon={faTrash} className="inner-fw-delete" onClick={() => deleteItem(index)}/> </span></a>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className='mx-5 py-5 d-flex justify-content-between'>
                        <h6>You have pending task</h6>
                        <button className='btn btn-danger' onClick={clearAllItem}>Clear All Task</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ToDoList;