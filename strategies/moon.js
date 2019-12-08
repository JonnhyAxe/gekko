// Let's create our own strategy
var strat = {};

console.log('To the moon...')
// Prepare everything our strat needs
strat.init = function() {
    console.log('init')

    var settings = {
        short: 10,
        long: 21,
        signal: 9
      };
    
    
      // add the indicator to the strategy
    this.addIndicator('mymacd', 'MACD', settings);

    //these does not work!!! check installation https://gekko.wizb.it/docs/strategies/tulip_indicators.html
    this.addTulipIndicator('ema10', 'ema', {
        optInTimePeriod: 10
    });

    var customMACDSettings = {
        optInFastPeriod: 10,
        optInSlowPeriod: 21,
        optInSignalPeriod: 9
    }
    
    // add the indicator to the strategy
    this.addTulipIndicator('myTulipMacd', 'macd', customMACDSettings);

}

// Based on the newly calculated
// information, check if we should
// update or not.

//open: 10027.96,
//high: 10100,
//low: 9958.37,
//close: 9980.33,
//vwp: 10024.881606864172,
//volume: 1846.9223969999996,
//trades: 17429 

strat.check = function(candle) {
    //console.log('ema10 ', this.tulibIndicators.ema10);
    //const ema10 = this.tulibIndicators.ema10.result.result;
    var macdiff = this.indicators.mymacd.result;

    var result = this.tulipIndicators.mymacd.result;
    var mactulipddiff = result['macd'] - result['macdSignal'];

    console.log('macdiff ', macdiff);
    console.log('mactulipddiff ', mactulipddiff);

    console.log('open ', candle.open);
    console.log('high ', candle.high);
    console.log('low ', candle.low);
    console.log('close ', candle.volume); 
    console.log('vwp ', candle.trades); 
    console.log('check ', candle.start.format());

    this.advice('long');
}

module.exports = strat;