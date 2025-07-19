
// let targetProtein = document.getElementById("proteinInput")
let vegChecked = document.querySelector("#isVeg");
let nonvegChecked = document.querySelector("#isNonVeg");
let submitBtn = document.querySelector("#submit-btn");
let displayReciepeName = document.getElementById("reciepeName");

//protein per 100 kg
const proteinData = {
    Paneer: 20,
    Tofu: 15,
    Soya: 26,
    Lentils: 25,
    Eggs: 6,
    Chicken: 27,
    Mutton: 25,
    Chickpeas: 19
}

//protein in gm calculation
function source() {
    const selectedProtein = document.getElementById("selectSource").value;
    const targetedProtein = document.getElementById("proteinInput").value;
    const displayQuantity = document.getElementById("quantityOutput");

    const proteinValue = proteinData[selectedProtein];
    console.log(proteinValue);
    if (proteinValue && targetedProtein) {
       let protein;

        if (selectedProtein === "Eggs") {
            const eggsNeeded = targetedProtein / proteinValue;
            protein = `${Math.ceil(eggsNeeded)} egg${eggsNeeded > 1 ? 's' : ''}`;
        } else {
            const gramsNeeded = (targetedProtein / proteinValue) * 100;
            protein = `${gramsNeeded.toFixed()} gm`;
        }

        displayQuantity.innerText = protein;
        return protein;
    } else {
        displayQuantity.innerText = "Please fill the data!";
    }
}

//selected source recipes
function particularProteinRec() {
    const selectedProtein = document.getElementById("selectSource").value;
    const targetedProtein = document.getElementById("proteinInput").value;
    const displayContainer = document.querySelector('.reciepe-list');

    displayContainer.innerHTML = '';


    fetch('/recipes.json')
        .then(response => response.json())
        .then(data => {
            const particularList = data.filter(recipeList =>
                recipeList.source == selectedProtein);
            console.log(particularList);
            if (particularList.length > 0 && targetedProtein) {
                particularList.forEach(recipe => {
                    // recipe card container 
                    const card = document.createElement('div');
                    card.className = 'card d-flex flex-row';
                    card.style.width = '700px';
                    card.style.margin = '15px';
                    card.style.border = '1px solid #ccc';
                    card.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.1)';
                    card.style.padding = '10px';
                    card.style.gap = '20px';

                    // recipe image
                    const img = document.createElement('img');
                    img.src = recipe.image || 'images/default-recipe.jpg';
                    img.alt = recipe.name;
                    img.style.width = '220px';
                    img.style.height = '160px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '6px';

                    // right side container 
                    const rightSide = document.createElement('div');
                    rightSide.style.display = 'flex';
                    rightSide.style.flexDirection = 'column';
                    rightSide.style.justifyContent = 'space-between';
                    rightSide.style.flex = '1';

                    // Name summary container
                    const nameSummary = document.createElement('div');

                    const title = document.createElement('h5');
                    title.innerText = recipe.name;
                    title.style.marginBottom = '5px';

                    const summary = document.createElement('p');
                    summary.innerText = recipe.summary || '';
                    summary.style.marginTop = '0';
                    summary.style.fontSize = '0.9rem';
                    summary.style.color = '#444';

                    nameSummary.appendChild(title);
                    nameSummary.appendChild(summary);

                    // Ingredients
                  
                    const requiredQty = (targetedProtein / proteinData[selectedProtein]) * 100;

                    const ingredients = document.createElement('p');
                    ingredients.innerHTML = '<strong>Ingredients:</strong> ' +
                        recipe.ingredients.map(ing => {
                            let qty = ing.quantity;
                            if (ing.name.toLowerCase() === selectedProtein.toLowerCase()) {
                                qty = requiredQty.toFixed(0);
                            }
                            return `${ing.name} (${qty} ${ing.unit})`;
                        }).join(', ');
                    ingredients.style.fontSize = '0.9rem';
                    ingredients.style.margin = '8px 0';

                    // Method
                    const method = document.createElement('p');
                    method.innerHTML = '<strong>Method:</strong> ' + (recipe.method || '');
                    method.style.fontSize = '0.9rem';
                    method.style.margin = '8px 0';

                    // Append all right side parts
                    rightSide.appendChild(nameSummary);
                    rightSide.appendChild(ingredients);
                    rightSide.appendChild(method);

                    // Append image and right side to card
                    card.appendChild(img);
                    card.appendChild(rightSide);

                    // Append card to container
                    displayContainer.appendChild(card);
                });
            } else {
                displayContainer.innerText = "No recipes found";
            }
        })
        .catch(error => console.error('Error fetching JSON:', error));

}

