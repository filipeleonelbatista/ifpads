import styles from '../styles/components/PadButton.module.css'

export default function PadButton({ title, onClick, ...rest }) {
  return (
    <button className={styles.button} type="button" onClick={onClick} {...rest}>{title}</button>
  )
}