import React from 'react';
import {IonCol, IonCard, IonCardContent, IonRow} from '@ionic/react';

// The value we are passing is not a function, it is a number or string
const BmiResult: React.FC<{result: number}> = (props) => {
     return (
          <IonRow id="bmi_result">
               <IonCol>
                    <IonCard>
                         <IonCardContent className="ion-text-center">
                              <h2>Your Body Mass Index</h2>
                              <h3>{props.result.toFixed(2)}</h3>
                         </IonCardContent>
                    </IonCard>
               </IonCol>
          </IonRow>
     );
}

export default BmiResult;