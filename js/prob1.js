const person = {
    found: 2,
    message: "Found 2 persons",
    result: [
        {
            name: {
                common: "John",
                fullName: ["John", "Doe"]
            },
            age: 32,
            isMale: false,
            address: {
                street: "13/A St Joseph",
                house: 10,
            },
        },
        {
            name: {
                common: "Humayoun",
                fullName: ["Humayoun", "Kabir"]
            },
            age: 33,
            isMale: false,
            address: {
                street: "13/A St Lucia",
                house: 11,
            },
        },
    ]
};

const setPerson = () => {
    const cardContainer = document.getElementById("card-container");
    person.result.forEach(user => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("rounded-lg", "shadow-lg");
        newDiv.innerHTML = `
            <div class="bg-slate-100 p-4 border">
                <h2 class="font-serif text-xl"><strong>Person Name:</strong> ${user.name.fullName.join(" ")}</h2>
            </div>
            <div class="p-4">
                <p class="mb-2"><strong>Age:</strong> ${user.age}</p>
                <p><strong>Street:</strong> ${user.address.street}, <strong>House:</strong> ${user.address.house} </p>
            </div>
        `;
        cardContainer.appendChild(newDiv);
    })

}

setPerson()