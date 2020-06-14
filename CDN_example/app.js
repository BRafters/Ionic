const calculateBtn = document.querySelector('ion-button');
const height_input = document.getElementById('height-input');
const weight_input = document.getElementById("weight-input");
const reset_button = document.getElementById("reset-btn");
const result_label = document.getElementById('result-lbl');

const calculate_bmi = () => {
     const entered_height = +height_input.value; // '+' converts the string to a number
     const entered_weight = +weight_input.value;

     const bmi = entered_weight / (entered_height * entered_height);
     
     if(bmi === NaN){
          alert("Not a number, please try again");
          return;
     }
     
     const result_element = document.createElement('ion-card');
     result_element.innerHTML = 
     `
          <ion-card-content>
               <h2>${bmi.toPrecision(4)}</h2>
          </ion-card-content>
     `;
     result_label.innerHTML = '';
     result_label.appendChild(result_element);
}

const reset = () => {
     height_input.value = '';
     weight_input.value = '';
     result_label.innerHTML = '';
}

calculateBtn.addEventListener('click', calculate_bmi);
reset_button.addEventListener('click', reset);