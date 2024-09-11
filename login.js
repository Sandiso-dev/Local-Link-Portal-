import workers from './data.js';

const username = document.querySelector('.username');
const password  = document.querySelector('.password');
const inputsContainer = document.querySelector('.inputs');

const bg = document.getElementsByName('loginBg');
const login = document.getElementsByName('loginContainer');

const LOCALKEY = "S@nd1s0";

 //THESE ARE IN MILISECONDS IT EQUALS TO 2HOURS BEFORE SESSION EXPIRES. AND HAVE TO LOGIN AGAIN
const SESSION_DURATION = 2 * 60 * 60 * 1000;


//SAVING LOGIN DETAILS TO PREVENT LOG OUT ISSUE AFTER PAGE REFRESHES. 
const saveUser = () => {
    //CREATE A NEW DATE AND TIME INSTANCE FOR EXPIRY TIME
    const now = new Date();
    const expTime = now.getTime() + SESSION_DURATION; 

    //NEW USER OBEJECT TO SEND OUT TO LOCAL STORAGE ADDING THE EXPIRY TIME TO LATER USER IT 
    //TO COMPARE THE LOGGED IN USER.
    let newuSer = {
        usr: workers, 
        exp: expTime
    }
    const toStringWorkers = JSON.stringify(newuSer);
    localStorage.setItem(LOCALKEY, toStringWorkers);
    alert("SESSION SAVE. EXPIRES AT:", new Date(newuSer.exp))
}

const checkUserLogedIn = () => {
    const now = new Date(); 
    const loggedUser = localStorage.getItem(LOCALKEY); 

    if(loggedUser){
        const parsedUser = JSON.parse(loggedUser);

        if( now.getTime() > parsedUser.exp){
            localStorage.removeItem(LOCALKEY);
            document.querySelector('.loginContainer').style.display = 'block';
            document.querySelector('section').style.display = 'none';
            document.querySelector('.loginBg').style.display = 'block'
    
        }else{
            document.querySelector('.loginContainer').style.display = 'none';
            document.querySelector('section').style.display = 'block';
            document.querySelector('.loginBg').style.display = 'none'
        }
    }
}


// Function to handle login
const loginFunc = () => {
    const userVal = username.value;
    const userPass = password.value;

    // Find if there's a worker with matching credentials
    const validUser = workers.find(worker => worker.usr === userVal && worker.psd === userPass);

    if (validUser) {
        //alert("Logged in successfully");
        // Hide the login page and show the main content
        document.querySelector('.loginContainer').style.display = 'none';
        document.querySelector('section').style.display = 'block';
        document.querySelector('.loginBg').style.display = 'none'
        saveUser()
    } else {
        alert('Login failed');
    }
};

//CREATED THE BUTTON HERE AND APPENDED IT TO MY HTML SINCE THE LOGIN FUNCTION WAS OUT OF SCOPE
//THEREFORE IT RESULTED INTO BEING UNDEFINED
const loginBtnContainer = document.querySelector('.logInBtnContainer');
const logBtn = document.createElement('button');
logBtn.textContent = "LOGIN";
logBtn.className = "loginBn";
logBtn.addEventListener('click', loginFunc); 
inputsContainer.appendChild(logBtn);

document.addEventListener('DOMContentLoaded',checkUserLogedIn );
