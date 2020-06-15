import React from 'react';
import {IonRow, IonCol, IonIcon, IonButton} from '@ionic/react';
import {calculatorOutline, refreshOutline}  from 'ionicons/icons';

// We add angle brackets here to define the generic type
// We are not defining a function, but instead defining the type definition of a function
// Tells FC that onCalculate will take no parameters and returns void
// Here, you separate with a semi-colon
const BmiControls: React.FC<{onCalculate: () => void; onReset: () => void;}> = (props) => {
     return (
          // Buttons 
          <IonRow className="ion-margin-top ion-text-center">
               {/* Calculate Button */}
               <IonCol className="ion-text-left">
                    <IonButton onClick={props.onCalculate}>
                         <IonIcon slot="start" icon={calculatorOutline}/>
                         Calculate
                    </IonButton>
               </IonCol>

                         {/* Reset Button */}
               <IonCol className='ion-text-right'>
                    <IonButton fill="outline" onClick={props.onReset}>
                         <IonIcon slot="start" icon={refreshOutline}/>
                         Reset
                    </IonButton>
               </IonCol>
          </IonRow>
     );
}

export default BmiControls;

