'use client';

import React, { useState } from 'react';
import RowsPerPageSelect from '../../DropDown/RowsPerPageSelect';

function Pagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    // Toggle individual row selection
    const toggleRow = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    // Updated data structure to match the image with more rows
    const inventoryData = [
        {
            id: '302012',
            product: 'Classic Burgers',
            sales: '5,000',
            usage: '500 kg',
            percentile: '10%',
            performance: '45%',
            margin: '65%',
            popularity: '85%',
            revenue: '$8,560.2',
            status: 'Star'
        },
        {
            id: '302011',
            product: 'Pepsi',
            sales: '5,000',
            usage: '100 Cans',
            percentile: '10%',
            performance: '65%',
            margin: '80%',
            popularity: '85%',
            revenue: '$6,890.75',
            status: 'Star'
        },
        {
            id: '302002',
            product: 'Butter Chicken',
            sales: '5,000',
            usage: '20 kg',
            percentile: '10%',
            performance: '55%',
            margin: '90%',
            popularity: '85%',
            revenue: '$9,432.0',
            status: 'Plow Horses'
        },
        {
            id: '301901',
            product: 'Bun',
            sales: '5,000',
            usage: '500 kg',
            percentile: '10%',
            performance: '30%',
            margin: '75%',
            popularity: '85%',
            revenue: '$5,678.9',
            status: 'Puzzles'
        },
        {
            id: '301900',
            product: 'Macaroni and Cheese',
            sales: '5,000',
            usage: '40 kg',
            percentile: '10%',
            performance: '45%',
            margin: '70%',
            popularity: '85%',
            revenue: '$10,123.4',
            status: 'Star'
        },
        {
            id: '301881',
            product: 'Chocolate Cake',
            sales: '5,000',
            usage: '500 Pounds',
            percentile: '10%',
            performance: '30%',
            margin: '85%',
            popularity: '85%',
            revenue: '$4,567.3',
            status: 'Plow Horses'
        },
        {
            id: '301643',
            product: 'Mango Lassi',
            sales: '5,000',
            usage: '500 Liters',
            percentile: '10%',
            performance: '45%',
            margin: '60%',
            popularity: '85%',
            revenue: '$11,256.8',
            status: 'Star'
        },
        {
            id: '301600',
            product: 'Sushi Roll',
            sales: '5,000',
            usage: '500 units',
            percentile: '10%',
            performance: '45%',
            margin: '95%',
            popularity: '85%',
            revenue: '$3,450.1',
            status: 'Puzzles'
        },
        {
            id: '301555',
            product: 'Rice',
            sales: '5,000',
            usage: '500 kg',
            percentile: '10%',
            performance: '45%',
            margin: '50%',
            popularity: '85%',
            revenue: '$12,789.6',
            status: 'Plow Horses'
        },
        {
            id: '301002',
            product: 'Tiramisu',
            sales: '5,000',
            usage: '500 kg',
            percentile: '10%',
            performance: '30%',
            margin: '88%',
            popularity: '92%',
            revenue: '$15,234.5',
            status: 'Star'
        }
    ];

    const totalPages = Math.ceil(inventoryData.length / rowsPerPage);
    const paginatedData = inventoryData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Toggle select all rows
    const toggleSelectAll = () => {
        if (selectedRows.length === paginatedData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(paginatedData.map(row => row.id));
        }
    };

    // Function to get margin color
    const getMarginColor = (margin: string) => {
        const marginValue = parseInt(margin.replace('%', ''));
        if (marginValue >= 80) return 'text-[#34C759]';
        if (marginValue >= 60) return 'text-[#E7AA0B]';
        return 'text-[#E51B1B]';
    };

    // Function to get performance color
    const getPerformanceColor = (performance: string) => {
        const performanceValue = parseInt(performance.replace('%', ''));
        if (performanceValue >= 60) return '#E7AA0B';
        if (performanceValue >= 50) return '#019BF4';
        return '#F05D3D';
    };

    // Function to get performance bar color
    const getPerformanceBarColor = (performance: string) => {
        const performanceValue = parseInt(performance.replace('%', ''));
        if (performanceValue >= 60) return '#E7AA0B';
        if (performanceValue >= 50) return '#019BF4';
        return '#F05D3D';
    };

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
                            placeholder="Search..."
                            className="w-full h-9 lg:h-10 pl-7 sm:pl-9 pr-3 rounded-lg border border-[#E9EAEA] bg-white text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#E9EAEA]"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <>
                            <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_2896_18203)">
                                        <path
                                            d="M2.66757 5.16715H4.49138C4.85135 6.49158 6.21681 7.27344 7.54124 6.91348C8.39187 6.68228 9.05637 6.01779 9.28756 5.16715H17.3328C17.7009 5.16715 17.9994 4.86871 17.9994 4.50056C17.9994 4.13241 17.7009 3.83397 17.3328 3.83397H9.28756C8.9276 2.50951 7.56214 1.72765 6.23771 2.08762C5.38708 2.31881 4.72258 2.98331 4.49138 3.83394H2.66757C2.29942 3.83394 2.00098 4.13238 2.00098 4.50053C2.00098 4.86868 2.29942 5.16715 2.66757 5.16715Z"
                                            fill="#727A90"
                                        />
                                        <path
                                            d="M17.3328 9.33374H15.5089C15.1497 8.0095 13.785 7.2272 12.4607 7.58642C11.6094 7.81736 10.9444 8.48239 10.7134 9.33374H2.66757C2.29942 9.33374 2.00098 9.63218 2.00098 10.0003C2.00098 10.3685 2.29942 10.6669 2.66757 10.6669H10.7134C11.0727 11.9912 12.4374 12.7735 13.7616 12.4143C14.6129 12.1833 15.278 11.5183 15.5089 10.6669H17.3328C17.7009 10.6669 17.9994 10.3685 17.9994 10.0003C17.9994 9.63218 17.7009 9.33374 17.3328 9.33374Z"
                                            fill="#727A90"
                                        />
                                        <path
                                            d="M17.3328 14.8328H9.28756C8.9276 13.5084 7.56214 12.7266 6.23771 13.0865C5.38708 13.3177 4.72258 13.9822 4.49138 14.8328H2.66757C2.29942 14.8328 2.00098 15.1313 2.00098 15.4994C2.00098 15.8676 2.29942 16.166 2.66757 16.166H4.49138C4.85135 17.4904 6.21681 18.2723 7.54124 17.9123C8.39187 17.6811 9.05637 17.0167 9.28756 16.166H17.3328C17.7009 16.166 17.9994 15.8676 17.9994 15.4994C17.9994 15.1313 17.7009 14.8328 17.3328 14.8328Z"
                                            fill="#727A90"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2896_18203">
                                            <rect width="16" height="16" fill="white" transform="translate(2 2)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <span>Filters</span>
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
                        <thead className="bg-white text-xs  text-gray-500 font-normal tracking-wider">
                            <tr>
                                {/* Checkbox */}
                                <th className="px-4 py-2 w-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                                        onChange={toggleSelectAll}
                                        className={`w-5 h-5 rounded-md border-2 border-[#BEC2CC] appearance-none cursor-pointer
    checked:bg-primary checked:border-primary checked:bg-[length:12px_12px]
    checked:bg-no-repeat checked:bg-center
    checked:bg-[url("data:image/svg+xml,%3Csvg%20viewBox='0%200%2016%2016'%20fill='white'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M6.00005%2010.2L3.30005%207.5L2.33337%208.46667L6.00005%2012.1333L14%204.13333L13.0334%203.16667L6.00005%2010.2Z'/%3E%3C/svg%3E")]
  `}
                                    />
                                </th>

                                {/* Column Headers */}
                                {['ID', 'Product', 'Sales', 'Usage', 'Percentile', 'Performance'].map((header) => (
                                    <th key={header} className="px-4 py-4">
                                        {header === 'ID' ? (
                                            // ID without dropdown icon
                                            <span className='text-xs uppercase'>{header}</span>
                                        ) : (
                                            // Other columns with chevron
                                            <div className="flex justify-between items-center w-full">
                                                <span className='text-xs'>{header}</span>
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
                                        )}
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
                                    <td className="px-4 py-5">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(item.id)}
                                            onChange={() => toggleRow(item.id)}
                                            className={`w-5 h-5 rounded-md border-2 border-[#BEC2CC] appearance-none cursor-pointer
            checked:bg-primary checked:border-primary checked:bg-[length:12px_12px]
            checked:bg-no-repeat checked:bg-center
            checked:bg-[url("data:image/svg+xml,%3Csvg%20viewBox='0%200%2016%2016'%20fill='white'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M6.00005%2010.2L3.30005%207.5L2.33337%208.46667L6.00005%2012.1333L14%204.13333L13.0334%203.16667L6.00005%2010.2Z'/%3E%3C/svg%3E")]
          `}
                                        />
                                    </td>
                                    <td className="px-4 py-2">{item.id}</td>
                                    <td className="px-4 py-2">{item.product}</td>
                                    <td className="px-4 py-2">{item.sales}</td>
                                    <td className="px-4 py-2">{item.revenue}</td>
                                    <td className="px-4 py-2">{item.popularity}</td>
                                    <td className="px-4 py-2">
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">Performance</span>
                                                <span className="text-xs font-medium" style={{ color: getPerformanceColor(item.performance) }}>
                                                    {item.performance}
                                                </span>
                                            </div>
                                            <div className="w-full bg-[#E9EAEA] rounded-full h-2">
                                                <div 
                                                    className="h-2 rounded-full" 
                                                    style={{ 
                                                        width: `${parseInt(item.performance.replace('%', ''))}%`,
                                                        backgroundColor: getPerformanceBarColor(item.performance)
                                                    }}
                                                ></div>
                                            </div>
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
                        {Math.min(currentPage * rowsPerPage, inventoryData.length)} from{" "}
                        {inventoryData.length}
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