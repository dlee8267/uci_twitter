import React from 'react';

const trivial = () => {
  return (
    <section id="003">
      <p className="custom-title" style={{ cssText: 'margin-top: 0' }}>
        Trivial Model and Metrics
      </p>

      <p className="custom-paragraph">
        We first examined the trivial model ŝ<sub>t<sub>i</sub></sub> = s<sub>t<sub>i−1</sub></sub> to better understand the data and establish a performance baseline before developing our own model.
        We also designed the following accuracy metrics:<br/>
      </p>

      <p className="custom-paragraph">
        <strong>GPS Location</strong><br/>
        <strong>Average great circle distance</strong> between y_pred and y_actual. This metric is more practical and intuitive than R² or RMSE on coordinates.
      </p>

      <p className="custom-paragraph">
        After computing "gps_diff," the great circle distance (in miles) between the current point s(t) and the previous point s(t−1), for the entire dataset using Geopy, here's what we found: 
      </p>

      <ul>
        <li>The average "leap" is approximately <strong>980 miles</strong>, which is also the <strong>mean error of the trivial model.</strong></li><br/>
        <li>A 980-mile error is clearly insufficient, especially considering the contiguous United States spans roughly 2,800 miles by 1,500 miles.</li><br/>
        <li>The distribution of gps_diff is right-skewed (fig 2), indicating the presence of outliers that should be addressed.</li><br/>
      </ul> 


      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <iframe
          src="lively-kleicha-068388.netlify.app"
          style={{ width: '80%', height: '450px', border: 'none' }}
          title="Notebook Part 2"
        />
      </div>

      <img
        src={`${process.env.PUBLIC_URL}/images/trivial1.png`}
        style={{ width: '50%', maxWidth: '500px', display: 'block', margin: '0 auto' }}
      />

      <p className="custom-paragraph" style={{ cssText: 'margin-top: 1em' }}>
        <strong>Timestamp</strong><br/>
        <strong>Mean Squared Error (MSE)</strong> on time differences in seconds, treating time prediction as a standard regression problem.
      </p>

      <ul>
        <li>The trivial model's mean squared error (MSE) is approximately <strong>0.066</strong> (cell 1).</li><br/>
        <li>However, it's important to note that the time difference is 0 in ~96% of cases, and ≤ 1 second in 99.99% of the data (cell 3).</li><br/>
        <li>Due to the highly skewed distribution, even the trivial model is correct ~96% of the time and has a mean error of just 0.042 seconds (cell 2).</li><br/>
      </ul> 


      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <iframe
          src="fabulous-syrniki-a1fe98.netlify.app"
          style={{ width: '80%', height: '400px', border: 'none' }}
          title="Notebook Part 3"
        />
      </div>


    </section>
  );
};

export default trivial;
