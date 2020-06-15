import React, {useRef, useState} from 'react';
import { 
  IonApp, IonContent, IonToolbar, IonHeader, IonTitle, 
  IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonAlert
} from '@ionic/react';

import BmiControls from './components/bmi_controls';
import BmiResults from './components/bmi_results';
import InputControl from './components/input_control';

// import {calculatorOutline, refreshOutline} from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { enter } from 'ionicons/icons';

// React.FC -> "functional component"
const App: React.FC = () => {
  // The data that we're going to be managing here will eventually be a number
  const [calculated_bmi, set_calculated_bmi] = useState<number>();
  const [error, set_error] = useState<string>();
  const [calc_units, set_calc_units] =useState<'mkg' | 'ftlbs'>('mkg');

  // Here we are using Refs
  // At the start of this function, no connection has been made yet
  const weight_input_ref = useRef<HTMLIonInputElement>(null);
  const height_input_ref = useRef<HTMLIonInputElement>(null);

  const calc_bmi = () => {
    // The question mark is a special typescript syntax which checks whether 
    // weight_input_ref currently holds a non null value before we then try and access the value property
    // Reason is that it could contain a null
    const entered_weight = weight_input_ref.current?.value;
    const entered_height = height_input_ref.current?.value;

    if(!entered_height || !entered_weight || +entered_height <= 0 || +entered_weight <= 0){
      set_error('Please enter a non-negative number');
      return;
    }
    
    const weight_conversion_factor = calc_units === 'ftlbs' ? 2.2 : 1;
    const height_conversion_factor = calc_units === 'ftlbs' ? 3.28 : 1;

    const weight = +entered_weight / weight_conversion_factor;
    const height = +entered_height / height_conversion_factor;

    const bmi = +weight / (height * height);

    set_calculated_bmi(bmi);
  };
  const reset_inputs = () => {
    // You can also use an '!' to tell typescript that the value will never be null
    weight_input_ref.current!.value = '';
    height_input_ref.current!.value = '';

  };
  const clear_error = () => {
    set_error('');
  }

  const select_calc_unit_handler = (selectedValue: 'mkg' | 'ftlbs') => {
    set_calc_units(selectedValue);
  }

  return(
  <React.Fragment>
    {/* !! Converts a true or false value into a true or false boolean */}
    <IonAlert isOpen={!!error} 
      message={error}
      buttons={[{text: 'Okay', handler: clear_error}]}
    />
    <IonApp>
      <IonHeader>
          {/* The Ionic toolbar  */}
        <IonToolbar color="primary">
            {/* Title that is placed in the ionic toolbar  */}
            <IonTitle slot="start">BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        <IonGrid>
          <IonRow>
            <IonCol>
              <InputControl selectedValue={calc_units} onSelectValue={select_calc_unit_handler}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                {/* Ion Label */}
                <IonLabel position="floating">Your Height in {calc_units === 'mkg' ? 'Meters' : 'Feet'}</IonLabel>
                {/* A typescript issue with the ref prop */}
                <IonInput type="number" ref={height_input_ref} id="height-input"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            {/* Ion Label */}
            <IonCol>
              <IonItem>
  <IonLabel position="floating">Your Weight in {calc_units === 'mkg' ? 'Kilograms' : "Pounds"}</IonLabel>
                {/* A typescript issue with the ref prop */}
                {/* type set to number to restrict the user from entering a non number */}
                <IonInput type="number" ref={weight_input_ref} id="weight-input"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <BmiControls onCalculate={calc_bmi} onReset={reset_inputs}/>
          {/* Here, we are conditionally generating a grid row with the bmi result
          If calculated_bmi has data, we can then generate the row, else, we leave it with nothing */}
          {calculated_bmi ? (
            <BmiResults result={calculated_bmi} />
          ) : null}
        </IonGrid>
      </IonContent>
    </IonApp>
  </React.Fragment>
  );
};

export default App;
