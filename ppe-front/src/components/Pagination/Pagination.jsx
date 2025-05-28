import { useState, useEffect } from 'react'
import styles from "./styles.module.css"
import Button from "../Button/Button"

const Pagination = ({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  setCurrentPage, 
  marginTop_size = "0px" 
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  
  const buttonSize = isMobile ? "40px" : "50px";
  
  return (
    <div className={styles.pagination} style={{ marginTop: marginTop_size }}>
      <Button 
        text_size={isMobile ? "12px" : "14px"}
        bg_color="#1A1A1A" 
        radius="50%" 
        padding_sz="0px"
        width_size={buttonSize}
        height_size={buttonSize}
        onClick={previousPage}
      ><i className="fa-solid fa-arrow-left"></i></Button>

      <span className={styles.currentPage}>{currentPage}</span>

      <Button 
        text_size={isMobile ? "12px" : "14px"}
        bg_color="#1A1A1A" 
        radius="50%" 
        padding_sz="0px"
        width_size={buttonSize}
        height_size={buttonSize}
        onClick={nextPage}
      ><i className="fa-solid fa-arrow-right"></i></Button>
    </div>
  )
}

export default Pagination