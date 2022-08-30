import React, {useState, useEffect} from 'react';
import './Pagination.css'

interface PaginationProps {
  data: any[];
  RenderComponent: React.FC<any>;
  title?: string;
  pageLimit: number;
  dataLimit: number;
}


function Pagination ({data, RenderComponent, title, pageLimit, dataLimit}: PaginationProps) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, [currentPage]);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event: any) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill(undefined).map((_, idx) => start + idx + 1);
  };

  /* 
  Returns pagination display.
  It consists of next and previous buttons
  along with a pageLimit amoung of page numbers at a time
  */

  return (
    <div>
      <h1>{title !== '' ? title : null}</h1>
  
      <div className="dataContainer">
        {getPaginatedData().map((data, idx) => (
          <RenderComponent key={idx} data={data} />
        ))}
      </div>
  
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
          prev
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${currentPage === item ? 'active' : null}`}
          >
            <span>{item}</span>
          </button>
        ))}
  
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? 'disabled' : ''}`}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default Pagination;