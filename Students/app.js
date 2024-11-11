async function solve() {

    const url = `http://localhost:3030/jsonstore/collections/students`

    const table = document.querySelector('#results tbody');

    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(student => {
        const firstName = student.firstName;
        const lastName = student.lastName;
        const faclutyNumber = student.faclutyNumber;
        const grade = Number(student.grade);

        const tr = document.createElement('tr');
        tr.setAttribute('id', student._id);

        const firstNameCell = tr.insertCell(0);
        firstNameCell.setAttribute('id',student._id);
        firstNameCell.textContent = firstName;

        const lastNameCell = tr.insertCell(1);
        lastNameCell.textContent = lastName;

        const faclutyNumberCell = tr.insertCell(2);
        faclutyNumberCell.textContent = faclutyNumber;

        const gradeCell = tr.insertCell(3);
        gradeCell.textContent = grade.toFixed(2);

        table.appendChild(tr);



    })

    const submitButton = document.getElementById('submit');

    submitButton.addEventListener('click', onclickSubmit)

    async function onclickSubmit(ev) {
 
        const firstNameInput = document.getElementsByName('firstName')[0].value;
        const lastNameInput = document.getElementsByName('lastName')[0].value;
        const faclutyNumberInput = document.getElementsByName('facultyNumber')[0].value;
        const gradeInput = document.getElementsByName('grade')[0].value;

        const areNotEmptyInputs = firstNameInput!== '' && lastNameInput !== '' && faclutyNumberInput !== '' && gradeInput !== '';

        if (areNotEmptyInputs) {
            
            const response = await fetch(url,{
                method: 'POST',
                header: {'Content-type' : 'application/json'},
                body: JSON.stringify({
                    firstName: firstNameInput,
                    lastName: lastNameInput,
                    faclutyNumber: faclutyNumberInput,
                    grade: gradeInput
                })
            });

        }
 
    }
}
 solve();