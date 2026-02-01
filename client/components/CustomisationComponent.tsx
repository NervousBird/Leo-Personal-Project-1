import { useState, ChangeEvent, FormEvent } from 'react'
import { changeColorStyles, appColourSchemes, appRadiusSchemes } from '../util/colour-scheme-utils.ts'
import { useUserData } from '../hooks/useUserData.ts'
import { UserData } from '../../models/userData.ts'
import { UserColorScheme, UserColorArray, BorderScheme, UserBorderScheme } from '../../models/customisations.ts'

interface Props {
  data: UserData
}

function CustomisationComponent({ data }: Props) {
  const userData = useUserData()
  const [hidden, setHidden] = useState(true)
  const [formData, setFormData] = useState<UserColorScheme>(JSON.parse(data.colors))
  const [radiusForm, setRadiusForm] = useState<BorderScheme>(JSON.parse(data.borders))

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    changeColorStyles(name, value)
  }

  const handleHidden = (e: FormEvent) => {
    e.preventDefault()
    setHidden(!hidden)
  }

  const handleSave = async () => {
    // Handle User Customisation database update
    await userData.update.mutateAsync({
      id: 1,
      colors: JSON.stringify(formData),
      borders: JSON.stringify(radiusForm),
      fonts: '',
      datesRange: '',
      leavingPoint: '',
      userId: 1,
    })
  }

  const handleLoadScheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleColorChange(e)

    const { name } = e.target as HTMLButtonElement
    document.documentElement.style.setProperty('--border-radius', appRadiusSchemes[name as keyof UserBorderScheme].border)
    document.documentElement.style.setProperty('--button-radius', appRadiusSchemes[name as keyof UserBorderScheme].button)
    setRadiusForm(appRadiusSchemes[name as keyof UserBorderScheme])
  }

  const handleColorChange = (e: ChangeEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement
    const keys = Object.keys(appColourSchemes[name as keyof UserColorArray])
    const values = Object.values(appColourSchemes[name as keyof UserColorArray]) as []

    for (let i = 0; i < keys.length; i++) {
      changeColorStyles(keys[i], values[i])
    }

    setFormData(appColourSchemes[name as keyof UserColorArray])
  }

  const handleRadiusChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'border') {
      document.documentElement.style.setProperty(
        '--border-radius',
        `${value}px`,
      )
    } else {
      document.documentElement.style.setProperty(
        '--button-radius',
        `${value}px`,
      )
    }
    setRadiusForm((prev) => ({ ...prev, [name]: `${value}px` }))
  }

  const handleLogColours = () => {
    console.log(formData)
  }

  return (
    <section
      key={formData.font}
      className="customisation-container"
      style={{ color: `${formData.font} !important` }}
    >
      <button className="form-button" onClick={handleHidden} type="button">
        <h3>Customisation</h3>
        {hidden && <i className="bi bi-caret-up-fill" />}
        {!hidden && <i className="bi bi-caret-down-fill" />}
      </button>

      <div className={`customisation-containers ${hidden ? 'hidden' : ''}`}>
        <div className="customisation-options-container">
          <h3>Customise</h3>
          <div className="customisation-group">
            <label>Font Colour</label>
            <input
              name="font"
              value={formData.font}
              type="color"
              onChange={handleChange}
            />
            <label>Bakground</label>
            <input
              name="background"
              value={formData.background}
              type="color"
              onChange={handleChange}
            />
          </div>
          <div className="customisation-group">
            <label>Window 1</label>
            <input
              name="background1"
              value={formData.background1}
              type="color"
              onChange={handleChange}
            />
            <label>Window 2</label>
            <input
              name="background2"
              value={formData.background2}
              type="color"
              onChange={handleChange}
            />
            <label>Window 3</label>
            <input
              name="background3"
              value={formData.background3}
              type="color"
              onChange={handleChange}
            />
            <label>Window 4</label>
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
          </div>
          <div className="customisation-group">
            <label>Colour 5</label>
            <input
              name="color5"
              value={formData.color5}
              type="color"
              onChange={handleChange}
            />
            <h4></h4>
            <h4>Roundness:</h4>
            <div>
              <label>Borders</label>
              <p>{radiusForm.border}</p>
            </div>
            <input
              id="border"
              name="border"
              type="range"
              value={radiusForm.border.replace('px', '')}
              min="0"
              max="100"
              onChange={handleRadiusChange}
            />
            <div>
              <label>Buttons</label>
              <p>{radiusForm.button}</p>
            </div>
            <input
              id="button"
              name="button"
              type="range"
              value={radiusForm.button.replace('px', '')}
              min="0"
              max="30"
              onChange={handleRadiusChange}
            />
          </div>
        </div>

        <div className="customisation-presets-container">
          <h3>Palettes</h3>
          <div className="customisation-preset-group">
            <div className="custom-group">
              <h4>Original</h4>
              <span>
                {Object.values(appColourSchemes.original).map((scheme, idx) => (
                  <div
                    key={idx}
                    style={{ backgroundColor: scheme }}
                  ></div>
                ))}
              </span>
              <button name="original" onClick={handleLoadScheme}>
                Switch
              </button>
            </div>
            <div className="custom-group">
              <h4>Dark Mode</h4>
              <span>
                {Object.values(appColourSchemes.darkMode).map((scheme, idx) => (
                  <div
                    key={idx}
                    style={{ backgroundColor: scheme }}
                  ></div>
                ))}
              </span>
              <button name="darkMode" onClick={handleLoadScheme}>
                Switch
              </button>
            </div>
            <div className="custom-group">
              <h4>High Constrast</h4>
              <span>
                {Object.values(appColourSchemes.highContrast).map(
                  (scheme, idx) => (
                    <div
                      key={idx}
                      style={{ backgroundColor: scheme }}
                    ></div>
                  ),
                )}
              </span>
              <button name="highContrast" onClick={handleLoadScheme}>
                Switch
              </button>
            </div>
            <div className="custom-group">
              <h4>Retro</h4>
              <span>
                {Object.values(appColourSchemes.retro).map((scheme, idx) => (
                  <div
                    key={idx}
                    style={{ backgroundColor: scheme }}
                  ></div>
                ))}
              </span>
              <button name="retro" onClick={handleLoadScheme}>
                Switch
              </button>
            </div>
            <div className="custom-group">
              <h4>Sleak Look</h4>
              <span>
                {Object.values(appColourSchemes.sleak).map((scheme, idx) => (
                  <div
                    key={idx}
                    style={{ backgroundColor: scheme }}
                  ></div>
                ))}
              </span>
              <button name="sleak" onClick={handleLoadScheme}>
                Switch
              </button>
            </div>
            <div className="custom-group">
              <h4>Nature</h4>
              <span>
                {Object.values(appColourSchemes.nature).map((scheme, idx) => (
                  <div
                    key={idx}
                    style={{ backgroundColor: scheme }}
                  ></div>
                ))}
              </span>
              <button name="nature" onClick={handleLoadScheme}>
                Switch
              </button>
            </div>
          </div>
        </div>
        {/* <button className="customisation-reset" onClick={handleReset}> */}
        {/*   Reset */}
        {/* </button> */}
        <div className="customisation-save">
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </section>
  )
}

export default CustomisationComponent
