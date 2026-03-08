import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Welcome to LysC-FandM!</h1>
    <p>This project is ready for GitHub Pages deployment.</p>
    <div class="card">
      <button id="counter" type="button">count is 0</button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

let counter = 0
const setCounter = (count) => {
  counter = count
  document.querySelector('#counter').innerHTML = `count is ${counter}`
}

document.querySelector('#counter').addEventListener('click', () => setCounter(counter + 1))
