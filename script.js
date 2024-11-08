document.addEventListener('DOMContentLoaded', () => {
    const paragraphs = Array.from(document.querySelectorAll('.paragraphs .text-block'));
    const designationElement = document.querySelector('.paragraph-designation');
    const contentElement = document.querySelector('.paragraph-content');
    const prevButton = document.getElementById('prevParagraph');
    const nextButton = document.getElementById('nextParagraph');
    let currentIndex = 0;

    function splitIntoSentences(text) {
        return text.match(/[^.!?]+[.!?]+(?=\s|$)/g) || [];
    }

    function handleSentenceClick(e) {
        const span = e.target;
        const wasActive = span.classList.contains('active');
        
        document.querySelectorAll('.clickable-sentence').forEach(s => {
            s.classList.remove('active');
            if (s.footnoteElement && s.footnoteElement.parentNode) {
                s.footnoteElement.remove();
            }
        });
        
        if (!wasActive) {
            span.classList.add('active');
            span.after(span.footnoteElement);
            span.footnoteElement.classList.add('active');
            span.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function createClickableSentence(sentence, index) {
        const span = document.createElement('span');
        span.className = 'clickable-sentence';
        span.textContent = sentence.trim();
        
        const footnote = document.createElement('div');
        footnote.className = 'footnote';
        footnote.textContent = `Annotation ${index + 1}: Additional context and analysis for this sentence.`;
        span.footnoteElement = footnote;

        span.addEventListener('click', handleSentenceClick);
        return span;
    }

    function updateParagraphDisplay() {
        designationElement.textContent = `Chapter x, Section x, Paragraph ${currentIndex + 1}`;
        contentElement.innerHTML = '';
        
        const sentences = splitIntoSentences(paragraphs[currentIndex].textContent);
        sentences.forEach((sentence, index) => {
            const clickableSentence = createClickableSentence(sentence, index);
            contentElement.appendChild(clickableSentence);
            if (index < sentences.length - 1) {
                contentElement.appendChild(document.createTextNode(' '));
            }
        });
        
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

    updateParagraphDisplay();
});
