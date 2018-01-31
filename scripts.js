const ENDPOINT = 'https://gist.githubusercontent.com/marcidenmark/b7d5160b19cf97b6d08c64dd68c5cc4c/raw/204fb9fd3f8f03688f9a6313ca53b7ce9956663a/flights.json';

const mainFoo = async() =>{
  console.log('Document loaded!')
  let flights = await fetchFlightsData(ENDPOINT);

  console.log('Creating elements from ' + flights.length + ' array objects.')
  let elfs = await createElementsFromFlightsData(flights)


  let flightsElement = document.getElementById('the-flights')
  console.log('Rendering to element: #' + flightsElement.id)
  renderFlightsData(elfs, flightsElement)

  console.log('All done!')
}

const fetchFlightsData = async(theurl) => {
  let d = []
  console.log('Downloading from: ' + theurl)
  let response = await fetch(theurl)
  console.log('  ...finished downloading!')
  return await response.json()
}

const createElementsFromFlightsData = async(fArray) => {
    let elArray = []

    for(let i=0, alen=fArray.length; i < alen; i++){
        let f = fArray[i]
        // a bunch of tedious crappy HTML creation code
        let el = document.createElement("div")
        el.innerHTML = createFlightHtml(f)
        elArray.push(el)
    }
    return elArray;
}


const createFlightHtml = function(flight){
  return `
      <h3>${flight.Destination}</h3>
       <div class="row">
          <div class="offset-sm-1 col-sm-4"><strong>Flight</strong></div>
          <div class="col-sm-6">${flight.flightNumber}</div>
       </div>
       <div class="row">
          <div class="offset-sm-1 col-sm-4"><strong>Arrival</strong></div>
          <div class="col-sm-6">${flight.arivalTime}</div>
       </div>
       <div class="row">
          <div class="offset-sm-1 col-sm-4"><strong>Departure</strong></div>
          <div class="col-sm-6">${flight.departureTime}</div>
       </div>`
}

const renderFlightsData = async(elArray, parentEl) => {
    for(let i=0, alen=elArray.length; i < alen; i++){
        let el = elArray[i]
        el.className = 'data-item col-sm-4'
        parentEl.appendChild(el)
    }
}


window.onload = async() => { mainFoo() }



