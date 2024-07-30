// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
//   } from "@/src/libs/ui/pagination";
  
//   const PaginationDemo = ({ currentPage, totalPages, onPageChange }) => {
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(i);
//     }
  
//     return (
//       <Pagination>
//         <PaginationContent>
//           <PaginationItem>
//             <PaginationPrevious 
//               href="#"
//               onClick={() => currentPage > 1 && onPageChange(currentPage - 1)} 
//             />
//           </PaginationItem>
//           {pageNumbers.map((number) => (
//             <PaginationItem key={number}>
//               <PaginationLink 
//                 href="#" 
//                 onClick={() => onPageChange(number)}
//                 isActive={currentPage === number}
//               >
//                 {number}
//               </PaginationLink>
//             </PaginationItem>
//           ))}
//           {totalPages > 3 && <PaginationEllipsis />}
//           <PaginationItem>
//             <PaginationNext 
//               href="#" 
//               onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)} 
//             />
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>
//     );
//   };
  
//   export default PaginationDemo;
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/src/libs/ui/pagination";
  
  const PaginationDemo = ({ currentPage, totalPages, onPageChange }) => {
    const getPaginationGroup = () => {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);
      let pages = [];
  
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
  
      return pages;
    };
  
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            />
          </PaginationItem>
  
          {currentPage > 3 && (
            <>
              <PaginationItem>
                <PaginationLink href="#" onClick={() => onPageChange(1)}>
                  1
                </PaginationLink>
              </PaginationItem>
              {currentPage > 4 && <PaginationEllipsis />}
            </>
          )}
  
          {getPaginationGroup().map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                href="#"
                onClick={() => onPageChange(number)}
                isActive={currentPage === number}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
  
          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => onPageChange(totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
  
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                currentPage < totalPages && onPageChange(currentPage + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  
  export default PaginationDemo;