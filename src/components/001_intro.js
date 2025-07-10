import React, { useState } from 'react';

const intro = () => {
  return (
    <section id="001">
      <p className="custom-title" style={{ marginTop: 0, fontSize: '2rem' }}>
          Willow Data Science Project: UCI Twitter Data
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.9rem',
        color: '#555',
        margin: '0 0 1.5em',

        fontFamily: 'Helvetica Neue, serif',
      }}>
        <span style={{ fontSize: '2.0rem' }} role="img" aria-label="profile">😂</span>
        <span style={{ color: '#000000'}}>Dan Lee</span>
        <button style={{
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid black',
          borderRadius: '25px',
          padding: '6px 12px',
          fontSize: '0.9rem',
          fontWeight: 'normal',
          cursor: 'pointer',
        }}>Follow</button>
        <span>??? min read</span>
        <span>·</span>
        <span>Jul 9, 2025</span>
      </div>

      <p className="custom-paragraph">
          The Twitter Geospatial Data (available at <a href="https://archive.ics.uci.edu/dataset/1050/twitter+geospatial+data">https://archive.ics.uci.edu/dataset/1050/twitter+geospatial+data</a>) contains geospatial and timestamp data for one week worth of Tweets in the contiguous United States. 
          The Tweets were created between January 12, 2013 and January 18, 2013. The dataset has n = 14262517 rows and m = 4 columns:
      </p>

      <ul>
        <li>longitude: exact longitude coordinate of Tweet (real valued)</li><br/>
        <li>latitude: exact latitude coordinate of Tweet (real valued)</li><br/>
        <li>timestamp: 20130112000000 = 2013-01-12 00:00:00 CST (integer) All timestamps are reported in central standard time</li><br/>
        <li>timezone: 1 = Eastern, 2 = Central, 3 = Mountain, 4 = Pacific (integer)</li><br/>
      </ul> 

      <p className="custom-paragraph">
        In this project, we will:
      </p>

      <ul>
        <li>Build a model which trains on the historical data of GPS location and timestamp and predicts the most likely GPS location(s) and timestamp(s) of the next event</li><br />
        <li>Design a metric to assess the accuracy of your model which balances spatial and temporal locality.</li><br />
        <li>Compare the model performance to the trivial model which predicts  ŝ<sub>t<sub>i</sub></sub> = s<sub>t<sub>i−1</sub></sub></li><br/>
        <li>Visualize the perfomance of the model</li><br />

      </ul> 
      
    </section>
  );
};

export default intro;
