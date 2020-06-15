import React, {useRef, useState} from 'react';
import { 
  IonApp, IonContent, IonToolbar, IonHeader, IonTitle, 
  IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonCard, IonCardContent 
} from '@ionic/react';

import {calculatorOutline, refreshOutline} from 'ionicons/icons';

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

// React.FC -> "functional component"
const App: React.FC = () => {
  // The data that we're going to be managing here will eventually be a number
  const [calculated_bmi, set_calculated_bmi] = useState<number>();

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

    if(!entered_height || !entered_weight){
      return;
    }
    

    const bmi = +entered_weight / (+entered_height * +entered_height);
    set_calculated_bmi(bmi);
  };
  const reset_inputs = () => {
    // You can also use an '!' to tell typescript that the value will never be null
    weight_input_ref.current!.value = '';
    height_input_ref.current!.value = '';
    
  };

  return(
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
            <IonItem>
              {/* Ion Label */}
              <IonLabel position="floating">Your Height:</IonLabel>
              {/* A typescript issue with the ref prop */}
              <IonInput ref={height_input_ref} id="height-input"></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          {/* Ion Label */}
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Your Weight:</IonLabel>
              {/* A typescript issue with the ref prop */}
              <IonInput ref={weight_input_ref} id="weight-input"></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>

        {/* Buttons */}
        <IonRow className="ion-margin-top ion-text-center">
          {/* Calculate Button */}
          <IonCol className="ion-text-left">
            <IonButton onClick={calc_bmi}>
              <IonIcon slot="start" icon={calculatorOutline}/>
              Calculate
            </IonButton>
          </IonCol>

          {/* Reset Button */}
          <IonCol className='ion-text-right'>
            <IonButton fill="outline" onClick={reset_inputs}>
              <IonIcon slot="start" icon={refreshOutline}/>
              Reset
            </IonButton>
          </IonCol>
        </IonRow>
        {/* Here, we are conditionally generating a grid row with the bmi result
        If calculated_bmi has data, we can then generate the row, else, we leave it with nothing */}
        {calculated_bmi ? (<IonRow>
          <IonCol>
            <IonCard>
              <IonCardContent>
                <h2>{calculated_bmi}</h2>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        ) : null}
      </IonGrid>
    </IonContent>
  </IonApp>
  );
};

export default App;
