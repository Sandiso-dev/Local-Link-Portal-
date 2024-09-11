//ADD REPORT - done
//RENDER REPORTS - done
//SAVE REPORTS 
//LOAD REPORTS
//DELETE REPORTS - done 
//MARK REPORTS AS DONE - done 
let reports = []

const addRB = document.querySelector('.addbtn');
const reportInput = document.querySelector('#reportInput');
const reportContainer = document.querySelector('.reports');

const localKey = "Sandiso123";

document.addEventListener('DOMContentLoaded', () => {
    const items = loadRports()
    renderReports(items);
});

const renderReports = () => {
    reportContainer.innerHTML = '';

    for(const [idx, report] of Object.entries(reports)){

        const Rport = document.createElement('div');
        Rport.className = "report"

        const Rtxt = document.createElement('p');
        Rtxt.innerText = report;
        Rport.appendChild(Rtxt);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = "deleteReportBtn Btn"; 
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener('click', ()=>{
            deleteReport(idx)
        });

        const doneBtn = document.createElement('button');
        doneBtn.className = "doneDoneReportBtn Btn";
        doneBtn.innerText = "Done";

        //mark as done function
        doneBtn.onclick = () => {
            Rtxt.style.textDecoration = "line-through";
            Rport.style.background = "green"
        }

        //APPENDING THE OBOVE CHILD NODES TP THE REPORT DIV
        const btnCont = document.createElement('div');
        btnCont.className = "btnCont";
        btnCont.appendChild(deleteBtn);
        btnCont.appendChild(doneBtn);

        Rport.appendChild(btnCont);

        reportContainer.appendChild(Rport);

       //console.log(Rtxt);
    }
};



//ADDING THE REPORTS IN THE ARRAY TO LATER BE ALSO ABLE TO SAVE AND LOAD THEM FOR PERSISTANCE
const sec = document.querySelector('.btnContainer');

const addbtnInJs = document.createElement('button');
addbtnInJs.textContent = "Add Report";
addbtnInJs.className = "addBtn"
sec.appendChild(addbtnInJs);
addbtnInJs.onclick = () => addRport();

const addRport = () => {
    let value = reportInput.value
    if(!value) alert("Can not add an empty report please try again..!");

    reports.push(value);
    saveRport();
    renderReports();
    reportInput.value = ""
}

//CONFIRM REPORT BY DISPAYING THE MODAL
const modal = document.querySelector('.modal');
const overLay = document.querySelector('.overlay');
const confDeleteBtn = document.querySelector('.confirm');
const defactBtn = document.querySelector('.defact')

//CONFIRMING DELETATION 
//delete the report in the array using it's index to alocate it with the splice method to remove
confDeleteBtn.addEventListener('click', (idx) => {

    overLay.style.display = "none";
    modal.style.display = "none";

    reports.splice(idx, 1);
    saveRport();
    renderReports();
});


const deleteReport = () => {
    overLay.style.display = "block";
    modal.style.display = "block";
};

//CANCELLING DELETATION
defactBtn.addEventListener('click', () => {
    overLay.style.display = "none";
    modal.style.display = "none";
});


//USING LOCAL STORAGE TO SAVE THE REPORTS LOGGED TO KEEP THE APPLICATION PERSISTANT

const saveRport = () => {
    const toSrtReports = JSON.stringify(reports);
    localStorage.setItem(localKey, toSrtReports);
};


//LOAD THE DATA SAVED IN LOCAL STORAGE IF ANY AND DISPLAY IT

const loadRports = () => {
    const savedRports = localStorage.getItem(localKey); 
    if(savedRports){
        reports = JSON.parse(savedRports);
    } else return
};


