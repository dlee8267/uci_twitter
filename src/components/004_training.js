import React, { useState } from 'react';

const training = () => {
  return (
    <section id="004">
      <p className="custom-title" style={{ cssText: 'margin-top: 0' }}>
        Training the Model
      </p>

      <p className="custom-paragraph">
        <strong>Feature Selection</strong><br/>
        Since the dataset only spans one week, we excluded features like date or day of the week and added time of the day <strong>sin</strong> and <strong>cos</strong> .
        We initially omitted timezone due to its high correlation with longitude. However, in hindsight, it would have been worthwhile to test its impact explicitly. 
        We also tried 1.) <strong>bearing sin</strong> and <strong>cos</strong> from the previous point and 2.) <strong>gps_diff</strong> but they did not contribute meaningfully to the model’s accuracy.
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <iframe
          src="wondrous-fox-f58168.netlify.app"
          style={{ width: '80%', height: '200px', border: 'none' }}
          title="Notebook Part 4"
        />
      </div>

      <p className="custom-paragraph">
        <strong>Construting Rolling Windows</strong> (cell 1)<br/>
      </p>

      <ul>
        <li>For each point in the dataset, we constructed a training sample by taking the previous 15 rows as input features (X_train).</li><br/>
        <li>Each input window includes the longitude, latitude, and time features (time_sin, time_cos) from those 15 previous points.</li><br/>
        <li>The target output (y_train) is the current point’s longitude and latitude.</li><br/>
      </ul> 

      <p className="custom-paragraph">
        <strong>Splitting the Dataset</strong><br/>
        First 70% for training, the following 15% for validation, and the last 15% for testing. No shuffling (cell 2 and 3).
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <iframe
          src="resplendent-mooncake-061c86.netlify.app"
          style={{ width: '80%', height: '330px', border: 'none' }}
          title="Notebook Part 5"
        />
      </div>
      
      <p className="custom-paragraph">
        <strong>LSTM Experiment</strong><br/>
        Since we're dealing with a time series dataset, we experimented with LSTM models before switching to XGBoost. We tried a wide range of setups:
      </p>

      <ul>
        <li>Layers: 1–2 LSTM layers with dropout layers</li><br/>
        <li>Batch size: 16, 32, 64, 512, and even 1024</li><br/>
        <li>Input features: (a) just longitude & latitude (b) + time sin cos and (c) + bearing & gps_diff</li><br/>
        <li>Window sizes: 5, 10, 15, 30, 60, and 120 previous rows. M3 Macbook Pro can only handle 4 features * 120 rows</li><br/>
        <li>Data formats: Raw and normalized</li><br/>
      </ul> 

      <p className="custom-paragraph">
        Training was slow (130s/epoch with just 10% of the dataset) and loss usually stopped improving after just 3 epochs. Accuracy didn’t vary much across setups. Avg error ≈ <strong>750 miles</strong>, std dev ≈ <strong>550 miles</strong>.
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <iframe
          src="golden-torte-a7ffaa.netlify.app"
          style={{ width: '80%', height: '850px', border: 'none' }}
          title="Notebook Part 6"
        />
      </div>

      <p className="custom-paragraph" style={{ cssText: 'margin-top: 1em' }}>
        <strong>Final XGB Regressor model for GPS locations</strong><br/>
        We decided to use XGBoost because it handles complex non-linear relationships, requires no feature normalization, and performs well on large datasets like ours. 
        Although training with MAE took longer than MSE (53 minutes vs. 11 minutes), it was still more accurate and time efficient than LSTM models we tested.
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <iframe
          src="starlit-banoffee-e3939c.netlify.app"
          style={{ width: '80%', height: '225px', border: 'none' }}
          title="Notebook Part 7"
        />
      </div>

      <p className="custom-paragraph" style={{ cssText: 'margin-top: 1em' }}>
        <strong>Final XGB Regressor model for Timestamps</strong><br/>
        We observed that up to 69 tweets can occur within a single second. Given the lack of higher-resolution timestamps, 
        the most intuitive way to predict when it's time to "move forward" is by looking at how many tweets have already occurred within the current second.
        To help the model capture diurnal patterns (e.g., fewer tweets after midnight), we also included time sin and cos.
      </p>

      <p className="custom-paragraph">
        Since a window size of 1 is more appropriate for this task, we trained a separate model for time prediction.
        This also helped avoid interfering with the GPS model, especially since early LSTM models performed poorly when trying to predict longitude, latitude, and time simultaneously.
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <iframe
          src="chipper-souffle-f8b3bc.netlify.app"
          style={{ width: '80%', height: '800px', border: 'none' }}
          title="Notebook Part 8"
        />
      </div>

      

    </section>
  );
};

export default training;
