import React, { useState } from 'react';

const eda = () => {
  return (
    <section id="002">
      <p className="custom-title" style={{cssText: 'margin-top: 0'}}>
        Exploratory Data Analysis
      </p>

      <p className="custom-paragraph">
          Approximately 1% of the rows were slightly out of order by a few seconds, so we sorted the data first by timestamp and then by index (cell 1).
          This approach preserves as much of the original data and row order as possible. We also confirmed that this dataset contains tweets in the contiguous United States between 1/12/2013 and 1/18/2013 (cell 2).
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <iframe
          src="https://poetic-youtiao-3aa3ce.netlify.app/index.html"
          style={{ width: '80%', height: '850px', border: 'none' }}
          title="Notebook Part 1"
        />
      </div>
      
      <p className="custom-paragraph">
        <strong>Graph 1: Dot Plot</strong><br/>
        Each dot corresponds to a tweet. We can see that tweets are concentrated in population centers and along the road network.  
      </p>

      <img
        src={`${process.env.PUBLIC_URL}/images/eda1.png`}
        style={{ width: '80%', maxWidth: '800px', display: 'block', margin: '0 auto' }}
      />

      <p className="custom-paragraph">
        <strong>Graph 2: Histogram</strong><br/>
        This graph shows that there's a clear diurnal pattern (i.e. there are more tweets during the day).
      </p>

      <img
        src={`${process.env.PUBLIC_URL}/images/eda2.png`}
        style={{ width: '50%', maxWidth: '500px', display: 'block', margin: '0 auto' }}
      />

      <p className="custom-paragraph">
        <strong>Graph 3: Bar Charts</strong><br/>
        Most tweets came from timezone 1 (Eastern) and 2 (Central). Like graph 2, the daily pattern is quite consistent across the week.
      </p>

      <img
        src={`${process.env.PUBLIC_URL}/images/eda3.png`}
        style={{ width: '90%', maxWidth: '900px', display: 'block', margin: '0 auto' }}
      />

    </section>
  );
};

export default eda;
