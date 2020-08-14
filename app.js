// listen for submit
// get the loan-form and its input and add event listener when submitted with 
//calculateResults function as action
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// calculate results
function calculateResults(e){
    // UI vars
    // gets the first input id = amount
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    // from results
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    // to make decimal
    const principal = parseFloat(amount.value);
    // get the interest amount and divide by hundred and year
    const calculateInterest = parseFloat(interest.value) / 100 / 12;
    // calculate payments
    const calculatePayments = parseFloat(years.value) * 12;

    // monthly payments
    const x = Math.pow(1 + calculateInterest, calculatePayments);
    const monthly = (principal * x * calculateInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatePayments).toFixed(2);
        totalInterest.value = ((monthly * calculatePayments)- principal).toFixed(2);
    }else{
        showError('Please check your numbers');
    }
    e.preventDefault();
}

// show error
function showError(error){
    //create div
    const errorDiv = document.createElement('div');
    // add class / class from bootstrap
    errorDiv.className = 'alert alert-danger';

    // get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // create text node and append to div
    // will append a text within the errorDiv from the error parameter
    errorDiv.appendChild(document.createTextNode(error));

    // insert error above heading
    // using insertBefore it will take the errorDiv to be inserted above the heading
    card.insertBefore(errorDiv, heading);

    // clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError(){
    // removes the .alert bootstrap class
    document.querySelector('.alert').remove();
}