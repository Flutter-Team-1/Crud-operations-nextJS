import React from 'react';
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handlePrevPage = () => {
        if (!isFirstPage) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (!isLastPage) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    let startPage = Math.max(1, currentPage - Math.floor(5 / 2));
    const endPage = Math.min(totalPages, startPage + 5 - 1);

    if (endPage - startPage + 1 < 5) {
        startPage = Math.max(1, endPage - 5 + 1);
    }

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);


    return (
        <div className="flex justify-center items-center mt-4">
            <button
                onClick={handlePrevPage}
                disabled={isFirstPage}
                className={`px-1 rounded-l ${isFirstPage ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-black text-white hover:bg-black-500'}`}
            ><i className="ri-arrow-left-s-line"></i>
            </button>
            {pageNumbers.map((page: number) => (
                <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`px-2 mx-2 rounded ${currentPage === page ? 'bg-black text-white' : 'bg-gray-300 text-gray-600 hover:bg-gray-600 hover:text-white'
                        }`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={handleNextPage}
                disabled={isLastPage}
                className={`px-1 rounded-r ${isLastPage ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-black text-white hover:bg-black-500'}`}
            ><i className="ri-arrow-right-s-line"></i>
            </button>
        </div>
    );
};

export default Pagination;
