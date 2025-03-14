import React from 'react';

const Results = (props) => {
    // props.results の安全確認
    const results = props.results || {};

    if (!results.country) {
        return null; // countryがない場合、何も描画しない
    }

    return (
        <>
            <div className="results-country">{results.country}</div>
            <div className="results-city">{results.cityName || "不明な都市"}</div>
            <div className="results-temp">
                {results.temperature ? `${results.temperature} °C` : "温度データなし"}
            </div>
            <div className="results-condition">
                {results.icon ? (
                    <img src={results.icon} alt="icon"/>
                ) : (
                    <span>アイコンなし</span>
                )}
                <span>{results.conditionText || "条件不明"}</span>
            </div>
        </>
    );
};

export default Results;