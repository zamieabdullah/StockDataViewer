import React, { Fragment, useState } from "react";
import Plot from 'react-plotly.js';
import Navbar from "../../components/Navbar/Navbar";

import './style.css';

function SearchStock() {
    const [search, setSearch] = useState({
        symbol: '',
    });

    const [stock, setStock] = useState({
        stockInfo: {}
    })

    const [chart, setChart] = useState({
        stockChartXValues: [],
        stockChartYValues: []
    })

    const handleChange = (event) => {
        setSearch({...search, [event.target.name]: event.target.value});
    }

    const getStock = (event) => {
        event.preventDefault();
        let API_KEY = '9IANDZ9BFUOO8J3F';
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${search.symbol}&outputsize=compact&apikey=${API_KEY}`, { 
            method: 'GET'
        })
        .then(async (response) => {
            const resp = await response.json();
            setStock({...stock, stockInfo: resp});

            let data = resp
            let getXValues = []
            let getYValues = []

            for (var key in data['Time Series (Daily)']) {
                getXValues.push(key);
                getYValues.push(data['Time Series (Daily)'][key]['1. open']);
            }

            setChart({
                stockChartXValues: getXValues,
                stockChartYValues: getYValues
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const getOpenPrices = (event) => {
        event.preventDefault();
        let data = stock.stockInfo;
        let getXValues = []
        let getYValues = []

        for (var key in data['Time Series (Daily)']) {
            getXValues.push(key);
            getYValues.push(data['Time Series (Daily)'][key]['1. open']);
        }

        setChart({
            stockChartXValues: getXValues,
            stockChartYValues: getYValues
        })
    }

    const getClosePrices = (event) => {
        event.preventDefault();
        let data = stock.stockInfo;
        let getXValues = []
        let getYValues = []

        for (var key in data['Time Series (Daily)']) {
            getXValues.push(key);
            getYValues.push(data['Time Series (Daily)'][key]['4. close']);
        }

        setChart({
            stockChartXValues: getXValues,
            stockChartYValues: getYValues
        })
    }

    const getHighPrices = (event) => {
        event.preventDefault();
        let data = stock.stockInfo;
        let getXValues = []
        let getYValues = []

        for (var key in data['Time Series (Daily)']) {
            getXValues.push(key);
            getYValues.push(data['Time Series (Daily)'][key]['2. high']);
        }

        setChart({
            stockChartXValues: getXValues,
            stockChartYValues: getYValues
        })
    }

    const getLowPrices = (event) => {
        event.preventDefault();
        let data = stock.stockInfo;
        let getXValues = []
        let getYValues = []

        for (var key in data['Time Series (Daily)']) {
            getXValues.push(key);
            getYValues.push(data['Time Series (Daily)'][key]['3. low']);
        }

        setChart({
            stockChartXValues: getXValues,
            stockChartYValues: getYValues
        })
    }

    const getVolumePrices = (event) => {
        event.preventDefault();
        let data = stock.stockInfo;
        let getXValues = []
        let getYValues = []

        for (var key in data['Time Series (Daily)']) {
            getXValues.push(key);
            getYValues.push(data['Time Series (Daily)'][key]['5. volume']);
        }

        setChart({
            stockChartXValues: getXValues,
            stockChartYValues: getYValues
        })
    }

    return(
        <Fragment>
            <Navbar/>
            <div className="container mt-5">
                <form className="chart-centering">
                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="bi bi-search"></i>
                            </span>
                        </div>
                        <input type="text" className="form-control" name='symbol' value={search.symbol} onChange={handleChange} placeholder="Stock Symbol" required></input>
                        <button type="button" className="btn btn-success" onClick={getStock}>Search</button>
                    </div>
                </form>
                {chart.stockChartXValues.length == 0 || chart.stockChartYValues.length == 0 ? null : 
                    <div>
                        <Plot className="container text-center fixed-chart"
                            data={[
                                {
                                    x: chart.stockChartXValues,
                                    y: chart.stockChartYValues,
                                    type: 'scatter',
                                    mode: 'lines+markers',
                                    marker: {color: 'red'},
                                }
                            ]}
                            layout={{width: 1272, height: 440, title: search.symbol}}
                        />
                    </div>
                }
                <div className="centered-stock">
                    <div>
                        <button type='button' className='btn btn-light ms-3 me-3' onClick={getOpenPrices}>Open Price</button>
                        <button type='button' className='btn btn-light ms-3 me-3' onClick={getClosePrices}>Close Price</button>
                        <button type='button' className='btn btn-light ms-3 me-3' onClick={getHighPrices}>High Price</button>
                        <button type='button' className='btn btn-light ms-3 me-3' onClick={getLowPrices}>Low Price</button>
                        <button type='button' className='btn btn-light ms-3 me-3' onClick={getVolumePrices}>Volume Price</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SearchStock;