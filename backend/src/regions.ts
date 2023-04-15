const regions = [
    {
        "code": "WR",
        "name": "World"
    },
    {
        "code": "AF",
        "name": "Afghanistan"
    },
    {
        "code": "AL",
        "name": "Albania"
    },
    {
        "code": "DZ",
        "name": "Algeria"
    },
    {
        "code": "AD",
        "name": "Andorra"
    },
    {
        "code": "AO",
        "name": "Angola"
    },
    {
        "code": "AG",
        "name": "Antigua & Barbuda"
    },
    {
        "code": "AR",
        "name": "Argentina"
    },
    {
        "code": "AM",
        "name": "Armenia"
    },
    {
        "code": "AU",
        "name": "Australia"
    },
    {
        "code": "AT",
        "name": "Austria"
    },
    {
        "code": "AZ",
        "name": "Azerbaijan"
    },
    {
        "code": "BS",
        "name": "Bahamas"
    },
    {
        "code": "BH",
        "name": "Bahrain"
    },
    {
        "code": "BD",
        "name": "Bangladesh"
    },
    {
        "code": "BB",
        "name": "Barbados"
    },
    {
        "code": "BY",
        "name": "Belarus"
    },
    {
        "code": "BE",
        "name": "Belgium"
    },
    {
        "code": "BZ",
        "name": "Belize"
    },
    {
        "code": "BJ",
        "name": "Benin"
    },
    {
        "code": "BM",
        "name": "Bermuda"
    },
    {
        "code": "BT",
        "name": "Bhutan"
    },
    {
        "code": "BO",
        "name": "Bolivia"
    },
    {
        "code": "BA",
        "name": "Bosnia & Herzegovina"
    },
    {
        "code": "BW",
        "name": "Botswana"
    },
    {
        "code": "BR",
        "name": "Brazil"
    },
    {
        "code": "BN",
        "name": "Brunei"
    },
    {
        "code": "BG",
        "name": "Bulgaria"
    },
    {
        "code": "BF",
        "name": "Burkina Faso"
    },
    {
        "code": "BI",
        "name": "Burundi"
    },
    {
        "code": "KH",
        "name": "Cambodia"
    },
    {
        "code": "CM",
        "name": "Cameroon"
    },
    {
        "code": "CA",
        "name": "Canada"
    },
    {
        "code": "CF",
        "name": "Central African Republic"
    },
    {
        "code": "TD",
        "name": "Chad"
    },
    {
        "code": "CL",
        "name": "Chile"
    },
    {
        "code": "CN",
        "name": "China"
    },
    {
        "code": "CO",
        "name": "Colombia"
    },
    {
        "code": "KM",
        "name": "Comoros"
    },
    {
        "code": "CG",
        "name": "Congo"
    },
    {
        "code": "CK",
        "name": "Cook Islands"
    },
    {
        "code": "CR",
        "name": "Costa Rica"
    },
    {
        "code": "CI",
        "name": "Cote D'ivoire (Ivory Coast)"
    },
    {
        "code": "HR",
        "name": "Croatia (Hrvatska)"
    },
    {
        "code": "CU",
        "name": "Cuba"
    },
    {
        "code": "CY",
        "name": "Cyprus"
    },
    {
        "code": "CZ",
        "name": "Czech Republic"
    },
    {
        "code": "DK",
        "name": "Denmark"
    },
    {
        "code": "DJ",
        "name": "Djibouti"
    },
    {
        "code": "DM",
        "name": "Dominica"
    },
    {
        "code": "DO",
        "name": "Dominican Republic"
    },
    {
        "code": "EC",
        "name": "Ecuador"
    },
    {
        "code": "EG",
        "name": "Egypt"
    },
    {
        "code": "SV",
        "name": "El Salvador"
    },
    {
        "code": "GQ",
        "name": "Equatorial Guinea"
    },
    {
        "code": "ER",
        "name": "Eritrea"
    },
    {
        "code": "EE",
        "name": "Estonia"
    },
    {
        "code": "ET",
        "name": "Ethiopia"
    },
    {
        "code": "FJ",
        "name": "Fiji"
    },
    {
        "code": "FI",
        "name": "Finland"
    },
    {
        "code": "FR",
        "name": "France"
    },
    {
        "code": "GA",
        "name": "Gabon"
    },
    {
        "code": "GM",
        "name": "Gambia"
    },
    {
        "code": "GE",
        "name": "Georgia"
    },
    {
        "code": "DE",
        "name": "Germany"
    },
    {
        "code": "GH",
        "name": "Ghana"
    },
    {
        "code": "GR",
        "name": "Greece"
    },
    {
        "code": "GD",
        "name": "Grenada"
    },
    {
        "code": "GT",
        "name": "Guatemala"
    },
    {
        "code": "GN",
        "name": "Guinea"
    },
    {
        "code": "GW",
        "name": "Guinea-Bissau"
    },
    {
        "code": "GY",
        "name": "Guyana"
    },
    {
        "code": "HT",
        "name": "Haiti"
    },
    {
        "code": "HN",
        "name": "Honduras"
    },
    {
        "code": "HK",
        "name": "Hong Kong"
    },
    {
        "code": "HU",
        "name": "Hungary"
    },
    {
        "code": "IS",
        "name": "Iceland"
    },
    {
        "code": "IN",
        "name": "India"
    },
    {
        "code": "ID",
        "name": "Indonesia"
    },
    {
        "code": "IR",
        "name": "Iran"
    },
    {
        "code": "IQ",
        "name": "Iraq"
    },
    {
        "code": "IE",
        "name": "Ireland"
    },
    {
        "code": "IL",
        "name": "Israel"
    },
    {
        "code": "IT",
        "name": "Italy"
    },
    {
        "code": "JM",
        "name": "Jamaica"
    },
    {
        "code": "JP",
        "name": "Japan"
    },
    {
        "code": "JO",
        "name": "Jordan"
    },
    {
        "code": "KZ",
        "name": "Kazakhstan"
    },
    {
        "code": "KE",
        "name": "Kenya"
    },
    {
        "code": "KI",
        "name": "Kiribati"
    },
    {
        "code": "KR",
        "name": "Korea (South)"
    },
    {
        "code": "KW",
        "name": "Kuwait"
    },
    {
        "code": "KG",
        "name": "Kyrgyzstan"
    },
    {
        "code": "LA",
        "name": "Laos"
    },
    {
        "code": "LV",
        "name": "Latvia"
    },
    {
        "code": "LB",
        "name": "Lebanon"
    },
    {
        "code": "LS",
        "name": "Lesotho"
    },
    {
        "code": "LR",
        "name": "Liberia"
    },
    {
        "code": "LY",
        "name": "Libya"
    },
    {
        "code": "LI",
        "name": "Liechtenstein"
    },
    {
        "code": "LT",
        "name": "Lithuania"
    },
    {
        "code": "LU",
        "name": "Luxembourg"
    },
    {
        "code": "MO",
        "name": "Macau"
    },
    {
        "code": "MK",
        "name": "Macedonia"
    },
    {
        "code": "MG",
        "name": "Madagascar"
    },
    {
        "code": "MW",
        "name": "Malawi"
    },
    {
        "code": "MY",
        "name": "Malaysia"
    },
    {
        "code": "MV",
        "name": "Maldives"
    },
    {
        "code": "ML",
        "name": "Mali"
    },
    {
        "code": "MT",
        "name": "Malta"
    },
    {
        "code": "MH",
        "name": "Marshall Islands"
    },
    {
        "code": "MQ",
        "name": "Martinique"
    },
    {
        "code": "MR",
        "name": "Mauritania"
    },
    {
        "code": "MU",
        "name": "Mauritius"
    },
    {
        "code": "MX",
        "name": "Mexico"
    },
    {
        "code": "MD",
        "name": "Moldova"
    },
    {
        "code": "MC",
        "name": "Monaco"
    },
    {
        "code": "MN",
        "name": "Mongolia"
    },
    {
        "code": "MA",
        "name": "Morocco"
    },
    {
        "code": "MZ",
        "name": "Mozambique"
    },
    {
        "code": "MM",
        "name": "Myanmar"
    },
    {
        "code": "NA",
        "name": "Namibia"
    },
    {
        "code": "NR",
        "name": "Nauru"
    },
    {
        "code": "NP",
        "name": "Nepal"
    },
    {
        "code": "NL",
        "name": "Netherlands"
    },
    {
        "code": "NZ",
        "name": "New Zealand"
    },
    {
        "code": "NI",
        "name": "Nicaragua"
    },
    {
        "code": "NE",
        "name": "Niger"
    },
    {
        "code": "NG",
        "name": "Nigeria"
    },
    {
        "code": "NU",
        "name": "Niue"
    },
    {
        "code": "NO",
        "name": "Norway"
    },
    {
        "code": "OM",
        "name": "Oman"
    },
    {
        "code": "PK",
        "name": "Pakistan"
    },
    {
        "code": "PW",
        "name": "Palau"
    },
    {
        "code": "PA",
        "name": "Panama"
    },
    {
        "code": "PG",
        "name": "Papua New Guinea"
    },
    {
        "code": "PY",
        "name": "Paraguay"
    },
    {
        "code": "PE",
        "name": "Peru"
    },
    {
        "code": "PH",
        "name": "Philippines"
    },
    {
        "code": "PL",
        "name": "Poland"
    },
    {
        "code": "PT",
        "name": "Portugal"
    },
    {
        "code": "QA",
        "name": "Qatar"
    },
    {
        "code": "RE",
        "name": "Reunion"
    },
    {
        "code": "RO",
        "name": "Romania"
    },
    {
        "code": "RU",
        "name": "Russia"
    },
    {
        "code": "RW",
        "name": "Rwanda"
    },
    {
        "code": "KN",
        "name": "Saint Kitts & Nevis"
    },
    {
        "code": "LC",
        "name": "Saint Lucia"
    },
    {
        "code": "VC",
        "name": "St. Vincent & the Grenadines"
    },
    {
        "code": "WS",
        "name": "Samoa"
    },
    {
        "code": "SM",
        "name": "San Marino"
    },
    {
        "code": "ST",
        "name": "Sao Tome & Principe"
    },
    {
        "code": "SA",
        "name": "Saudi Arabia"
    },
    {
        "code": "SN",
        "name": "Senegal"
    },
    {
        "code": "SC",
        "name": "Seychelles"
    },
    {
        "code": "SL",
        "name": "Sierra Leone"
    },
    {
        "code": "SG",
        "name": "Singapore"
    },
    {
        "code": "SK",
        "name": "Slovakia"
    },
    {
        "code": "SI",
        "name": "Slovenia"
    },
    {
        "code": "SB",
        "name": "Solomon Islands"
    },
    {
        "code": "SO",
        "name": "Somalia"
    },
    {
        "code": "ZA",
        "name": "South Africa"
    },
    {
        "code": "ES",
        "name": "Spain"
    },
    {
        "code": "LK",
        "name": "Sri Lanka"
    },
    {
        "code": "SD",
        "name": "Sudan"
    },
    {
        "code": "SR",
        "name": "Suriname"
    },
    {
        "code": "SE",
        "name": "Sweden"
    },
    {
        "code": "CH",
        "name": "Switzerland"
    },
    {
        "code": "SY",
        "name": "Syria"
    },
    {
        "code": "TW",
        "name": "Taiwan"
    },
    {
        "code": "TJ",
        "name": "Tajikistan"
    },
    {
        "code": "TZ",
        "name": "Tanzania"
    },
    {
        "code": "TH",
        "name": "Thailand"
    },
    {
        "code": "TG",
        "name": "Togo"
    },
    {
        "code": "TO",
        "name": "Tonga"
    },
    {
        "code": "TT",
        "name": "Trinidad & Tobago"
    },
    {
        "code": "TN",
        "name": "Tunisia"
    },
    {
        "code": "TR",
        "name": "Turkey"
    },
    {
        "code": "TM",
        "name": "Turkmenistan"
    },
    {
        "code": "TV",
        "name": "Tuvalu"
    },
    {
        "code": "UG",
        "name": "Uganda"
    },
    {
        "code": "UA",
        "name": "Ukraine"
    },
    {
        "code": "AE",
        "name": "United Arab Emirates"
    },
    {
        "code": "GB",
        "name": "United Kingdom"
    },
    {
        "code": "US",
        "name": "United States"
    },
    {
        "code": "UY",
        "name": "Uruguay"
    },
    {
        "code": "UZ",
        "name": "Uzbekistan"
    },
    {
        "code": "VU",
        "name": "Vanuatu"
    },
    {
        "code": "VA",
        "name": "Vatican City"
    },
    {
        "code": "VE",
        "name": "Venezuela"
    },
    {
        "code": "VN",
        "name": "Vietnam"
    },
    {
        "code": "YE",
        "name": "Yemen"
    },
    {
        "code": "ZM",
        "name": "Zambia"
    },
    {
        "code": "ZW",
        "name": "Zimbabwe"
    }
];
export default regions;