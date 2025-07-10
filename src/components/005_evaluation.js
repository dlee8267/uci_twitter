import React, { useState } from 'react';

const evaluation = () => {
  return (
    <section id="005">
      <p className="custom-title" style={{ cssText: 'margin-top: 0' }}>
        Evaluation
      </p>

      <p className="custom-paragraph">
        <strong>Spatial Accuracy</strong><br/>
        The XGBoost model outperforms the trivial baseline, reducing the average great-circle distance between predicted and actual locations by approximately 30% — which translates to nearly a 50% reduction in error area. 
        The standard deviation is also lower (cell 1). The model produces fewer large outliers in the 1000–1500 mile and 2000+ mile ranges (fig 1 and 2).
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <iframe
          src="benevolent-truffle-689eb1.netlify.app"
          style={{ width: '80%', height: '425px', border: 'none' }}
          title="Notebook Part 9"
        />
      </div>

      <img
        src={`${process.env.PUBLIC_URL}/images/eval1.png`}
        style={{ width: '80%', maxWidth: '800px', display: 'block', margin: '0 auto' }}
      />

      <p className="custom-paragraph">
        However, it still has notable limitations:<br/>
        Predictions are overly conservative (fig 1 - 4); the output range is narrower and doesn't fully reflect the distribution of the actual data.
        Interestingly, several of the earlier LSTM models exhibited a similar pattern.
      </p>

      <img
        src={`${process.env.PUBLIC_URL}/images/eval2.png`}
        style={{ width: '80%', maxWidth: '800px', display: 'block', margin: '0 auto' }}
      />

      <p className="custom-paragraph">
        <strong>Temporal Accuracy</strong><br/>
        The XGBoost time model outperforms the trivial model in terms of MSE (cell 1 and 2), but it struggles to predict outliers. 
        Its predictions fall within 1 second 99.997% of the time (cell 5), whereas the actual 96th percentile is 1 second (cell 3). 
        The model’s maximum predicted increase is only +1.72 seconds, while the true maximum in the test set is 3 seconds (cell 3 and 4). 
        However, given the high density of the timestamp data, both the trivial and XGBoost models are likely sufficient for most use cases within a ±1 second margin — 
        unless the goal is to accurately capture large time gaps or rare delays.
      </p>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <iframe
          src="gentle-beignet-574a7d.netlify.app"
          style={{ width: '80%', height: '900px', border: 'none' }}
          title="Notebook Part 10"
        />
      </div>


    </section>
  );
};

export default evaluation;
