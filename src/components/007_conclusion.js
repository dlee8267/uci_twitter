import React from 'react';

const conclusion = () => {
  return (
    <section id="008">
      <p className="custom-title" style={{ cssText: 'margin-top: 0' }}>
        Conclusion & Reflections
      </p>

      <p className="custom-paragraph">
        We explored a wide range of models, hyperparameters, and feature combinations, but in hindsight, our approach could’ve been more systematic. 
        Time and memory constraints led us to test many model setups on just 5–10% of the data, which may not be the most ideal way to evaluate models. 
      </p>

      <p className="custom-paragraph">
      While we had hoped to reduce the mean error to 300–500 miles, most models plateaued around 700 miles. 
      The randomness in the data and the skewed distribution (most points in the Eastern and Central time zones) caused the models, which were trained to minimize either MSE or MAE, 
      to be extremely risk-averse and almost useless as demonstrated in the interactive map. Predicting the next timestamp in any meaningful way is also challenging for a dense dataset.
      </p>

      <p className="custom-paragraph">
      Instead of further increasing the model's complexity, we would like to try the grid-based approach in the future. 
      After dividing the map into 8 - 20 blocks and adding block related statistics (e.g. # of recent tweets in this block), we would train the model to predict the most likely block(s) for the next tweet. 
      Although it's too early to tell whether this approach is viable due to the dataset's randomness, we believe this could potentially produce more meaningful predictions (1-5 most probable regions instead of one point).
      </p>
    </section>
  );
};

export default conclusion;
