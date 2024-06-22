document.addEventListener('DOMContentLoaded', function() {
    // Define exchange rates for different payment methods and currencies
    const exchangeRates = {
        paypal: {
            usd: 450,
            eur: 0.85,
            gbp: 0.75
            // Add more currencies as needed
        },
        crypto: {
            usd: 500,
            eur: 0.90,
            gbp: 0.80
            // Add more currencies as needed
        },
        payoneer: {
            usd: 430,
            eur: 0.80,
            gbp: 0.70
            // Add more currencies as needed
        },
        fiverr: {
            usd: 440,
            eur: 0.82,
            gbp: 0.72
            // Add more currencies as needed
        },
        us_bank: {
            usd: 420,
            eur: 0.78,
            gbp: 0.68
            // Add more currencies as needed
        },
        upwork: {
            usd: 435,
            eur: 0.83,
            gbp: 0.73
            // Add more currencies as needed
        },
        website_recharge: {
            5: 9500,
            10: 19000,
            15: 28500,
            20: 38000,
            25: 47500,
            30: 57000,
            35: 66500,
            40: 76000,
            45: 85500,
            50: 95000,
            55: 104500,
            60: 114000,
            65: 123500,
            70: 133000,
            75: 142500,
            80: 152000,
            85: 161500,
            90: 171000,
            95: 180500,
            100: 190000
        }
    };

    // Get DOM elements
    const currencySelect = document.getElementById('currency');
    const paymentMethodSelect = document.getElementById('payment-method');
    const rechargeAmountSelect = document.getElementById('recharge-amount');
    const exchangeRateDisplay = document.getElementById('exchange-rate');
    const amountInput = document.getElementById('amount');
    const resultDisplay = document.getElementById('result');
    const rechargeAmountContainer = document.getElementById('recharge-amount-container');

    // Function to update exchange rate when payment method or currency is selected
    paymentMethodSelect.addEventListener('change', updateExchangeRate);
    currencySelect.addEventListener('change', updateExchangeRate);
    rechargeAmountSelect.addEventListener('change', updateExchangeRate);

    // Function to update exchange rate based on selected method, currency, and recharge amount
    function updateExchangeRate() {
        const selectedMethod = paymentMethodSelect.value;
        const selectedCurrency = currencySelect.value;
        const selectedAmount = parseFloat(rechargeAmountSelect.value);

        if (selectedMethod === 'website_recharge') {
            rechargeAmountContainer.style.display = 'block';
            const amountInNGN = exchangeRates[selectedMethod][selectedAmount];
            exchangeRateDisplay.textContent = `${selectedAmount} USD = ${amountInNGN} NGN`;
        } else {
            rechargeAmountContainer.style.display = 'none';
            if (exchangeRates[selectedMethod] && exchangeRates[selectedMethod][selectedCurrency]) {
                const exchangeRate = exchangeRates[selectedMethod][selectedCurrency];
                exchangeRateDisplay.textContent = `1 ${selectedCurrency.toUpperCase()} = ${exchangeRate} NGN`;
            } else {
                exchangeRateDisplay.textContent = 'Select a currency';
            }
        }
    }

    // Function to calculate exchange based on selected method, currency, and amount
    window.calculate = function() {
        const selectedMethod = paymentMethodSelect.value;
        const selectedCurrency = currencySelect.value;
        const selectedAmount = parseFloat(rechargeAmountSelect.value);
        const amount = parseFloat(amountInput.value);

        if (selectedMethod === 'website_recharge' && !isNaN(selectedAmount)) {
            const amountInNGN = exchangeRates[selectedMethod][selectedAmount];
            resultDisplay.textContent = `${selectedAmount} USD = ${amountInNGN} NGN`;
        } else if (exchangeRates[selectedMethod] && exchangeRates[selectedMethod][selectedCurrency] && !isNaN(amount)) {
            const exchangeRate = exchangeRates[selectedMethod][selectedCurrency];
            const result = amount * exchangeRate;
            resultDisplay.textContent = `${amount} ${selectedCurrency.toUpperCase()} = ${result.toFixed(2)} NGN (Approximate)`;
        } else {
            resultDisplay.textContent = '0.00';
        }
    };

    // Initialize exchange rate display
    updateExchangeRate();

    // Toggle menu function
    window.toggleMenu = function() {
        var navLinks = document.getElementById('nav-links');
        var menuIcon = document.querySelector('.menu-icon');
        var body = document.body;

        if (navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            menuIcon.innerHTML = '&#9776;'; // Change back to menu icon
            menuIcon.classList.remove('active');
            body.classList.remove('no-scroll');
        } else {
            navLinks.classList.add('open');
            menuIcon.innerHTML = '&times;'; // Change to cancel icon
            menuIcon.classList.add('active');
            body.classList.add('no-scroll');
        }
    }

    // Close the menu when a link is clicked
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            var navLinks = document.getElementById('nav-links');
            navLinks.classList.remove('open');
            document.querySelector('.menu-icon').innerHTML = '&#9776;';
            document.querySelector('.menu-icon').classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Initialize the scroll thumb for service icons
    const serviceIcons = document.querySelector('.service-icons');
    if (serviceIcons) {
        const scrollThumb = document.createElement('div');
        scrollThumb.classList.add('scroll-thumb');
        serviceIcons.parentNode.appendChild(scrollThumb);

        serviceIcons.addEventListener('scroll', function() {
            const maxScroll = serviceIcons.scrollHeight - serviceIcons.clientHeight;
            const scrollRatio = serviceIcons.scrollTop / maxScroll;
            const thumbHeight = serviceIcons.clientHeight * (serviceIcons.clientHeight / serviceIcons.scrollHeight);
            scrollThumb.style.top = `${scrollRatio * 100}%`;
            scrollThumb.style.height = `${thumbHeight}px`;
        });

        // Initialize the scroll thumb position
        serviceIcons.dispatchEvent(new Event('scroll'));
    }

    // Intersection Observer to animate contact details
    const contactDetails = document.querySelectorAll('.contact-details p');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    contactDetails.forEach(detail => {
        observer.observe(detail);
    });
});
    // Typing effect for about text
    var aboutText = document.getElementById('about-text');
    var textToType = aboutText.textContent.trim(); // Get text content and trim whitespace
    aboutText.textContent = ''; // Clear text content initially

    // Loop through each character and append it with a delay for typing effect
    for (var i = 0; i < textToType.length; i++) {
        (function(i) {
            setTimeout(function() {
                aboutText.textContent += textToType[i];
            }, 50 * i); // Adjust speed of typing here (50 milliseconds per character)
        })(i);
    }
// JavaScript function to toggle menu visibility
    function toggleMenu() {
        var navLinks = document.getElementById("nav-links");
        navLinks.classList.toggle("open");
    }    