//vag recipes
function showVegReciepe() {
    const displayContainer = document.querySelector('.reciepe-list');
    displayContainer.innerHTML = '';

    if (vegChecked.checked == true) {
        // console.log(vegRecipes1);
        fetch('./recipes.json')
            .then(response => response.json()) // Parse JSON
            .then(data => {
                const vegList = data.filter(list => list.type == "veg");
                console.log(vegList);
                if (vegList.length > 0) {
                    vegList.forEach(recipe => {

                        //recipe card container
                        const card = document.createElement('div');
                        card.className = 'card d-flex flex-row';
                        card.style.width = '500px';
                        card.style.margin = '15px';
                        card.style.border = '1px solid #cc';
                        card.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.1)'

                        //recipe image
                        const img = document.createElement('img');
                        img.src = recipe.image || 'images/default-recipe.jpg';
                        img.alt = recipe.name;
                        img.style.width = '200px';
                        img.style.height = '140px';
                        img.style.objectFit = 'cover';

                        //card body conatiner
                        const cardBody = document.createElement('div');
                        cardBody.className = 'card-body p-2';
                        cardBody.style.display = 'flex';
                        cardBody.style.flexDirection = 'column';
                        cardBody.style.justifyContent = 'center';

                        //recipe name
                        const title = document.createElement('h6');
                        title.className = 'card-title mb-2';
                        title.innerText = recipe.name;

                        //ingredients list
                        const ingredients = document.createElement('p');
                        ingredients.className = 'card-text';
                        ingredients.style.fontSize = '0.9rem';

                        ingredients.innerText = 'Ingredients: ' + recipe.ingredients.map(ing => `${ing.name} (${ing.quantity}${ing.unit})`).join(',');

                        //append to card body
                        cardBody.appendChild(title);
                        cardBody.appendChild(ingredients);

                        //append img and body to card
                        card.appendChild(img);
                        card.appendChild(cardBody);

                        displayContainer.appendChild(card);


                    });
                } else {
                    displayContainer.innerText = "No vegetarien recipes found";
                }
            })
            .catch(error => console.error('Error fetching JSON:', error));


    } else {
        displayReciepeName.innerText = "To display recipes checked your box";
    }
}

//non-veg recipes
function showNonVegReciepe() {
    const displayContainer = document.querySelector('.reciepe-list');
    displayContainer.innerHTML = '';

    if (nonvegChecked.checked == true) {
        fetch('./recipes.json')
            .then(response => response.json()) // Parse JSON
            .then(data => {
                const vegList = data.filter(list => list.type == "non-veg");
                console.log(vegList);
                if (vegList.length > 0) {
                    vegList.forEach(recipe => {

                        //recipe card container
                        const card = document.createElement('div');
                        card.className = 'card d-flex flex-row';
                        card.style.width = '500px';
                        card.style.margin = '15px';
                        card.style.border = '1px solid #cc';
                        card.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.1)'

                        //recipe image
                        const img = document.createElement('img');
                        img.src = recipe.image || 'images/default-recipe.jpg';
                        img.alt = recipe.name;
                        img.style.width = '200px';
                        img.style.height = '140px';
                        img.style.objectFit = 'cover';

                        //card body conatiner
                        const cardBody = document.createElement('div');
                        cardBody.className = 'card-body p-2';
                        cardBody.style.display = 'flex';
                        cardBody.style.flexDirection = 'column';
                        cardBody.style.justifyContent = 'center';

                        //recipe name
                        const title = document.createElement('h6');
                        title.className = 'card-title mb-2';
                        title.innerText = recipe.name;

                        //ingredients list
                        const ingredients = document.createElement('p');
                        ingredients.className = 'card-text';
                        ingredients.style.fontSize = '0.9rem';

                        ingredients.innerText = 'Ingredients: ' + recipe.ingredients.map(ing => `${ing.name} (${ing.quantity}${ing.unit})`).join(',');

                        //append to card body
                        cardBody.appendChild(title);
                        cardBody.appendChild(ingredients);

                        //append img and body to card
                        card.appendChild(img);
                        card.appendChild(cardBody);

                        displayContainer.appendChild(card);


                    });
                } else {
                    displayContainer.innerText = "No vegetarien recipes found";
                }

            }) // Work with JSON data

            .catch(error => console.error('Error fetching JSON:', error));

    } else {
        displayReciepeName.innerText = "To display recipes checked your box";
    }
}



