export const types = [
	{ name: "text" },
	{ name: "textArea" },
	{ name: "numeric" },
	{ name: "date" },
	{ name: "datetime" },
	{ name: "check" }
];

export const DateFormats = [
	{
		"localized": "LT",
		"format": {
			"tr": "HH:mm",
			"en": "h:mm a"
		},
		"caption": "01:41"
	},
	{
		"localized": "LTS",
		"format": {
			"tr": "HH:mm:ss",
			"en": "h:mm:ss a"
		},
		"caption": "01:41:46"
	},
	{
		"localized": "L",
		"format": {
			"tr": "dd.MM.yyyy",
			"en": "MM/dd/YYYY"
		},
		"caption": "26.12.2020"
	},
	{
		"localized": "l",
		"format": {
			"tr": "d.M.yy",
			"en": "M/d/yy"
		},
		"caption": "26.12.20"
	},
	{
		"localized": "LL",
		"format": {
			"tr": "d MMMM yyyy",
			"en": "MMMM d yyyy"
		},
		"caption": "26 December 2020"
	},
	{
		"localized": "ll",
		"format": {
			"tr": "d MMM yy",
			"en": "MMM d yy"
		},
		"caption": "26 Dec 20"
	},
	{
		"localized": "LLL",
		"format": {
			"tr": "dd.MM.yyyy HH:mm",
			"en": "MM/dd/yyyy h:mm a"
		},
		"caption": "26.12.2020 01:41"
	},
	{
		"localized": "lll",
		"format": {
			"tr": "d.M.yy H:m",
			"en": "M/d/yy h:mm a"
		},
		"caption": "26.12.20 1:41"
	},
	{
		"localized": "LLLL",
		"format": {
			"tr": "dd.MM.yyyy HH:mm:ss.SSS",
			"en": "dddd, MMMM yyyy h:mm:ss.SSS a"
		},
		"caption": "26.12.2020 01:41:46.988"
	},
	{
		"localized": "llll",
		"format": {
			"tr": "dd.M.yy H:m:ss.SS",
			"en": ""
		},
		"caption": "26.12.20 1:41:46.98"
	}
]

export const LogLevelTypes = [
	{
		"value": "Info",
		"id": 0
	},
	{
		"value": "Warn",
		"id": 1
	},
	{
		"value": "Error",
		"id": 2
	},
	{
		"value": "Debug",
		"id": 3
	}
]