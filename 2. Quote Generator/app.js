const quote = document.querySelector('.quote')
const newQuoteBtn = document.querySelector('.new-quote-btn')
const spanner = document.querySelector('#spanner')
const quoteContainer = document.querySelector('.quote-container')

const loading = () => {
    spanner.style.display = 'block';
    quoteContainer.hidden = true;
}
const loadCompile = () => {
    spanner.style.display = 'none';
    quoteContainer.hidden = false;
}

const displayQuote = (data) => {
    const { body, author } = data.quote;
    if (author) {
        quote.innerHTML = `
                        <h1 class="quote-body-text"> 
                            <i class="fas fa-quote-left"></i>${body}
                        </h1>
                        <h3 class="quote-author"> ${author} </h3>
                    `
        loadCompile()
    }
    else {
        fatahQuote()
    }
}

function fatahQuote() {
    try {
        loading()
        fetch('https://favqs.com/api/qotd')
            .then(res => res.json())
            .then(data => displayQuote(data))
    } catch {
        fatahQuote()
    }
}
fatahQuote()

newQuoteBtn.addEventListener('click', fatahQuote)