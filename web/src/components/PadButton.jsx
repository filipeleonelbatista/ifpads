import { useAudio } from '../hooks/useAudio'
import styles from '../styles/components/PadButton.module.css'

export default function PadButton({ title, onClick, fullWidth = false, ...rest }) {
  const { padColor, padTextColor } = useAudio()
  return (
    <button className={fullWidth ? styles.buttonFull : styles.button} style={{ color: padTextColor, backgroundColor: padColor }} type="button" onClick={onClick} {...rest}>{title}</button>
  )
}