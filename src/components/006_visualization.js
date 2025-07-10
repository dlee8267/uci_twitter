import React, { useState, useRef } from 'react';
import Demo from "./graphs/demo.js";


const visualization = () => {
  return (
    <section id="006">
      <p className="custom-title" style={{cssText: 'margin-top: 0'}}>
        Visualization
      </p>

      <p className="custom-paragraph">
        Visualizing y_pred and y_actual on the map immediately reveals the model's major flaw. The blue dots represent the 15 previous points used to generate the prediction, the red dot shows the actual location, and the orange dot indicates the predicted location. 
        While the red dot jumps unpredictably, the model plays it safe by consistently predicting locations near the geographic center.
      </p>

      <p className="custom-paragraph">
        As for timestamp prediction, the model suffers from the same issue discussed in the previous section. 
        The predictions are consistently close, but the time shifts are almost always too small.
      </p>

      <div className="chart-container" style={{width: '80%'}}>
        <Demo />
      </div>
    </section>
  );
};

export default visualization;
