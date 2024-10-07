// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    // Define exchange rates for different payment methods and currencies
    const exchangeRates = {
        paypal: {
            usd: 1100,
            eur: 1300,
            gbp: 1500
            // Add more currencies as needed
        },
        crypto: {
            usd: 1500,
            eur: 1600,
            gbp: 1800
            // Add more currencies as needed
        },
        payoneer: {
            usd: 1250,
            eur: 1300,
            gbp: 1500
            // Add more currencies as needed
        },
        fiverr: {
            usd: 1250,
            eur: 1400,
            gbp: 1600
            // Add more currencies as needed
        },
        us_bank: {
            usd: 1100,
            eur: 1200,
            gbp: 1400
            // Add more currencies as needed
        },
        upwork: {
            usd: 1250,
            eur: 1300,
            gbp: 1500
            // Add more currencies as needed
        },
        website_recharge: {
            5: 10000,
            10: 20000,
            15: 29000,
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

    // Buttons
    const calculateButton = document.getElementById('calculate-button');
    const previewButton = document.getElementById('preview-button');
    const shareResultButton = document.getElementById('share-result-button');

    // Initialize calculationResult object
    let calculationResult = {};

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
            if (amountInNGN) {
                exchangeRateDisplay.textContent = `${selectedAmount} USD = ${amountInNGN} NGN`;
            } else {
                exchangeRateDisplay.textContent = 'Select a valid recharge amount';
            }
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
    calculateButton.addEventListener('click', () => {
        const selectedMethod = paymentMethodSelect.value;
        const selectedCurrency = currencySelect.value;
        const selectedAmount = parseFloat(rechargeAmountSelect.value);
        const amount = parseFloat(amountInput.value);

        if (selectedMethod === 'website_recharge') {
            if (isNaN(selectedAmount) || !exchangeRates[selectedMethod][selectedAmount]) {
                alert('Please select a valid recharge amount.');
                return;
            }
            const amountInNGN = exchangeRates[selectedMethod][selectedAmount];
            resultDisplay.textContent = `${selectedAmount} USD = ${amountInNGN} NGN`;
            calculationResult = {
                paymentMethod: capitalize(selectedMethod.replace('_', ' ')),
                currency: 'USD',
                amount: selectedAmount,
                convertedAmount: amountInNGN,
                rechargeAmount: selectedAmount
            };
        } else {
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid amount.');
                return;
            }
            if (!exchangeRates[selectedMethod][selectedCurrency]) {
                alert('Selected currency is not supported for the chosen payment method.');
                return;
            }
            const exchangeRate = exchangeRates[selectedMethod][selectedCurrency];
            const convertedAmount = amount * exchangeRate;
            resultDisplay.textContent = `${amount} ${selectedCurrency.toUpperCase()} = ${convertedAmount.toFixed(2)} NGN (Approximate)`;
            calculationResult = {
                paymentMethod: capitalize(selectedMethod.replace('_', ' ')),
                currency: selectedCurrency.toUpperCase(),
                amount: amount,
                convertedAmount: convertedAmount,
                rechargeAmount: null
            };
        }

        // Show the Preview and Share buttons
        previewButton.style.display = 'inline-block';
        shareResultButton.style.display = 'inline-block';
    });

    // Capitalize first letter function
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Preview Calculation Result
    window.previewCalculationResult = function () {
        if (Object.keys(calculationResult).length === 0) {
            alert('Please perform a calculation first.');
            return;
        }

        // Populate the image template with calculation data
        document.getElementById('template-payment-method').textContent = calculationResult.paymentMethod;
        document.getElementById('template-currency').textContent = calculationResult.currency;
        document.getElementById('template-amount').textContent = calculationResult.amount;
        document.getElementById('template-result').textContent = calculationResult.convertedAmount;
        document.getElementById('template-date').textContent = new Date().toLocaleString();

        if (calculationResult.rechargeAmount) {
            document.getElementById('template-recharge').style.display = 'block';
            document.querySelector('#template-recharge span').textContent = calculationResult.rechargeAmount;
        } else {
            document.getElementById('template-recharge').style.display = 'none';
        }

        // Show the image template
        const imageTemplate = document.getElementById('image-template');
        imageTemplate.style.display = 'block';

        // Use html2canvas to take a screenshot
        html2canvas(imageTemplate).then(canvas => {
            // Create a new window to display the image
            const imgData = canvas.toDataURL('image/png');
            const imgWindow = window.open('', '_blank');
            imgWindow.document.write(`<img src="${imgData}" alt="Calculation Result Preview" style="max-width: 100%;">`);
            imgWindow.document.close();

            // Hide the image template after capturing
            imageTemplate.style.display = 'none';
        }).catch(error => {
            console.error('Error generating preview:', error);
            alert('Failed to generate preview.');
        });
    };

    // Share Calculation Result
    window.shareCalculationResult = function () {
        if (Object.keys(calculationResult).length === 0) {
            alert('Please perform a calculation first.');
            return;
        }

        // Construct the share message
        let shareMessage = `Exdollarium Exchange Calculation:\n`;
        shareMessage += `Payment Method: ${calculationResult.paymentMethod}\n`;
        shareMessage += `Currency: ${calculationResult.currency}\n`;
        shareMessage += `Amount: ${calculationResult.amount} ${calculationResult.currency}\n`;
        shareMessage += `Converted Amount: ${calculationResult.convertedAmount} NGN\n`;
        if (calculationResult.rechargeAmount) {
            shareMessage += `Recharge Amount: ${calculationResult.rechargeAmount} USD\n`;
        }
        shareMessage += `Date: ${new Date().toLocaleString()}`;

        // Create share URLs for different platforms
        const whatsappURL = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
        const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareMessage)}`;
        const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;
        const linkedinURL = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent('Exdollarium Exchange Calculation')}&summary=${encodeURIComponent(shareMessage)}`;

        // Open share dialogs
        const shareWindow = window.open('', '_blank');

        shareWindow.document.write(`
            <html>
                <head>
                    <title>Share Your Calculation</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
                        .share-buttons a {
                            display: inline-block;
                            margin: 10px;
                            padding: 10px 20px;
                            background-color: orange;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                        .share-buttons a:hover {
                            background-color: #e69500;
                        }
                    </style>
                </head>
                <body>
                    <h2>Share Your Calculation</h2>
                    <div class="share-buttons">
                        <a href="${whatsappURL}" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                        <a href="${facebookURL}" target="_blank"><i class="fab fa-facebook-f"></i> Facebook</a>
                        <a href="${twitterURL}" target="_blank"><i class="fab fa-twitter"></i> Twitter</a>
                        <a href="${linkedinURL}" target="_blank"><i class="fab fa-linkedin-in"></i> LinkedIn</a>
                    </div>
                </body>
            </html>
        `);

        shareWindow.document.close();
    };

    // Toggle Menu Function (for responsive design)
    window.toggleMenu = function() {
        const navLinks = document.getElementById('nav-links');
        navLinks.classList.toggle('active');
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
  document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const review = document.getElementById('review').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    // Perform form validation
    if (name && review && rating) {
        // For now, we'll just log the data to the console
        console.log('Name:', name);
        console.log('Review:', review);
        console.log('Rating:', rating);

        // Display a confirmation message
        alert('Thank you for your review!');

        // Clear the form
        document.getElementById('review-form').reset();
    } else {
        alert('Please fill in all fields and select a rating.');
    }
});
