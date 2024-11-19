function solve() {

    const label = document.querySelector('.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let stop = {
        next: 'depot',
    };

    async function depart() {
        departBtn.disabled = true;
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        try {
            const result = await fetch(url);

            if (result.status !== 200) {
                label.textContent = 'Error!';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
              
            }

            stop = await result.json();
            label.textContent = `Next stop: ${stop.name}`;
            arriveBtn.disabled = false;

        } catch (error) {
            label.textContent = 'Error!';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    function arrive() {
        label.textContent = `Arriving at: ${stop.name}`;
        arriveBtn.disabled = true;
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
