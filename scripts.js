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
    let elarr = []

    for(let i=0, alen=fArray.length; i < alen; i++){
        let f = fArray[i]
        // a bunch of tedious crappy HTML creation code
        let d_name = document.createElement('h2')
        d_name.appendChild(document.createTextNode(f['Destination']))
        let ulist = document.createElement('ul')
        ulist.className = 'list list-group'

        let _li = document.createElement('li')
        _li.className = 'list-group-item'
        _li.appendChild(document.createTextNode('Flight #' + f['flightNumber']))
        ulist.appendChild(_li)

        _li = document.createElement('li')
        _li.className = 'list-group-item'
        _li.appendChild(document.createTextNode('Arrival: ' + f['arivalTime']))
        ulist.appendChild(_li)

        _li = document.createElement('li')
        _li.className = 'list-group-item'
        _li.appendChild(document.createTextNode('Departure: ' + f['departureTime']))
        ulist.appendChild(_li)


        let el = document.createElement("div")
        el.appendChild(d_name)
        el.appendChild(ulist)
        elarr.push(el)
    }
    return elarr;
}

const renderFlightsData = async(elArray, parentEl) => {
    for(let i=0, alen=elArray.length; i < alen; i++){
        let el = elArray[i]
        el.className = 'data-item col-4'
        parentEl.appendChild(el)
    }
}


window.onload = async() => { mainFoo() }



