import { useAudio } from '../hooks/useAudio'
import styles from '../styles/components/PadButton.module.css'

export default function PadButton({ id, title, onClick, fullWidth = false, ...rest }) {
  const { padColor, padTextColor } = useAudio()

  const handleClick = (event) => {
    event.preventDefault();

    console.log("ANALITYCS", "click", {
      link_id: id.replaceAll(" ", ''),
    })
    window.gtag('event', 'click', {
      link_id: id.replaceAll(" ", ''),
    })

    onClick();
  }

  return (
    <button id={id} className={fullWidth ? styles.buttonFull : styles.button} style={{ color: padTextColor, backgroundColor: padColor }} type="button" onClick={handleClick} {...rest}>{title}</button>
  )
}