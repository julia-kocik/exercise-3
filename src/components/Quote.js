import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {getQuotes} from '../redux/actions/quotesActions';
import { connect } from 'react-redux';

import styles from './Quote.module.scss';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


const Component = ({getQuotes, quotes, error, loading}) => {
  const [quote, setQuote] = useState('');
  const prevQuote = usePrevious(quote);
  useEffect(() => {
    window.scrollTo(0,0);
    getQuotes();
  }, [getQuotes]);
  const generateRandomQuote = () => {
    const random = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[random];
    setQuote(() => randomQuote);
  };
  const generatePrevQuote = () => {
    setQuote(() => prevQuote);
  };
  return (
    <div className={styles.root}>
      {loading || loading === undefined ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className={styles.container}>
          <button onClick={generatePrevQuote}>Prev</button>
          <button onClick={generateRandomQuote}>Next</button>
          <h1>{quote.quote}</h1>
          <h3>{quote.author}</h3>
        </div>  
      )}
    </div>
  );
};

Component.propTypes = {
  getQuotes: PropTypes.func,
  className: PropTypes.string,
  quotes: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
};

const mapStateToProps = state => ({
  quotes: state.getQuotes.quotes,
  loading: state.getQuotes.loading,
  error: state.getQuotes.error,
});



const mapDispatchToProps = (dispatch) => ({
  getQuotes: () => dispatch(getQuotes()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Quote,
  Component as QuoteComponent,
};