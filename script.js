let dictionary = [];

// Load the dictionary from the JSON file
fetch('words_dictionary.json')
    .then(response => response.json())
    .then(data => {
        dictionary = data;
    })
    .catch(error => console.error('Error loading the dictionary:', error));

function findWords() {
    const inputLetters = document.getElementById('letters').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    // Basic example: Find words that can be made up of the input letters
    const results = dictionary.filter(word => {
        return [...word].every(letter => inputLetters.includes(letter));
    });

    // Display results
    results.forEach(word => {
        const listItem = document.createElement('li');
        listItem.textContent = word;
        resultsContainer.appendChild(listItem);
    });
}