import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {getQuotes} from '../redux/actions/quotesActions';
import { connect } from 'react-redux';

import styles from './Quote.module.scss';

const Component = ({className, getQuotes, quotes, error, loading}) => {
  useEffect(() => {
    window.scrollTo(0,0);
    getQuotes();
  }, [getQuotes]);
  return (
    <div className={styles.root}>
      {loading || loading === undefined ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className={styles.container}>
          {quotes.map(item => (
            <h1 key={quotes[item]}>{item.quote}</h1>
          ))}
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