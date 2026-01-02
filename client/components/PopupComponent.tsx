

interface Props {
  title: string
  message: string
}

function PopupComponent({ title, message }: Props) {

  return (
  <section className="popup-container">
    <div >
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  </section>
  )
}

export default PopupComponent
