'use client';

import React, { useState } from 'react';
import RowsPerPageSelect from '../../DropDown/RowsPerPageSelect';
import BudgetStatusPills, { BudgetStatus } from '../../StatusPills/BudgetStatusPills/page';

// Define the data type with proper typing
interface TaskItem {
    id: string;
    taskTitle: string;
    taskDescription: string;
    timeDue: string;
    deadline: string;
    assignedStaff: string;
    currentStatus: string;
}

interface PrepsheetData {
    id?: string;
    prepSheetName: string;
    dueDate: string;
    dueTime: string;
    assignedTo: string;
    description: string;
}

interface PaginationProps {
    onEditTask?: (data: PrepsheetData) => void;
}

function Pagination({ onEditTask }: PaginationProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    // Updated data structure to match the task management interface
    const taskData: TaskItem[] = [
        {
            id: '1',
            taskTitle: 'Pizza Sauce Preparation',
            taskDescription: 'Prepare fresh tomato sauce and seasonings for optimal flavor.',
            timeDue: '1:30 AM',
            deadline: '30 August 2025',
            assignedStaff: 'Kitchen Team',
            currentStatus: 'Finished'
        },
        {
            id: '2',
            taskTitle: 'Cheese Shredding',
            taskDescription: 'Shred mozzarella and other cheese varieties for pizza topping.',
            timeDue: '2:00 AM',
            deadline: '30 August 2025',
            assignedStaff: 'Kitchen Team',
            currentStatus: 'Pending'
        },
        {
            id: '3',
            taskTitle: 'Topping Arrangement',
            taskDescription: 'Organize toppings such as pepperoni, vegetables, and herbs.',
            timeDue: '2:30 AM',
            deadline: '30 August 2025',
            assignedStaff: 'Kitchen Team',
            currentStatus: 'Ongoing'
        },
        {
            id: '4',
            taskTitle: 'Dough Ball Portioning',
            taskDescription: 'Divide the ready dough into individual portions for easy handling.',
            timeDue: '3:00 AM',
            deadline: '30 August 2025',
            assignedStaff: 'Kitchen Team',
            currentStatus: 'Pending'
        },
        {
            id: '5',
            taskTitle: 'Oven Preheating',
            taskDescription: 'Preheat the oven to the optimal temperature for baking pizzas.',
            timeDue: '3:30 AM',
            deadline: '30 August 2025',
            assignedStaff: 'Kitchen Team',
            currentStatus: 'Finished'
        },
        {
            id: '6',
            taskTitle: 'Pizza Assembly',
            taskDescription: 'Assemble pizzas by layering sauce, cheese, and toppings.',
            timeDue: '4:00 AM',
            deadline: '30 August 2025',
            assignedStaff: 'Kitchen Team',
            currentStatus: 'Pending'
        },
        {
            id: '7',
            taskTitle: 'Baking Pizzas',
            taskDescription: 'Place assembled pizzas in the oven and monitor baking time.',
            timeDue: '4:30 AM',
            deadline: '30 August 2025',
            assignedStaff: 'Kitchen Team',
            currentStatus: 'Pending'
        },
        {
            id: '8',
            taskTitle: 'Pizza Quality Check',
            taskDescription: 'Check baked pizzas for quality and presentation before serving.',
            timeDue: '5:00 AM',
            deadline: '30 August 2025',
            assignedStaff: 'Kitchen Team',
            currentStatus: 'Ongoing'
        },
        {
            id: '9',
            taskTitle: 'Serving Preparation',
            taskDescription: 'Cut and prepare pizzas for serving to customers.',
            timeDue: '5:30 AM',
            deadline: '30 August 2025',
            assignedStaff: 'Kitchen Team',
            currentStatus: 'Over Budget'
        }
    ];

    const totalPages = Math.ceil(taskData.length / rowsPerPage);
    const paginatedData = taskData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );



    return (
        <>
            <div className="bg-white rounded-lg shadow">

                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <div className="relative w-1/3">
                        {/* Search Icon */}
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_2896_16250)">
                                    <path
                                        d="M17.8045 16.8625L13.8252 12.8831C14.9096 11.5569 15.4428 9.86453 15.3144 8.15617C15.1861 6.44782 14.406 4.85415 13.1356 3.70481C11.8652 2.55547 10.2016 1.93839 8.48895 1.98121C6.77632 2.02404 5.14566 2.72348 3.93426 3.93487C2.72287 5.14627 2.02343 6.77693 1.9806 8.48956C1.93778 10.2022 2.55486 11.8658 3.7042 13.1362C4.85354 14.4066 6.44721 15.1867 8.15556 15.315C9.86392 15.4434 11.5563 14.9102 12.8825 13.8258L16.8619 17.8051C16.9876 17.9266 17.156 17.9938 17.3308 17.9922C17.5056 17.9907 17.6728 17.9206 17.7964 17.797C17.92 17.6734 17.9901 17.5062 17.9916 17.3314C17.9932 17.1566 17.926 16.9882 17.8045 16.8625ZM8.66652 14.0005C7.61169 14.0005 6.58054 13.6877 5.70348 13.1016C4.82642 12.5156 4.14283 11.6826 3.73916 10.7081C3.3355 9.73357 3.22988 8.66122 3.43567 7.62665C3.64145 6.59208 4.14941 5.64178 4.89529 4.8959C5.64117 4.15002 6.59147 3.64206 7.62604 3.43628C8.6606 3.23049 9.73296 3.33611 10.7075 3.73977C11.682 4.14344 12.515 4.82703 13.101 5.70409C13.6871 6.58115 13.9999 7.6123 13.9999 8.66713C13.9983 10.0811 13.4359 11.4368 12.436 12.4366C11.4362 13.4365 10.0805 13.9989 8.66652 14.0005Z"
                                        fill="#727A90"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2896_16250">
                                        <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>

                        {/* Input field */}
                        <input
                            type="text"
                            placeholder="Search for tasks..."
                            className="w-full h-9 lg:h-10 pl-7 sm:pl-9 pr-3 rounded-lg border border-[#E9EAEA] bg-white text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#E9EAEA]"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <>
                        <button
                                    type="button"
                                    className="inline-flex h-8 items-center gap-2 rounded-lg border border-gray-200 bg-white cursor-pointer px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_3627_24002)">
                                            <path d="M2 14.667C2.00106 15.5507 2.35259 16.398 2.97748 17.0228C3.60237 17.6477 4.4496 17.9993 5.33333 18.0003H14.6667C15.5504 17.9993 16.3976 17.6477 17.0225 17.0228C17.6474 16.398 17.9989 15.5507 18 14.667V8.66699H2V14.667ZM13.3333 11.667C13.5311 11.667 13.7245 11.7256 13.8889 11.8355C14.0534 11.9454 14.1815 12.1016 14.2572 12.2843C14.3329 12.467 14.3527 12.6681 14.3141 12.8621C14.2755 13.0561 14.1803 13.2342 14.0404 13.3741C13.9006 13.514 13.7224 13.6092 13.5284 13.6478C13.3344 13.6864 13.1334 13.6666 12.9507 13.5909C12.7679 13.5152 12.6117 13.387 12.5019 13.2226C12.392 13.0581 12.3333 12.8648 12.3333 12.667C12.3333 12.4018 12.4387 12.1474 12.6262 11.9599C12.8138 11.7723 13.0681 11.667 13.3333 11.667ZM10 11.667C10.1978 11.667 10.3911 11.7256 10.5556 11.8355C10.72 11.9454 10.8482 12.1016 10.9239 12.2843C10.9996 12.467 11.0194 12.6681 10.9808 12.8621C10.9422 13.0561 10.847 13.2342 10.7071 13.3741C10.5673 13.514 10.3891 13.6092 10.1951 13.6478C10.0011 13.6864 9.80004 13.6666 9.61732 13.5909C9.43459 13.5152 9.27841 13.387 9.16853 13.2226C9.05865 13.0581 9 12.8648 9 12.667C9 12.4018 9.10536 12.1474 9.29289 11.9599C9.48043 11.7723 9.73478 11.667 10 11.667ZM6.66667 11.667C6.86445 11.667 7.05779 11.7256 7.22224 11.8355C7.38669 11.9454 7.51486 12.1016 7.59055 12.2843C7.66623 12.467 7.68604 12.6681 7.64745 12.8621C7.60887 13.0561 7.51363 13.2342 7.37377 13.3741C7.23392 13.514 7.05574 13.6092 6.86176 13.6478C6.66778 13.6864 6.46671 13.6666 6.28398 13.5909C6.10126 13.5152 5.94508 13.387 5.8352 13.2226C5.72532 13.0581 5.66667 12.8648 5.66667 12.667C5.66667 12.4018 5.77202 12.1474 5.95956 11.9599C6.1471 11.7723 6.40145 11.667 6.66667 11.667Z" fill="#727A90" />
                                            <path d="M14.6667 3.33333H14V2.66667C14 2.48986 13.9298 2.32029 13.8047 2.19526C13.6797 2.07024 13.5101 2 13.3333 2C13.1565 2 12.987 2.07024 12.8619 2.19526C12.7369 2.32029 12.6667 2.48986 12.6667 2.66667V3.33333H7.33333V2.66667C7.33333 2.48986 7.2631 2.32029 7.13807 2.19526C7.01305 2.07024 6.84348 2 6.66667 2C6.48986 2 6.32029 2.07024 6.19526 2.19526C6.07024 2.32029 6 2.48986 6 2.66667V3.33333H5.33333C4.4496 3.33439 3.60237 3.68592 2.97748 4.31081C2.35259 4.93571 2.00106 5.78294 2 6.66667L2 7.33333H18V6.66667C17.9989 5.78294 17.6474 4.93571 17.0225 4.31081C16.3976 3.68592 15.5504 3.33439 14.6667 3.33333Z" fill="#727A90" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3627_24002">
                                                <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span className="whitespace-nowrap text-xs text-[#727A90]">July 2024</span>
                                </button>
                            <RowsPerPageSelect
                                rowsPerPage={rowsPerPage}
                                setRowsPerPage={(val) => {
                                    setRowsPerPage(val);
                                    setCurrentPage(1);
                                }}
                            />



                        </>
                    </div>
                </div>
                <div className="bg-white overflow-x-auto custom-Horizontalscroll pb-8">

                    <table className="w-full min-w-[1000px] text-sm text-left whitespace-nowrap">
                        <thead className="bg-white text-xs text-gray-500 font-normal tracking-wider">
                            <tr>
                                {/* Column Headers */}
                                {['Task Title', 'Task Description', 'Time Due', 'Deadline', 'Assigned Staff', 'Current Status', 'Options'].map((header) => (
                                    <th key={header} className="px-4 py-4">
                                        <div className="flex justify-between items-center w-full">
                                            <span className='text-xs text-[#727A90] '>{header}</span>
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.81063 6.75H13.1896C13.3379 6.75003 13.4829 6.79404 13.6062 6.87645C13.7295 6.95886 13.8256 7.07598 13.8824 7.21301C13.9391 7.35003 13.954 7.50081 13.9251 7.64627C13.8961 7.79174 13.8247 7.92536 13.7199 8.03025L9.53038 12.2197C9.38974 12.3603 9.199 12.4393 9.00013 12.4393C8.80126 12.4393 8.61053 12.3603 8.46988 12.2197L4.28038 8.03025C4.17552 7.92536 4.10412 7.79174 4.07519 7.64627C4.04627 7.50081 4.06112 7.35003 4.11787 7.21301C4.17463 7.07598 4.27073 6.95886 4.39404 6.87645C4.51734 6.79404 4.66232 6.75003 4.81063 6.75Z"
                                                    fill="#8E95A6"
                                                />
                                            </svg>
                                        </div>
                                    </th>
                                ))}

                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.map((item, i) => (
                                <tr
                                    key={i}
                                    className={`border-t border-gray-100 ${i % 2 === 1 ? 'bg-[#f8f8fc]' : 'bg-white'
                                        }`}
                                >
                                    <td className="px-4 py-4">{item.taskTitle}</td>
                                    <td className="px-4 py-4">{item.taskDescription}</td>
                                    <td className="px-4 py-4">{item.timeDue}</td>
                                    <td className="px-4 py-4">{item.deadline}</td>
                                    <td className="px-4 py-4 text-[#686F83]">{item.assignedStaff}</td>
                                    <td className="px-4 py-4">
                                        <BudgetStatusPills status={item.currentStatus as BudgetStatus} />
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center justify-start space-x-2">
                                            {/* Pencil Icon */}
                                            <button 
                                                className="hover:opacity-80 flex items-center justify-center"
                                                onClick={() => {
                                                    console.log('Pencil icon clicked for item:', item);
                                                    onEditTask?.({
                                                        id: item.id,
                                                        prepSheetName: item.taskTitle,
                                                        dueDate: item.deadline,
                                                        dueTime: item.timeDue,
                                                        assignedTo: item.assignedStaff,
                                                        description: item.taskDescription
                                                    });
                                                }}
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_2069_19257)">
                                                        <path d="M17.2353 2.7653C16.7821 2.31277 16.1678 2.05859 15.5273 2.05859C14.8869 2.05859 14.2726 2.31277 13.8193 2.7653L2.97668 13.608C2.66618 13.9167 2.41998 14.284 2.25234 14.6885C2.0847 15.093 1.99893 15.5268 2.00001 15.9646V17.3333C2.00001 17.5101 2.07025 17.6797 2.19527 17.8047C2.3203 17.9297 2.48987 18 2.66668 18H4.03534C4.47319 18.0012 4.90692 17.9156 5.31145 17.748C5.71597 17.5805 6.08325 17.3344 6.39201 17.024L17.2353 6.18064C17.6877 5.72743 17.9417 5.11328 17.9417 4.47297C17.9417 3.83266 17.6877 3.21851 17.2353 2.7653ZM5.44934 16.0813C5.07335 16.4548 4.56532 16.6651 4.03534 16.6666H3.33334V15.9646C3.33267 15.7019 3.38411 15.4416 3.4847 15.1989C3.58529 14.9562 3.73302 14.7359 3.91934 14.5506L12.148 6.32197L13.6813 7.8553L5.44934 16.0813ZM16.292 5.23797L14.6213 6.9093L13.088 5.3793L14.7593 3.70797C14.86 3.60751 14.9795 3.52786 15.111 3.47358C15.2424 3.41929 15.3833 3.39143 15.5255 3.39158C15.6678 3.39174 15.8086 3.41991 15.9399 3.47448C16.0712 3.52905 16.1905 3.60896 16.291 3.70964C16.3915 3.81032 16.4711 3.9298 16.5254 4.06126C16.5797 4.19272 16.6076 4.33359 16.6074 4.47581C16.6072 4.61804 16.5791 4.75885 16.5245 4.89019C16.4699 5.02153 16.39 5.14084 16.2893 5.2413L16.292 5.23797Z" fill="#727A90" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_2069_19257">
                                                            <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                            </button>
                                            {/* Delete Icon */}
                                            <button className="hover:opacity-80 flex items-center justify-center">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.0006 4.66666H13.934C13.615 3.11572 12.2507 2.002 10.6673 2H9.33395C7.75055 2.002 6.38623 3.11572 6.0673 4.66666H4.00064C3.63245 4.66666 3.33398 4.96513 3.33398 5.33331C3.33398 5.7015 3.63245 6 4.00064 6H4.6673V14.6667C4.66952 16.5067 6.16061 17.9978 8.00064 18H12.0006C13.8407 17.9978 15.3318 16.5067 15.334 14.6667V6H16.0006C16.3688 6 16.6673 5.70153 16.6673 5.33334C16.6673 4.96516 16.3688 4.66666 16.0006 4.66666ZM9.33398 13.3333C9.33398 13.7015 9.03552 14 8.66733 14C8.29911 14 8.00064 13.7015 8.00064 13.3333V9.33334C8.00064 8.96516 8.29911 8.66669 8.6673 8.66669C9.03548 8.66669 9.33395 8.96516 9.33395 9.33334V13.3333H9.33398ZM12.0006 13.3333C12.0006 13.7015 11.7022 14 11.334 14C10.9658 14 10.6673 13.7015 10.6673 13.3333V9.33334C10.6673 8.96516 10.9658 8.66669 11.334 8.66669C11.7022 8.66669 12.0006 8.96516 12.0006 9.33334V13.3333ZM7.44798 4.66666C7.73155 3.86819 8.48667 3.33434 9.33398 3.33331H10.6673C11.5146 3.33434 12.2698 3.86819 12.5533 4.66666H7.44798Z" fill="#E51B1B" />
                                                </svg>


                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                <div className="flex justify-between items-center p-4 border-t border-gray-200 text-sm text-gray-500">
                    {/* Left text */}
                    <span>
                        Showing {(currentPage - 1) * rowsPerPage + 1}–
                        {Math.min(currentPage * rowsPerPage, taskData.length)} from{" "}
                        {taskData.length}
                    </span>

                    {/* Pagination controls */}
                    <div className="flex items-center space-x-2">
                        {/* Previous button */}
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.86015 12.3933L5.14015 8.66667C5.01598 8.54176 4.94629 8.3728 4.94629 8.19667C4.94629 8.02055 5.01598 7.85158 5.14015 7.72667L8.86015 4.00001C8.9534 3.90599 9.07253 3.84187 9.20236 3.81582C9.3322 3.78977 9.46684 3.80298 9.58914 3.85376C9.71143 3.90454 9.81584 3.99058 9.88904 4.10093C9.96224 4.21128 10.0009 4.34092 10.0002 4.47334V11.92C10.0009 12.0524 9.96224 12.1821 9.88904 12.2924C9.81584 12.4028 9.71143 12.4888 9.58914 12.5396C9.46684 12.5904 9.3322 12.6036 9.20236 12.5775C9.07253 12.5515 8.9534 12.4874 8.86015 12.3933Z"
                                    fill="#686F83"
                                />
                            </svg>
                        </button>

                        {/* Page numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                            <button
                                key={num}
                                onClick={() => setCurrentPage(num)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-sm ${num === currentPage
                                    ? "bg-purple-100 text-purple-700 border-purple-300"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {num}
                            </button>
                        ))}

                        {/* Next button */}
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.00001 13.92V6.47334C7.99924 6.34092 8.03792 6.21128 8.11112 6.10093C8.18432 5.99058 8.28873 5.90454 8.41102 5.85376C8.53332 5.80298 8.66797 5.78977 8.7978 5.81582C8.92763 5.84187 9.04677 5.90599 9.14001 6.00001L12.86 9.72667C12.9842 9.85158 13.0539 10.0205 13.0539 10.1967C13.0539 10.3728 12.9842 10.5418 12.86 10.6667L9.14001 14.3933C9.04677 14.4874 8.92763 14.5515 8.7978 14.5775C8.66797 14.6036 8.53332 14.5904 8.41102 14.5396C8.28873 14.4888 8.18432 14.4028 8.11112 14.2924C8.03792 14.1821 7.99924 14.0524 8.00001 13.92Z"
                                    fill="#686F83"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Pagination