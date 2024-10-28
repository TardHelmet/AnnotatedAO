document.addEventListener('DOMContentLoaded', () => {
    const paragraphs = Array.from(document.querySelectorAll('.paragraphs .text-block'));
    const designationElement = document.querySelector('.paragraph-designation');
    const contentElement = document.querySelector('.paragraph-content');
    const footnotesContainer = document.querySelector('.footnotes-container');
    const prevButton = document.getElementById('prevParagraph');
    const nextButton = document.getElementById('nextParagraph');
    
    let currentIndex = 0;

    function splitIntoSentences(text) {
        // Split on periods followed by space or end of string, but keep the period
        return text.match(/[^.!?]+[.!?]+(?=\s|$)/g) || [];
    }

    function createClickableSentence(sentence, index) {
        const span = document.createElement('span');
        span.className = 'clickable-sentence';
        span.textContent = sentence.trim();
        span.dataset.sentenceIndex = index;
        
        // Create placeholder footnote text
        const footnote = document.createElement('div');
        footnote.className = 'footnote';
        footnote.dataset.sentenceIndex = index;
        footnote.textContent = `Placeholder footnote for sentence ${index + 1}. This text can be edited to provide relevant commentary, analysis, or additional context for the sentence.`;
        
        footnotesContainer.appendChild(footnote);

        span.addEventListener('click', () => {
            // Remove active class from all sentences and footnotes
            document.querySelectorAll('.clickable-sentence').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.footnote').forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked sentence and its footnote
            span.classList.add('active');
            footnote.classList.add('active');
        });

        return span;
    }

    function updateParagraphDisplay() {
        // Update designation
        designationElement.textContent = `Chapter x, Section x, Paragraph ${currentIndex + 1}`;
        
        // Clear previous content and footnotes
        contentElement.innerHTML = '';
        footnotesContainer.innerHTML = '';
        
        // Split current paragraph into sentences and create clickable elements
        const sentences = splitIntoSentences(paragraphs[currentIndex].textContent);
        sentences.forEach((sentence, index) => {
            const clickableSentence = createClickableSentence(sentence, index);
            contentElement.appendChild(clickableSentence);
            
            // Add a space after each sentence
            if (index < sentences.length - 1) {
                contentElement.appendChild(document.createTextNode(' '));
            }
        });
        
        // Update button states
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === paragraphs.length - 1;
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateParagraphDisplay();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < paragraphs.length - 1) {
            currentIndex++;
            updateParagraphDisplay();
        }
    });

    // Initialize first paragraph
    updateParagraphDisplay();
});
