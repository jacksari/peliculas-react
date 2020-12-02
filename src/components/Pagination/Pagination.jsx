import React from 'react';
import Pagination from 'rc-pagination';

function PaginationCom({currentPage, totalItems, onChangePage}) {
    return (
        <Pagination
            style={{marginTop:'30px', marginBottom:'30px'}}
            className="pagination"
            current={currentPage}
            total={totalItems}
            pageSize={20}
            onChange={onChangePage}
        />
    );
}

export default PaginationCom;
