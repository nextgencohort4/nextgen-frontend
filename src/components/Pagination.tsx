import React from "react";
import {
    Pagination as UIPagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {
    return (
        <UIPagination className="my-2">
            <PaginationContent className="flex flex-wrap justify-center">
                <PaginationItem className="mx-1">
                    <PaginationPrevious
                        href="#"
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        className={`${currentPage <= 1 ? "pointer-events-none opacity-50" : ""}`}
                    />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index} className="mx-1 text-black dark:text-white">
                        <PaginationLink
                            href="#"
                            onClick={() => onPageChange(index + 1)}
                            isActive={currentPage === index + 1}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem className="mx-1 text-black dark:text-white">
                    <PaginationNext
                        href="#"
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        className={`${currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}`}
                    />
                </PaginationItem>
            </PaginationContent>
        </UIPagination>
    );
};

export default Pagination;
