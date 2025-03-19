

export default function pagination({ currentPage, totalPages, onPageChange }) {

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }


  return (
    <div>
      <ul class="pagination">
        {/* ÖNCEKİ SAYFA İÇİN */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{cursor: currentPage === 1 ? '' : 'pointer'}}
          >
            Önceki sayfa
          </a>
        </li>
        {/* ARADAKİ SAYILAR İÇİN */}
        {
          pageNumbers.map(number => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? 'active' : ''}`}

            >
              <a
                className="page-link"
                onClick={() => onPageChange(number)}
                style={{ cursor: 'pointer'}}
              >
                {number}
              </a>

            </li>
          ))
        }
        {/* SONRAKİ SAYFA İÇİN */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{cursor: currentPage === totalPages ? '' : 'pointer'}}
          >
            Sonraki sayfa
          </a>
        </li>
      </ul>
    </div>
  )
}
