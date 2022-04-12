const express = require('express');
const app = express();
const { animals } = require('./data/animals.json');

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    //save animalsArray as filteredResults here:
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        //save personalityTraits as a dedicated array
        //if personalityTraits is a string place it into a new array and save
    if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
    } else {
        personalityTraitsArray = query.personalityTraits;
    }
    //loop through each trait in the personalityTraits array:
    personalityTraitsArray.forEach(trait => {
        //check trait against each animal in the filteredResults array
        //remember it is initially a copy of the animalsArray
        //but here its being updated for each trait in the .forEach() loop
        //for each trait being targeted by the filter, the filteredResults array
        //will then contain only the entries that contain the trait,
        //so at the end there will be an array of animals that have every one
        //of the traits whenthe .forEach() loop is finished
        filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
        );
    });
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    //return the filtered results
    return filteredResults;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(3001, () => {
    console.log(`API server now on port 3001`);
});