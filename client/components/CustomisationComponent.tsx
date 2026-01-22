import { useState } from 'react'
import { changeHexColor } from '../util/calculation-utils.ts'


function CustomisationComponent() {
  const [hidden, setHidden] = useState(true)
  const [formData, setFormData] = useState({
  font: "#110601",
  background: "#deeaf3",
  background1: "#deeaf3",
  background2: "#7f9fe6",
  background3: "#a0bddd",
  background4: "#c0d4eb",
  button1: "#85d685",
  button2: "#e6dd66",
  button3: "#b30f0f",
  button4: "#bbbbbb",
  color1: "#eca859",
  color1dark: "#d17a16",
  color1light1: "#ebbb8e",
  color1light2: "#ebcab3",
  color2: "#e6dd66",
  color2dark: "#e4c53d",
  color2light1: "#ebdb8e",
  color2light2: "#ebdeb3",
  color3: "#7f9fe6",
  color3dark: "#1e59d8",
  color3light1: "#a0bddd",
  color3light2: "#c0d4eb",
  color4: "#85d685",
  color4dark: "#0fa334",
  color4light1: "#a0dda3",
  color4light2: "#c0ebda",
  color5: "#e74b4b",
  color5dark: "#b30f0f",
  color5light1: "#e7a4ad",
  color5light2: "#e7c6c7",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({...prev, [name]: value}))

    const dark = changeHexColor(value, -20)
    const light1 = changeHexColor(value, 20)
    const light2 = changeHexColor(value, 40)

    switch(name) {
      case "font":
        document.documentElement.style.setProperty('--font', `${value}`)
        break
      case "background":
        document.documentElement.style.setProperty('--background', `${value}`)
        break
      case "background1":
        document.documentElement.style.setProperty('--background1', `${value}`)
        break
      case "background2":
        document.documentElement.style.setProperty('--background2', `${value}`)
        break
      case "background3":
        document.documentElement.style.setProperty('--background3', `${value}`)
        break
      case "background4":
        document.documentElement.style.setProperty('--background4', `${value}`)
        break
      case "button1":
        document.documentElement.style.setProperty('--button1', `${value}`)
        break
      case "button2":
        document.documentElement.style.setProperty('--button2', `${value}`)
        break
      case "button3":
        document.documentElement.style.setProperty('--button3', `${value}`)
        break
      case "button4":
        document.documentElement.style.setProperty('--button4', `${value}`)
        break
      case "color1":
        document.documentElement.style.setProperty('--color1', `${value}`)
        document.documentElement.style.setProperty('--color1-dark', dark)
        document.documentElement.style.setProperty('--color1-light1', light1)
        document.documentElement.style.setProperty('--color1-light2', light2)
        break
      case "color2":
        document.documentElement.style.setProperty('--color2', `${value}`)
        document.documentElement.style.setProperty('--color2-dark', dark)
        document.documentElement.style.setProperty('--color2-light1', light1)
        document.documentElement.style.setProperty('--color2-light2', light2)
        break
      case "color3":
        document.documentElement.style.setProperty('--color3', `${value}`)
        document.documentElement.style.setProperty('--color3-dark', dark)
        document.documentElement.style.setProperty('--color3-light1', light1)
        document.documentElement.style.setProperty('--color3-light2', light2)
        break
      case "color4":
        document.documentElement.style.setProperty('--color4', `${value}`)
        document.documentElement.style.setProperty('--color4-dark', dark)
        document.documentElement.style.setProperty('--color4-light1', light1)
        document.documentElement.style.setProperty('--color4-light2', light2)
        break
      case "color5":
        document.documentElement.style.setProperty('--color5', `${value}`)
        document.documentElement.style.setProperty('--color5-dark', dark)
        document.documentElement.style.setProperty('--color5-light1', light1)
        document.documentElement.style.setProperty('--color5-light2', light2)
        break
    }
  }

  const handleHidden = (e: FormEvent) => {
    e.preventDefault()
    setHidden(!hidden)
  }

  const handleSave = () => {
    // Handle User Customisation database update
  }
  const handleReset = () => {
    // Handle User Customisation database update
  }

  return (
    <section key={formData} className="customisation-container" style={{color: `${formData.font} !important`}}>
      <button className="form-button" onClick={handleHidden} type="button">
        <h3>Customisation</h3>
        {hidden  && <i className="bi bi-caret-up-fill" />}
        {!hidden  && <i className="bi bi-caret-down-fill" />}
      </button>

      <div className={`customisation-containers ${hidden ? "hidden" : ""}`}>
        <div className="customisation-options-container">
          <div className="customisation-group">
            <label>Font Colour</label>
            <input
              name="font"
              value={formData.font}
              type="color"
              onChange={handleChange}
            />
          <label>Bakground Colour</label>
            <input
              name="background"
              value={formData.background}
              type="color"
              onChange={handleChange}
            />
          </div>
          <div className="customisation-group">
            <label>Background 1</label>
            <input
              name="background1"
              value={formData.background1}
              type="color"
              onChange={handleChange}
            />
            <label>Background 2</label>
            <input
              name="background2"
              value={formData.background2}
              type="color"
              onChange={handleChange}
            />
            <label>Background 3</label>
            <input
              name="background3"
              value={formData.background3}
              type="color"
              onChange={handleChange}
            />
            <label>Background 4</label>
            <input
              name="background4"
              value={formData.background4}
              type="color"
              onChange={handleChange}
            />
          </div>
          <div className="customisation-group">
            <label>Button 1</label>
            <input
              name="button1"
              value={formData.button1}
              type="color"
              onChange={handleChange}
            />
            <label>Button 2</label>
            <input
              name="button2"
              value={formData.button2}
              type="color"
              onChange={handleChange}
            />
            <label>Button 3</label>
            <input
              name="button3"
              value={formData.button3}
              type="color"
              onChange={handleChange}
            />
            <label>Button 4</label>
            <input
              name="button4"
              value={formData.button4}
              type="color"
              onChange={handleChange}
            />
          </div>
          <div className="customisation-group">
            <label>Colour 1</label>
            <input
              name="color1"
              value={formData.color1}
              type="color"
              onChange={handleChange}
            />
            <label>Colour 2</label>
            <input
              name="color2"
              value={formData.color2}
              type="color"
              onChange={handleChange}
            />
            <label>Colour 3</label>
            <input
              name="color3"
              value={formData.color3}
              type="color"
              onChange={handleChange}
            />
            <label>Colour 4</label>
            <input
              name="color4"
              value={formData.color4}
              type="color"
              onChange={handleChange}
            />
            <label>Colour 5</label>
            <input
              name="color5"
              value={formData.color5}
              type="color"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="customisation-presets-container">
          <div className="customisation-preset-group">

          </div>
        </div>
        <button className="customisation-save" onClick={handleSave}>Save</button>
        <button className="customisation-reset" onClick={handleReset}>Reset</button>
      </div>
    </section>
  )
}

export default CustomisationComponent
