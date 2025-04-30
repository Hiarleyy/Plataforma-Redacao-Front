import styles from "./styles.module.css"
import Button from "../Button/Button"

const Pagination = ({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  setCurrentPage, 
  marginTop_size = "0px" 
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (totalPages <= 1) return null
  
  return (
    <div className={styles.pagination} style={{ marginTop: marginTop_size }}>
      <Button 
        text_size="14px" 
        bg_color="#1A1A1A" 
        radius="50%" 
        padding_sz="0px"
        width_size="50px"
        height_size="50px"
        onClick={previousPage}
      ><i class="fa-solid fa-arrow-left"></i></Button>

      <span className={styles.currentPage}>{currentPage}</span>

      <Button 
        text_size="14px" 
        bg_color="#1A1A1A" 
        radius="50%" 
        padding_sz="0px"
        width_size="50px"
        height_size="50px"
        onClick={nextPage}
      ><i class="fa-solid fa-arrow-right"></i></Button>
    </div>
  )
}

export default Pagination