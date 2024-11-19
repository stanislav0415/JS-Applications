async function getInfo() {
    const stopNameEl = document.getElementById('stopName');
    const timeTableEL = document.getElementById('buses');
    const sumbitBtn = document.getElementById('submit');

    const stopID = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopID}`;


    try{
 
        stopNameEl.textContent = 'Loading...';
        timeTableEL.replaceChildren();
        sumbitBtn.disbled = true;

        const res = await fetch(url);

        if (res.status !== 200) {
            throw Error(`Stop ID is not found!`)
        }

        const data = await res.json()
        stopNameEl.textContent = data.name

        Object.entries(data.buses).forEach(b => {

            const li = document.createElement('li');
            li.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            timeTableEL.appendChild(li);
        })

        sumbitBtn.disbled = false;
        
    } 
    catch(error){
      stopNameEl.textContent = 'Error'
    }
}