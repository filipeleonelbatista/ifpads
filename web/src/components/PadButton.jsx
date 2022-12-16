import styles from '../styles/components/PadButton.module.css'

export default function PadButton({ title, onClick, fullWidth = false, ...rest }) {
  return (
    <button className={fullWidth ? styles.buttonFull : styles.button} type="button" onClick={onClick} {...rest}>{title}</button>
  )
}