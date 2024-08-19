function findWords() {
    const centralLetter = document.getElementById('central-letter').value.toLowerCase();
    const otherLetters = document.getElementById('other-letters').value.toLowerCase();
    const allLetters = `[${centralLetter}${otherLetters}]*`;
    const resultsContainer = document.getElementById('words');

    if (!centralLetter || centralLetter.length + otherLetters.length !== 7) {
        alert('Please enter one central letter and six other letters.');
        return;
    }

    // Adjust the API URL to fetch words that contain the central letter and could potentially form valid words
    const apiUrl = `https://api.datamuse.com/words?sp=${centralLetter}+${allLetters}&md=f&max=1000`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const foundWords = data.filter(word => 
                word.word.length >= 4 &&
                word.word.includes(centralLetter) &&
                word.word.split('').every(letter => (centralLetter + otherLetters).includes(letter)) &&
                word.word.split('').every(letter => 
                    word.word.split(letter).length - 1 <= (centralLetter + otherLetters).split(letter).length - 1)
            );

            resultsContainer.innerHTML = '';
            if (foundWords.length > 0) {
                foundWords.forEach(word => {
                    const listItem = document.createElement('li');
                    listItem.textContent = word.word;
                    resultsContainer.appendChild(listItem);
                });
            } else {
                resultsContainer.innerHTML = '<li>No valid words found.</li>';
            }
        })
        .catch(error => {
            console.error('Error fetching words:', error);
            resultsContainer.innerHTML = '<li>Error fetching words. Please try again later.</li>';
        });
}
