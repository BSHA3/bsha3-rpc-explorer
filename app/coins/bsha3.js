var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var btcCurrencyUnits = [
	{
		name:"BSHA3",
		multiplier:1,
		default:true,
		values:["", "bsha3", "BSHA3"],
		decimalPlaces:8
	},
	{
		name:"mBSHA3",
		multiplier:1000,
		values:["mbsha3"],
		decimalPlaces:5
	},
	{
		name:"bits",
		multiplier:1000000,
		values:["bits"],
		decimalPlaces:2
	},
	{
		name:"sat",
		multiplier:100000000,
		values:["sat", "satoshi"],
		decimalPlaces:0
	}
];

module.exports = {
	name:"BSHA3",
	ticker:"BSHA3",
	logoUrl:"/img/logo/btc.svg",
	siteTitle:"BSHA3 Explorer",
	siteDescriptionHtml:"<b>BTC Explorer</b> is <a href='https://github.com/janoside/btc-rpc-explorer). If you run your own [Bitcoin Full Node](https://bitcoin.org/en/full-node), **BTC Explorer** can easily run alongside it, communicating via RPC calls. See the project [ReadMe](https://github.com/janoside/btc-rpc-explorer) for a list of features and instructions for running.",
	nodeTitle:"BSHA3 Full Node",
	nodeUrl:"https://bitcoin.org/en/full-node",
	demoSiteUrl: "https://btc.chaintools.io",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/blockchain/Blockchain-Known-Pools/master/pools.json",
		"https://raw.githubusercontent.com/btccom/Blockchain-Known-Pools/master/pools.json"
	],
	maxBlockWeight: 4000000,
	currencyUnits:btcCurrencyUnits,
	currencyUnitsByName:{"BSHA3":btcCurrencyUnits[0], "mBSHA3":btcCurrencyUnits[1], "bits":btcCurrencyUnits[2], "sat":btcCurrencyUnits[3]},
	baseCurrencyUnit:btcCurrencyUnits[3],
	feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],
	genesisBlockHash: "0000000090692ea88f3c87dc1cd28e3972c6b86d6f2e7c8fd8d267e88c4d65f1",
	genesisCoinbaseTransactionId: "6da02f100f366c604834400e249047aa7c0c594c957783be15fb223543aa7861",
	genesisCoinbaseTransaction: {
		"hex": "",
		"txid": "6da02f100f366c604834400e249047aa7c0c594c957783be15fb223543aa7861",
		"hash": "6da02f100f366c604834400e249047aa7c0c594c957783be15fb223543aa7861",
		"size": 289,
		"vsize": 289,
		"version": 4,
		"confirmations":6563,
		"vin": [
			{
				"coinbase": "0004ffff001d013c48424243204e6577732032302f4f63742f32303138205553204d656761204d696c6c696f6e73206c6f7474657279206a61636b706f742068697473207265636f72642024312e36626e",
				"sequence": 4294967295
			}
		],
		"vout": [
			{
				"value": 50,
				"n": 0,
				"scriptPubKey": {
					"asm": "04f5eeb2b10c944c6b9fbcfff94c35bdeecd93df977882babc7f3a2cf7f5c81d3b09a68db7f0e04f21de5d4230e75e6dbe7ad16eefe0d4325a62067dc6f369446a OP_CHECKSIG",
					"hex": "4104f5eeb2b10c944c6b9fbcfff94c35bdeecd93df977882babc7f3a2cf7f5c81d3b09a68db7f0e04f21de5d4230e75e6dbe7ad16eefe0d4325a62067dc6f369446aac",
					"reqSigs": 1,
					"type": "pubkey",
					"addresses": [
						"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
					]
				}
			}
		],
		"blockhash": "0000000090692ea88f3c87dc1cd28e3972c6b86d6f2e7c8fd8d267e    88c4d65f1",
		"time": 1540053565,
		"blocktime":1540053565 
	},
	genesisCoinbaseOutputAddressScripthash:"8b01df4e368ea28f8dc0423bcf7a4923e3a12d307c875e47a0cfbf90b5c39161",
	historicalData: [
	],
	exchangeRateData:{
		jsonUrl:"https://api.coinmarketcap.com/v1/ticker/Bitcoin/",
		exchangedCurrencyName:"usd",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].price_usd) {
				return 0; //responseBody[0].price_usd;
			}
			
			return -1;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(50) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 210000);

		return eras[index];
	}
};
